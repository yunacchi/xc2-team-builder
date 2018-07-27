import { Injectable } from '@angular/core';
import { BladeManagerService } from './blade-manager.service';
import { GameSettingsService } from './game-settings.service';
import { Driver, Blade, DriverCharaId, ElementId, DriverComboId } from './model';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

export interface PartyMemberDescriptor {
  driverId: string;
  bladeIds: string[];
  inBattle: boolean;
}

export interface EffectivePartyMember {
  elements: ElementId[];
  driverCombos: DriverComboId[];
  modifiers: string[];
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
  errors: string[];
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
    private translateService: TranslateService,
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

  public buildEffectiveParty(partyMembers: PartyMemberDescriptor[]): EffectiveParty {
    const ep: EffectiveParty = {
      driverCombos: [],
      elements: [],
      errors: [],
      partyMembers: [],
    };

    if (partyMembers && partyMembers.length) {
      for (const pm of partyMembers) {
      }
    } else {
      const msg = this.translateService.instant('party-is-empty');
      ep.errors.push(msg);
    }
    return ep;
  }
}
