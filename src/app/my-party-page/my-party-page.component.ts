import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  PartyManagerService, EffectivePartyMember, EffectiveParty,
  PartyDescription, PartyMemberDescriptor
} from '../party-manager.service';
import { BladeManagerService, BladeOrderingType, bladeOrderingTypes } from '../blade-manager.service';
import { Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Blade, Driver, ElementId, elements, driverCombos, DriverComboId, DriverCharaId } from '../model';
import { GameSettingsService } from '../game-settings.service';
import { DragDropData } from 'ngx-drag-drop/dnd-utils';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

export function createDescriptionFromEffectiveParty(ep: EffectiveParty): PartyDescription {
  const pd: PartyDescription = {
    gameChapter: ep.gameChapter,
    partyMembers: [],
  };

  for (const epm of ep.partyMembers) {
    pd.partyMembers.push({
      inBattle: epm.inBattle,
      driverId: epm.driver.id,
      bladeIds: epm.blades.map(m => m.id),
    });
  }
  return pd;
}

export function engageBladeOn(pm: PartyMemberDescriptor, bladeIdToSet?: string, bladeIdToReplace?: string) {
  let idxOfBladeToSet = bladeIdToSet ? pm.bladeIds.indexOf(bladeIdToSet) : -1;
  const idxOfBladeToReplace = pm.bladeIds.indexOf(bladeIdToReplace);

  if (bladeIdToSet === 'SEIHAI_HOMURA' && idxOfBladeToSet < 0) {
    idxOfBladeToSet = pm.bladeIds.indexOf('SEIHAI_HIKARI');
  } else if (bladeIdToSet === 'SEIHAI_HIKARI' && idxOfBladeToSet < 0) {
    idxOfBladeToSet = pm.bladeIds.indexOf('SEIHAI_HOMURA');
  }

  if (bladeIdToSet && !bladeIdToReplace) {
    if (idxOfBladeToSet < 0) {
      // Add Blade
      pm.bladeIds.push(bladeIdToSet);
    } else {
      // Reset blade at position
      pm.bladeIds[idxOfBladeToSet] = bladeIdToSet;
    }
  } else if (bladeIdToSet && bladeIdToReplace) {
    if (idxOfBladeToSet >= 0 && idxOfBladeToReplace >= 0) {
      if (idxOfBladeToSet === idxOfBladeToReplace) {
        // Reset blade at position
        pm.bladeIds[idxOfBladeToSet] = bladeIdToSet;
      } else {
        // Blade to set already exists, and blade to replace exists
        // Exchange both blades
        const bladeIdReplaced = pm.bladeIds[idxOfBladeToReplace];
        pm.bladeIds[idxOfBladeToSet] = bladeIdReplaced;
        pm.bladeIds[idxOfBladeToReplace] = bladeIdToSet;
      }
    } else if (idxOfBladeToSet < 0 && idxOfBladeToReplace >= 0) {
      // Blade to set doesn't exist, and blade to replace exists
      // Replace blade
      pm.bladeIds[idxOfBladeToReplace] = bladeIdToSet;
    }
  }

}

export function removeBladeFrom(pm: PartyMemberDescriptor, bladeIdToRemove: string) {
  const idxOfBladeToRemove = pm.bladeIds.indexOf(bladeIdToRemove);
  if (idxOfBladeToRemove >= 0) {
    pm.bladeIds.splice(idxOfBladeToRemove, 1);
  }
}

export function canEngageBladeOn(b: Blade, d: Driver): boolean {
  const enableMasterDriver = true;
  if (d.id === 'TORA') {
    return b.exclusiveDriver === 'TORA'; // Poppi only!
  } else if (d.id === 'REX' && enableMasterDriver) {
    return b.exclusiveDriver !== 'TORA'; // All Blades except Poppi are fair game on Rex
  } else {
    // Only exclusive Blades, non-exclusive bound Blades, and unbound Blades like Poppibuster, Shulk and Fiora
    return b.exclusiveDriver === d.id
      || (b.boundDriver && b.boundDriver.id === d.id)
      || b.db.unbound;
  }
}

export interface DragBladeData {
  sourceDriverId?: DriverCharaId;
  bladeId: string;
}

