import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  PartyManagerService, EffectivePartyMember, EffectiveParty,
  PartyDescription, PartyMemberDescriptor
} from '../party-manager.service';
import { BladeManagerService } from '../blade-manager.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blade, Driver, ElementId, elements, driverCombos, DriverComboId } from '../model';
import { GameSettingsService } from '../game-settings.service';
import { DragDropData } from 'ngx-drag-drop/dnd-utils';
import { TranslateService } from '@ngx-translate/core';

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
    // Only exclusive Blades, and non-exclusive, bound Blades
    return b.exclusiveDriver === d.id || (b.boundDriver && b.boundDriver.id === d.id);
  }
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
  private drivers: Driver[] = [];
  private blades: Blade[] = [];

  public partyCnt = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
  public bladeCnt = Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]

  public currentPartyDesc: PartyDescription = undefined;
  public currentParty: EffectiveParty = undefined;
  public usableBlades: Blade[] = [];

  public elements: ElementId[] = elements;
  public driverCombos: DriverComboId[] = driverCombos;

  constructor(
    private partyManager: PartyManagerService,
    private bladeManager: BladeManagerService,
    private settings: GameSettingsService,
    private translateService: TranslateService,
  ) { }

  public ngOnInit() {
    combineLatest(
      this.partyManager.defaultParty$,
      this.settings.gameSettings$,
    ).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(([p, s]) => {
      this.defaultPartyDesc = p;
      this.defaultParty = this.partyManager.buildEffectiveParty(p);

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

  public applyPartyDesc(partyDesc: PartyDescription) {
    this.currentPartyDesc = partyDesc;
    this.currentParty = this.partyManager.buildEffectiveParty(partyDesc);
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

  public onBladeDropOnCharacterBladeSlot(evt: DragDropData, partyMember: EffectivePartyMember, blade: Blade) {
    const newDesc = createDescriptionFromEffectiveParty(this.currentParty);
    const driver = newDesc.partyMembers.find(x => x.driverId === partyMember.driver.id);
    if (canEngageBladeOn(blade, partyMember.driver)) {
      engageBladeOn(driver, evt.data, blade.id);
      this.applyPartyDesc(newDesc);
    }
  }

  public onBladeDropOnCharacterEmptySlot(evt: DragDropData, partyMember: EffectivePartyMember) {
    const newDesc = createDescriptionFromEffectiveParty(this.currentParty);
    const blade = this.blades.find(b => b.id === evt.data);
    const driver = newDesc.partyMembers.find(x => x.driverId === partyMember.driver.id);
    if (canEngageBladeOn(blade, partyMember.driver)) {
      engageBladeOn(driver, blade.id, undefined);
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
}
