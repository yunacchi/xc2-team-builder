import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BladeManagerService } from './blade-manager.service';
import { Blade, Driver, DriverComboId, driverCombos, ElementId, elements } from './model';
import { uniqWith, isEqual } from 'lodash';

export interface PartyMemberDescriptor {
  driverId: string;
  bladeIds: string[];
  inBattle: boolean;
}

export interface EffectivePartyMember {
  elements: ElementId[];
  driverCombos: DriverComboId[];
  modifiers: { [modifierId: string]: number };
  classId: string;
  driver: Driver;
  blades: Blade[];
  inBattle: boolean;
  hiddenBlade?: Blade;
}

export interface EffectiveParty {
  partyMembers: EffectivePartyMember[];
  elements: ElementId[];
  driverCombos: DriverComboId[];
  errors: PartyError[];
}

export interface PartyError {
  key: string;
  params?: any;
}

function addBladeToParty(ep: EffectiveParty, epm: EffectivePartyMember, blade: Blade, isHidden: boolean) {
  if (isHidden) {
    epm.hiddenBlade = blade;
  } else {
    epm.blades.push(blade);
  }
  // Add driver combos
  const equippedDriverCombos = blade.weaponClass.driverCombos[epm.driver.id];
  if (equippedDriverCombos !== undefined) {
    for (const dc of equippedDriverCombos) {
      if (epm.driverCombos.indexOf(dc) < 0) {
        epm.driverCombos.push(dc);
      }
      if (epm.inBattle && ep.driverCombos.indexOf(dc) < 0) {
        ep.driverCombos.push(dc);
      }
    }
  }

  // Add Element
  if (epm.elements.indexOf(blade.element) < 0) {
    epm.elements.push(blade.element);
  }
  if (epm.inBattle && ep.elements.indexOf(blade.element) < 0) {
    ep.elements.push(blade.element);
  }

  // Add modifier
  if (blade.db.modifier !== undefined) {
    if (epm.modifiers[blade.db.modifier.id]) {
      epm.modifiers[blade.db.modifier.id] += blade.db.modifier.value;
    } else {
      epm.modifiers[blade.db.modifier.id] = blade.db.modifier.value;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class PartyManagerService {
  private drivers: Driver[] = undefined;
  private blades: Blade[] = undefined;
  private _defaultParty$: BehaviorSubject<PartyMemberDescriptor[]> = new BehaviorSubject(undefined);
  public defaultParty$: Observable<PartyMemberDescriptor[]> = this._defaultParty$.pipe(
    filter((p) => p !== undefined)
  );

  constructor(
    private bladeManagerService: BladeManagerService,
  ) {
    combineLatest(
      this.bladeManagerService.allDrivers$,
      this.bladeManagerService.allBlades$,
    ).pipe(
      filter(([d, b]) => d.length > 0 && b.length > 0)
    ).subscribe(([d, b]) => {
      this.drivers = d;
      this.blades = b;
      this.updateDefaults();
    });
  }

  private updateDefaults() {
    this._defaultParty$.next(this.buildDefaultParty());
  }

  private buildDefaultParty(): PartyMemberDescriptor[] {
    const partyMembers: PartyMemberDescriptor[] = [];
    let i = 0;
    for (const d of this.drivers) {
      if (!d.isHidden) {
        const pm: PartyMemberDescriptor = {
          driverId: d.id,
          bladeIds: [],
          inBattle: i < 3,
        };
        ++i;
        partyMembers.push(pm);
        switch (d.id) {
          case 'REX':
            pm.bladeIds.push('SEIHAI_HOMURA');
            break;
          case 'NIA':
            pm.bladeIds.push('BYAKKO');
            break;
          case 'TORA':
            const hanaJk = this.blades.find(b => b.id === 'HANA_JK');
            const hanaJd = this.blades.find(b => b.id === 'HANA_JD');
            pm.bladeIds.push('HANA_JS');
            if (hanaJk && !hanaJk.isHidden && hanaJk.isFound) {
              pm.bladeIds.push(hanaJk.id);
            }
            if (hanaJd && !hanaJd.isHidden && hanaJd.isFound) {
              pm.bladeIds.push(hanaJd.id);
            }
            break;
          case 'MELEPH':
            pm.bladeIds.push('KAGUTSUCHI');
            break;
          case 'ZEKE':
            pm.bladeIds.push('SAIKA');
            break;
        }
      }
    }

    return partyMembers;
  }

  public buildEffectiveParty(partyMembers: PartyMemberDescriptor[], gameChapter: number): EffectiveParty {
    const ep: EffectiveParty = {
      driverCombos: [],
      elements: [],
      errors: [],
      partyMembers: [],
    };

    let driversInBattle = 0;
    let hasNia = false;
    const matchedBlades: string[] = [];

    if (partyMembers && partyMembers.length) {
      for (const pm of partyMembers) {
        const driver = this.drivers.find(d => d.id === pm.driverId);
        // Skip unknown Drivers
        if (driver === undefined) {
          ep.errors.push({ key: 'errors.unknown-driver-id', params: { driverId: pm.driverId } });
          continue;
        }
        // Warn for Drivers in active party beyond maximum party size
        if (pm.inBattle) {
          if (driversInBattle >= 3) {
            ep.errors.push({ key: 'errors.too-many-drivers-in-battle', params: { driverId: pm.driverId } });
          }
          ++driversInBattle;
        }
        // Warn for Drivers used before their appointed time
        if (gameChapter < driver.db.chapter) {
          ep.errors.push({ key: 'errors.driver-time-paradox', params: { driverId: pm.driverId } });
        }
        // Special catgirl management - Driver edition
        if (pm.driverId === 'NIA') {
          if (hasNia) {
            ep.errors.push({ key: 'errors.critical-welsh-catgirl-overflow' });
          }
          hasNia = true;
        }

        const epm: EffectivePartyMember = {
          driver: driver,
          blades: [], // Engaged Blades
          classId: undefined,
          driverCombos: [],
          modifiers: {},
          elements: [],
          hiddenBlade: undefined, // Implicit Blade (For the Mythra-Pyra problem)
          inBattle: pm.inBattle,
        };
        const roles: string[] = [];
        let bladeCount = 0;

        // Only add battle members to the partyMembers.
        ep.partyMembers.push(epm);

        // Add Blades
        for (const bladeId of pm.bladeIds) {
          const blade = this.blades.find(b => b.id === bladeId);
          // Skip unknown Blades
          if (blade === undefined) {
            ep.errors.push({ key: 'errors.unknown-blade-id', params: { bladeId } });
            continue;
          }
          // Skip blades beyond 3
          if (bladeCount >= 3) {
            ep.errors.push({ key: 'errors.too-many-blades-engaged-on-character', params: { bladeId } });
            continue;
          }
          ++bladeCount;
          // Special catgirl management - Blade edition
          if (bladeId === 'NIA') {
            if (hasNia) {
              ep.errors.push({ key: 'errors.critical-welsh-catgirl-overflow' });
            }
            hasNia = true;
          }
          // Warn for Blades used before their appointed time
          if (gameChapter < (blade.db.chapter || 2)) {
            ep.errors.push({ key: 'errors.blade-time-paradox', params: { bladeId } });
          }
          if (matchedBlades.indexOf(bladeId) >= 0) {
            // Blade is engaged multiple times
            ep.errors.push({ key: 'errors.blade-engaged-multiple-times', params: { bladeId } });
          } else {
            matchedBlades.push(bladeId);
          }

          // Add role for class calculation
          roles.push(blade.role);

          addBladeToParty(ep, epm, blade, false);

          // The Mythra-Pyra problem
          if (gameChapter >= 4) {
            let hiddenBlade: Blade;
            if (blade.id === 'SEIHAI_HOMURA') {
              hiddenBlade = this.blades.find(b => b.id === 'SEIHAI_HIKARI');
            } else if (blade.id === 'SEIHAI_HIKARI') {
              hiddenBlade = this.blades.find(b => b.id === 'SEIHAI_HOMURA');
            }
            if (hiddenBlade !== undefined) {
              if (matchedBlades.indexOf(hiddenBlade.id) >= 0) {
                // Blade is engaged multiple times
                ep.errors.push({ key: 'errors.blade-engaged-multiple-times', params: { bladeId } });
              } else {
                matchedBlades.push(hiddenBlade.id);
              }
              addBladeToParty(ep, epm, hiddenBlade, true);
            }
          }
        }

        // Guess Class, which is the concatenated, ordered list of roles (eg. ATK-ATK-HLR or ATK-HLR-TNK)
        epm.classId = roles.sort().join('-');
        // Re-order elements and driver combos by their idx
        epm.elements = epm.elements.sort((a, b) => elements.indexOf(a) - elements.indexOf(b));
        epm.driverCombos = epm.driverCombos.sort((a, b) => driverCombos.indexOf(a) - driverCombos.indexOf(b));
      }
    } else {
      ep.errors.push({ key: 'errors.party-is-empty' });
    }
    // Re-order elements and driver combos by their idx
    ep.elements = ep.elements.sort((a, b) => elements.indexOf(a) - elements.indexOf(b));
    ep.driverCombos = ep.driverCombos.sort((a, b) => driverCombos.indexOf(a) - driverCombos.indexOf(b));

    ep.errors = uniqWith(ep.errors, isEqual);
    return ep;
  }
}