@Component({
  selector: 'app-my-party-page',
  templateUrl: './my-party-page.component.html',
  styleUrls: ['./my-party-page.component.scss']
})
export class MyPartyPageComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  private defaultPartyDesc: PartyDescription = undefined;
  private defaultParty: EffectiveParty = undefined;
  private blades: Blade[] = [];

  public searchFilterControl = new FormControl();
  public partyCnt = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
  public bladeCnt = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]

  public currentPartyDesc: PartyDescription = undefined;
  public currentParty: EffectiveParty = undefined;
  public drivers: Driver[] = [];
  public driverFilter$: BehaviorSubject<Driver> = new BehaviorSubject(undefined);
  public driverFilter: Driver = undefined;

  public usableBlades: Blade[] = [];
  public currentOrder: BladeOrderingType = 'ALBUM';
  public bladeOrderingTypes = bladeOrderingTypes;

  public elements: ElementId[] = elements;
  public driverCombos: DriverComboId[] = driverCombos;

  constructor(
    private partyManagerService: PartyManagerService,
    private bladeManagerService: BladeManagerService,
    private gameSettingsService: GameSettingsService,
    private translateService: TranslateService,
  ) { }

  public ngOnInit() {
    this.searchFilterControl.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((f) => {
      this.bladeManagerService.setSearchFilter(f);
    });

    this.bladeManagerService.searchFilter$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((f) => {
      this.searchFilterControl.setValue(f);
    });

    combineLatest(
      this.partyManagerService.defaultParty$,
      this.gameSettingsService.gameSettings$,
    ).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(([p, s]) => {
      this.defaultPartyDesc = p;
      this.defaultParty = this.partyManagerService.buildEffectiveParty(p);

      if (!this.currentParty) {
        this.currentPartyDesc = this.defaultPartyDesc;
        this.currentParty = this.defaultParty;
      }
    });

    combineLatest(
      this.bladeManagerService.ungroupedBlades$,
      this.driverFilter$,
    ).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(([blades, driverFilter]) => {
      this.driverFilter = driverFilter;
      this.blades = blades;
      if (driverFilter) {
        this.usableBlades = blades.filter(b => !b.isHidden && b.isFound && canEngageBladeOn(b, driverFilter));
      } else {
        this.usableBlades = blades.filter(b => !b.isHidden && b.isFound);
      }
    });

    this.bladeManagerService.allDrivers$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((drivers) => {
      this.drivers = drivers;
    });
  }

  public applyPartyDesc(partyDesc: PartyDescription) {
    this.currentPartyDesc = partyDesc;
    this.currentParty = this.partyManagerService.buildEffectiveParty(partyDesc);
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

  public onBladeDragStart(evt: DragEvent, bladeId: string, originDriverId?: string) {
  }

  public onBladeDropOnCharacterBladeSlot(evt: DragDropData, partyMember: EffectivePartyMember, bladeToReplace: Blade) {
    const dragData: DragBladeData = evt.data;
    const newDesc = createDescriptionFromEffectiveParty(this.currentParty);
    const driver = newDesc.partyMembers.find(x => x.driverId === partyMember.driver.id);
    const bladeToSet = this.blades.find(b => b.id === dragData.bladeId);
    if (canEngageBladeOn(bladeToSet, partyMember.driver)) {
      engageBladeOn(driver, bladeToSet.id, bladeToReplace.id);
      if (dragData.sourceDriverId && dragData.sourceDriverId !== partyMember.driver.id) {
        const oldDriver = newDesc.partyMembers.find(d => d.driverId === dragData.sourceDriverId);
        removeBladeFrom(oldDriver, bladeToSet.id);
      }
      this.applyPartyDesc(newDesc);
    }
  }

  public onBladeDropOnCharacterEmptySlot(evt: DragDropData, partyMember: EffectivePartyMember) {
    const dragData: DragBladeData = evt.data;
    const newDesc = createDescriptionFromEffectiveParty(this.currentParty);
    const bladeToSet = this.blades.find(b => b.id === dragData.bladeId);
    const driver = newDesc.partyMembers.find(x => x.driverId === partyMember.driver.id);
    if (canEngageBladeOn(bladeToSet, partyMember.driver)) {
      engageBladeOn(driver, bladeToSet.id, undefined);
      if (dragData.sourceDriverId && dragData.sourceDriverId !== partyMember.driver.id) {
        const oldDriver = newDesc.partyMembers.find(d => d.driverId === dragData.sourceDriverId);
        removeBladeFrom(oldDriver, bladeToSet.id);
      }
      this.applyPartyDesc(newDesc);
    }
  }

  public onCharacterSlotBladeClick(_: MouseEvent, partyMember: EffectivePartyMember, blade: Blade) {
    const newDesc = createDescriptionFromEffectiveParty(this.currentParty);
    const driver = newDesc.partyMembers.find(x => x.driverId === partyMember.driver.id);
    removeBladeFrom(driver, blade.id);
    this.applyPartyDesc(newDesc);
  }

  public translateParams(inParams: any): any {
    const outParams: any = {};
    if (inParams) {
      if (inParams.bladeId) {
        outParams.b = this.translateService.instant('blades.' + inParams.bladeId);
      }
      if (inParams.driverId) {
        outParams.d = this.translateService.instant('drivers.' + inParams.driverId);
      }
    }
    return outParams;
  }

  public onPartyMemberClick(partyMember: EffectivePartyMember) {
    const newDesc = createDescriptionFromEffectiveParty(this.currentParty);
    const driver = newDesc.partyMembers.find(x => x.driverId === partyMember.driver.id);
    driver.inBattle = !driver.inBattle;
    this.applyPartyDesc(newDesc);
  }

  public orderBy(o: BladeOrderingType) {
    this.bladeManagerService.setOrdering(o);
  }

  public filterDriver(d?: Driver) {
    this.driverFilter$.next(d);
  }
  public getDriverCombos(b: Blade, driverId: string): DriverComboId[] {
    return b.weaponClass.driverCombos[driverId] || [];
  }
}
