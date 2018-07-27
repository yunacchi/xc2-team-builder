import { Injectable } from '@angular/core';
import { BladeManagerService } from './blade-manager.service';
import { GameSettingsService } from './game-settings.service';
import { Driver, Blade, DriverCharaId, ElementId, DriverComboId } from './model';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PartyMember {
  driver: Driver;
  blades: Blade[];
  inBattle: boolean;
  hiddenBlade?: Blade;
}

export interface EffectivePartyMember extends PartyMember {
  elements: ElementId[];
  driverCombos: DriverComboId[];
  modifiers: string[];
  classId: string;
}

export interface EffectiveParty {
  partyMembers: EffectivePartyMember[];
  elements: ElementId[];
  driverCombos: DriverComboId[];
}

@Injectable({
  providedIn: 'root'
})
export class PartyManagerService {
  private drivers: Driver[] = [];
  private blades: Blade[] = [];
  private _defaultParty$: BehaviorSubject<PartyMember[]> = new BehaviorSubject([]);
  public defaultParty$: Observable<PartyMember[]> = this._defaultParty$.asObservable();

  constructor(
    private bladeManagerService: BladeManagerService,
    private gameSettingsService: GameSettingsService,
  ) {
    this.bladeManagerService.allDrivers$
      .subscribe(d => {
        this.drivers = d;
        this.updateDefaults();
      });
    this.bladeManagerService.allBlades$
      .subscribe(b => {
        this.blades = b;
        this.updateDefaults();
      });
  }

  private updateDefaults() {
    this._defaultParty$.next(this.buildDefaultParty());
  }

  private buildDefaultParty(): PartyMember[] {
    const partyMembers: PartyMember[] = [];
    let i: number = 0;
    for (let d of this.drivers) {
      if (!d.isHidden) {
        const pm: PartyMember = {
          driver: d,
          blades: [],
          inBattle: i < 3,
        };
        ++i;
        partyMembers.push(pm);
        switch (d.id) {
          case "REX":
            pm.blades.push(this.blades.find(b => b.id === "SEIHAI_HOMURA"));
            break;
          case "NIA":
            pm.blades.push(this.blades.find(b => b.id === "BYAKKO"));
            break;
          case "TORA":
            const hanaJs = this.blades.find(b => b.id === "HANA_JS");
            const hanaJk = this.blades.find(b => b.id === "HANA_JK");
            const hanaJd = this.blades.find(b => b.id === "HANA_JD");
            pm.blades.push(hanaJs);
            if (hanaJk && !hanaJk.isHidden && hanaJk.isFound) {
              pm.blades.push(hanaJk);
            }
            if (hanaJd && !hanaJd.isHidden && hanaJd.isFound) {
              pm.blades.push(hanaJd);
            }
            break;
          case "MELEPH":
            pm.blades.push(this.blades.find(b => b.id === "KAGUTSUCHI"));
            break;
          case "ZEKE":
            pm.blades.push(this.blades.find(b => b.id === "SAIKA"));
            break;
        }
      }
    }

    return partyMembers;
  }
}
