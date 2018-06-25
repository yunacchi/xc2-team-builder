import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbRepositoryService } from '../db-repository.service';
import { GameSettingsService } from '../game-settings.service';
import { DriverCharaId, ElementId, elements, RoleId, roles, Blade } from '../model';

@Component({
  selector: 'app-blade-driver-selection-row',
  templateUrl: './blade-driver-selection-row.component.html',
  styleUrls: ['./blade-driver-selection-row.component.scss']
})
export class BladeDriverSelectionRowComponent implements OnInit {

  @Input() public blade: Blade;

  public drivers$: Observable<DriverCharaId[]>;
  public elements = elements;
  public roles = roles;

  constructor(
    private dbService: DbRepositoryService,
    private settingsService: GameSettingsService,
  ) {
    this.drivers$ = combineLatest(
      dbService.dbStore$,
      settingsService.gameSettings$
    ).pipe(
      map(([dbStore, gameSettings]) => {
        return dbStore.drivers
          .filter(d => d.chapter <= gameSettings.c
            && this.canBind(this.blade, d.id))
          .map(d => d.id);
      })
    );
  }

  ngOnInit() {
  }

  public setDriver(blade: Blade, driverId: DriverCharaId) {
    if (driverId === blade.boundDriver) {
      // Toggle to unbound
      this.settingsService.removeBlade(blade.id);
    } else if (this.canBind(blade, driverId)) {
      this.settingsService.addBlade(blade.id, driverId);
    }
  }

  // TODO: staticify that and put it near the Blade interface?
  public canBind(blade: Blade, driverId: DriverCharaId) {
    // Remember Binding !== Engaging
    // Master Driver Rex can *engage* almost any blade without *binding* to them
    switch (blade.bladeType) {
      case 'SEIHAI':
        // Only Rex can bind to the Aegis
        return driverId === 'REX';
      default:
        // Defer to the exclusiveDriver prop of the Blade
        if (blade.exclusiveDriver) {
          return driverId === blade.exclusiveDriver;
        } else {
          // All other blades can bind to anybody but Tora
          // (Except Shulk/Fiora? Gotta check that)
          return blade.canChangeBoundDriver && driverId !== 'TORA';
        }
    }
  }

  public getButtonStyle(driverId: DriverCharaId) {
    return {
      'background-image': `url('assets/xc2/driver_icons/${driverId}.png')`
    };
  }

  public setElement(blade: Blade, elementId: ElementId) {
    this.settingsService.addBlade(
      blade.id,
      blade.boundDriver,
      elementId,
      blade.role
    );
  }

  public setRole(blade: Blade, roleId: RoleId) {
    this.settingsService.addBlade(
      blade.id,
      blade.boundDriver,
      blade.element,
      roleId
    );
  }

  public getElementBgStyle(elementId: ElementId) {
    return {
      'background-image': `url('assets/xc2/elements/${elementId}.png')`
    };
  }

  public getRoleBgStyle(roleId: RoleId) {
    return {
      // 'background-image': `url('assets/xc2/roles/${roleId}.png')`
    };
  }
}
