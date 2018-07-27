import { Component, OnInit, OnDestroy } from '@angular/core';
import { PartyManagerService, PartyMemberDescriptor, EffectivePartyMember, EffectiveParty } from '../party-manager.service';
import { BladeManagerService } from '../blade-manager.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blade, Driver, ElementId, elements, driverCombos, DriverComboId } from '../model';
import { GameSettingsService } from '../game-settings.service';

@Component({
  selector: 'app-my-party-page',
  templateUrl: './my-party-page.component.html',
  styleUrls: ['./my-party-page.component.scss']
})
export class MyPartyPageComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  private defaultPartyDesc: PartyMemberDescriptor[] = [];
  private defaultParty: EffectiveParty = undefined;
  private drivers: Driver[] = [];
  private blades: Blade[] = [];

  public partyCnt = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
  public bladeCnt = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]

  public currentPartyDesc: PartyMemberDescriptor[] = [];
  public currentParty: EffectiveParty = undefined;
  public usableBlades: Blade[] = [];

  public elements: ElementId[] = elements;
  public driverCombos: DriverComboId[] = driverCombos;

  constructor(
    private partyManager: PartyManagerService,
    private bladeManager: BladeManagerService,
    private settings: GameSettingsService,
  ) { }

  public ngOnInit() {
    combineLatest(
      this.partyManager.defaultParty$,
      this.settings.gameSettings$,
    ).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(([p, s]) => {
      this.defaultPartyDesc = p;
      this.defaultParty = this.partyManager.buildEffectiveParty(p, s.c);

      if (!this.currentParty) {
        this.currentPartyDesc = this.defaultPartyDesc;
        this.currentParty = this.defaultParty;
      }
    });

    this.bladeManager.allBlades$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((blades) => {
      this.blades = blades;
      this.usableBlades = blades.filter(b => !b.isHidden && b.isFound);
    });

    this.bladeManager.allDrivers$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((drivers) => {
      this.drivers = drivers;
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public getDriverImgStyle(partyMember?: EffectivePartyMember) {
    if (partyMember) {
      return {
        'background-image': `url('assets/xc2/driver_icons/${partyMember.driver.id}.png')`
      };
    }
  }

  public isInBattle(partyIdx: number): boolean {
    return this.currentParty && this.currentParty.partyMembers[partyIdx] && this.currentParty.partyMembers[partyIdx].inBattle;
  }

}
