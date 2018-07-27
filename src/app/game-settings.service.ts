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

const defaultGameSettings: GameSettings = {
  c: 1,
  b: [],
  e: false,
};

const defaultSiteSettings: SiteSettings = {
  lang: 'en',
  disclaimerClosed: false,
  bgChapter: 1,
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
   * The current chapter of the game. Defines which blades can be displayed.
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
   * True if the expansion pass blades should be shown.
   *
   * @type {boolean}
   * @memberof GameSettings
   */
  e: boolean;
}

export interface SiteSettings {
  /**
   * Current language.
   *
   * @type {string}
   * @memberof SiteSettings
   */
  lang: string;

  /**
   * True if the spoiler warning was shown - and closed.
   *
   * @type {boolean}
   * @memberof SiteSettings
   */
  disclaimerClosed: boolean;

  /**
   * Defines which picture to show as site background.
   * 1 to 10,
   * 11 is Cleared,
   * 12 is NG+.
   *
   * @type {number}
   * @memberof SiteSettings
   */
  bgChapter: number;
}

const XC2_GAME_SETTINGS_KEY = 'xc2_game_settings';
const XC2_SITE_SETTINGS_KEY = 'xc2_site_settings';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {
  private _gameSettings$: BehaviorSubject<GameSettings> = new BehaviorSubject(defaultGameSettings);
  private _siteSettings$: BehaviorSubject<SiteSettings> = new BehaviorSubject(defaultSiteSettings);

  public gameSettings$: Observable<GameSettings> = this._gameSettings$.asObservable();
  public siteSettings$: Observable<SiteSettings> = this._siteSettings$.asObservable();

  constructor() {
    this.loadGameSettings();
    this.loadSiteSettings();
  }

  private saveGameSettings(newSettings: GameSettings): void {
    this._gameSettings$.next(newSettings);
    window.localStorage.setItem(XC2_GAME_SETTINGS_KEY, JSON.stringify(newSettings));
  }

  private saveSiteSettings(newSettings: SiteSettings): void {
    this._siteSettings$.next(newSettings);
    window.localStorage.setItem(XC2_SITE_SETTINGS_KEY, JSON.stringify(newSettings));
  }

  private loadGameSettings(): void {
    const settingsStr: string = window.localStorage.getItem(XC2_GAME_SETTINGS_KEY);
    if (settingsStr) {
      const settingsObj: any = JSON.parse(settingsStr);
      if (settingsObj) {
        this._gameSettings$.next(settingsObj);
      }
    }
  }

  private loadSiteSettings(): void {
    const settingsStr: string = window.localStorage.getItem(XC2_SITE_SETTINGS_KEY);
    if (settingsStr) {
      const settingsObj: any = JSON.parse(settingsStr);
      if (settingsObj) {
        this._siteSettings$.next(settingsObj);
      }
    }
  }

  public clearGameSettings(): void {
    window.localStorage.removeItem(XC2_GAME_SETTINGS_KEY);
    this._gameSettings$.next(cloneDeep(defaultGameSettings));
  }

  public clearSiteSettings(): void {
    window.localStorage.removeItem(XC2_SITE_SETTINGS_KEY);
    this._siteSettings$.next(cloneDeep(defaultSiteSettings));
  }

  private changeGameSettings(action: (s: GameSettings) => void) {
    const settings = cloneDeep(this._gameSettings$.value);
    action(settings);
    this.saveGameSettings(settings);
  }

  private changeSiteSettings(action: (s: SiteSettings) => void) {
    const settings = cloneDeep(this._siteSettings$.value);
    action(settings);
    this.saveSiteSettings(settings);
  }

  public setGameChapter(newChapter: number): void {
    this.changeGameSettings(s => {
      s.c = newChapter;
    });
  }

  public setSiteChapter(newChapter: number): void {
    this.changeSiteSettings(s => {
      s.bgChapter = newChapter;
    });
  }

  public addBlade(bladeId: string, driverId: DriverCharaId, overrideElement?: ElementId, overrideRole?: RoleId): void {
    this.changeGameSettings(s => {
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
    this.changeGameSettings(s => {
      const idx = s.b.findIndex(x => x.b === bladeId);
      if (idx >= 0) {
        s.b.splice(idx, 1);
      }
    });
  }

  public setExpansionPass(hasExpansionPass: boolean) {
    this.changeGameSettings(s => {
      s.e = hasExpansionPass;
    });
  }

  public setLang(newLang: string) {
    this.changeSiteSettings(s => {
      if (s.lang !== newLang) {
        const codeA = s.lang.substr(0, 2);
        const codeB = s.lang.substr(0, 2);
        if (codeA !== codeB) {
          // Reset spoiler warning.
          // This will trigger the warning to be displayed again.
          s.disclaimerClosed = false;
        }
      }
      s.lang = newLang;
    });
  }

  public setSpoiler(spoilerWarningShown: boolean) {
    this.changeSiteSettings(s => {
      s.disclaimerClosed = spoilerWarningShown;
    });
  }

  public exportJson(): string {
    return JSON.stringify(this._gameSettings$.value);
  }

  public importJson(json: string): void {
    try {
      const d = JSON.parse(json);
      const s = cloneDeep(defaultGameSettings);
      merge(s, d);
      this.saveGameSettings(s);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }

  public resetSettings(): void {
    this.clearGameSettings();
  }
}
