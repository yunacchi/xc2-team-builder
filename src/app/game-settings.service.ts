import { Injectable } from '@angular/core';
import { cloneDeep, merge } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { DriverCharaId, ElementId, RoleId } from './model';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

/**
 * A registered, bound blade.
 *
 * @interface ObtainedBlade
 */
interface ObtainedBlade {
  /**
   * The Blade character identifier
   *
   * @type {string}
   * @memberof ObtainedBlade
   */
  b: string;

  /**
   * The bound Driver identifier
   *
   * @type {DriverCharaId}
   * @memberof ObtainedBlade
   */
  d: DriverCharaId;

  /**
   * An element override, if applicable.
   * Used for Poppi form configuration.
   *
   * @type {ElementId}
   * @memberof ObtainedBlade
   */
  e?: ElementId;

  /**
   * A Role override, if applicable.
   * Used for Poppi form configuration.
   *
   * @type {RoleId}
   * @memberof ObtainedBlade
   */
  r?: RoleId;
}

const defaultSettings: GameSettings = {
  c: 1,
  s: false,
  b: [],
  e: false,
  l: 'en',
};

/**
 * Game settings storage!
 * Sorry for the crazy short variable names.
 * Saves space when importing/exporting data.
 *
 * @export
 * @interface GameSettings
 */
export interface GameSettings {
  /**
   * The current chapter of the game.
   * 1 to 10,
   * 11 is Cleared,
   * 12 is NG+.
   *
   * @type {number}
   * @memberof GameSettings
   */
  c: number; // 1 to 10 - 11 is Cleared - 12 is NG+

  /**
   * All obtained blades registered.
   * Story blades don't need to be added here,
   * except for Poppi's custom configuration.
   *
   * @type {ObtainedBlade[]}
   * @memberof GameSettings
   */
  b: ObtainedBlade[];

  /**
   * True if the spoiler warning was shown - and closed.
   *
   * @type {boolean}
   * @memberof GameSettings
   */
  s: boolean;

  /**
   * True if the expansion pass blades should be shown.
   *
   * @type {boolean}
   * @memberof GameSettings
   */
  e: boolean;

  /**
   * Current language.
   *
   * @type {string}
   * @memberof GameSettings
   */
  l: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private _gameSettings$: BehaviorSubject<GameSettings> = new BehaviorSubject(defaultSettings);

  public gameSettings$: Observable<GameSettings> = this._gameSettings$.asObservable();

  constructor() {
    this.loadSettings();
  }

  private saveSettings(newSettings: GameSettings): void {
    this._gameSettings$.next(newSettings);
    window.localStorage.setItem('xc2_game_settings', JSON.stringify(newSettings));
  }

  private loadSettings(): void {
    const settingsStr: string = window.localStorage.getItem('xc2_game_settings');
    if (settingsStr) {
      const settingsObj: any = JSON.parse(settingsStr);
      if (settingsObj) {
        this._gameSettings$.next(settingsObj);
      }
    }
  }

  private clearSettings(): void {
    window.localStorage.removeItem('xc2_game_settings');
  }

  private changeSettings(action: (s: GameSettings) => void) {
    const settings = cloneDeep(this._gameSettings$.value);
    action(settings);
    this.saveSettings(settings);
  }

  public setChapter(newChapter: number): void {
    this.changeSettings(s => {
      s.c = newChapter;
    });
  }

  public addBlade(bladeId: string, driverId: DriverCharaId, overrideElement?: ElementId, overrideRole?: RoleId): void {
    this.changeSettings(s => {
      let blade = s.b.find(x => x.b === bladeId);
      if (!blade) {
        blade = {
          b: bladeId,
          d: driverId
        };
        s.b.push(blade);
      }
      blade.d = driverId;
      blade.e = overrideElement;
      blade.r = overrideRole;
    });
  }

  public removeBlade(bladeId: string) {
    this.changeSettings(s => {
      const idx = s.b.findIndex(x => x.b === bladeId);
      if (idx >= 0) {
        s.b.splice(idx, 1);
      }
    });
  }

  public setExpansionPass(hasExpansionPass: boolean) {
    this.changeSettings(s => {
      s.e = hasExpansionPass;
    });
  }

  public setLang(newLang: string) {
    this.changeSettings(s => {
      if (s.l !== newLang) {
        const codeA = s.l.substr(0, 2);
        const codeB = s.l.substr(0, 2);
        if (codeA !== codeB) {
          // Reset spoiler warning
          s.s = false;
        }
      }
      s.l = newLang;
    });
  }

  public setSpoiler(spoilerWarningShown: boolean) {
    this.changeSettings(s => {
      s.s = spoilerWarningShown;
    });
  }

  public exportJson(): string {
    return JSON.stringify(this._gameSettings$.value);
  }

  public importJson(json: string): void {
    try {
      const d = JSON.parse(json);
      const s = cloneDeep(defaultSettings);
      merge(s, d);
      this.saveSettings(s);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }
}
