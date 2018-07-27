import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, share, distinctUntilChanged, filter } from 'rxjs/operators';
import { DbRepositoryService } from './db-repository.service';
import { GameSettingsService } from './game-settings.service';
import { Blade, Driver, DriverCharaId, elements, roles, bladeTypes } from './model';
import { isEqual, sortBy, uniq, flatten } from 'lodash';
import { TranslateService } from '@ngx-translate/core';


export type BladeGroupingType = 'NONE' | 'ACQUISITION' | 'BLADETYPE' | 'DRIVER' | 'ELEMENT' | 'ROLE';
export type BladeOrderingType = 'ALBUM' | 'NAME' | 'DRIVER' | 'ELEMENT' | 'ROLE' | 'WEAPON';

export const bladeGroupingTypes: BladeGroupingType[] = [
  'NONE', 'ACQUISITION', 'BLADETYPE', 'DRIVER', 'ELEMENT', 'ROLE'
];

export const bladeOrderingTypes: BladeOrderingType[] = [
  'ALBUM', 'NAME', 'DRIVER', 'ELEMENT', 'ROLE', 'WEAPON'
];

export interface BladeGroup {
  labelKey: string;
  blades: Blade[];
  isHidden: boolean;
}

const bladeOrderKeySelectors: { [t: string]: (b: Blade) => number | string } = {
  'ALBUM': (b) => b.db.albumNumber,
  'NAME': (b) => b.id, // We don't have translations here.
  'DRIVER': (b) => b.boundDriver ? b.boundDriver.db.sortIdx : 999,
  'ELEMENT': (b) => elements.indexOf(b.element),
  'ROLE': (b) => roles.indexOf(b.role),
  'WEAPON': (b) => b.weaponClass.sortIdx,
};

function orderBlades(blades: Blade[], tlService: TranslateService, sortOrder: BladeOrderingType): Blade[] {
  if (sortOrder === 'NAME') {
    const f: (b: Blade) => string = (b) => tlService.instant('blades.' + b.id).toLowerCase();
    return sortBy(blades, f);
  } else {
    return sortBy(blades, bladeOrderKeySelectors[sortOrder]);
  }
}

function filterBlades(blades: Blade[], index: { [phrase: string]: string[] }, searchFilter: string): Blade[] {
  searchFilter = searchFilter ? searchFilter.trim() : '';

  if (searchFilter) {
    const matchedBladeIds: string[] = uniq(flatten(
      Object.keys(index) // From all phrases
        .filter(s => s.includes(searchFilter)) // Take phrases that match the filter
        .map(k => index[k]) // Select blade IDs from index
    )); // De-duplicated in uniq call

    // Map and filter blade IDs
    return blades.filter(b => matchedBladeIds.indexOf(b.id) >= 0 && !b.isHidden);
  } else {
    return blades.filter(b => !b.isHidden);
  }

}

function createOrAddIndexPhrase(index: { [phrase: string]: string[] }, b: Blade, phrase: string) {
  phrase = phrase.trim().toLowerCase();
  if (phrase) {
    if (index[phrase] && index[phrase].indexOf(b.id) < 0) {
      index[phrase].push(b.id);
    } else {
      index[phrase] = [b.id];
    }
  }
  return index;
}

function generateBladeSearchIndex(blades: Blade[], tlService: TranslateService): { [phrase: string]: string[] } {
  if (!tlService || !tlService.currentLang) {
    return {};
  }
  const index: { [phrase: string]: string[] } = {};

  for (let i = 0; i < blades.length; i++) {
    const b = blades[i];
    // Match blade ID
    createOrAddIndexPhrase(index, b, b.id);
    // Match TL name
    createOrAddIndexPhrase(index, b, tlService.instant('blades.' + b.id));
    // Match aliases
    for (let j = 0; j < b.aliases.length; j++) {
      createOrAddIndexPhrase(index, b, b.aliases[j]);
    }
    // Match bound driver TL name
    if (b.boundDriver) {
      createOrAddIndexPhrase(index, b, tlService.instant('drivers.' + b.boundDriver.id));
    }
    // Match elment, weapon, and role TL names
    createOrAddIndexPhrase(index, b, tlService.instant('elements.' + b.element));
    createOrAddIndexPhrase(index, b, tlService.instant('weapons.' + b.weaponClass.id));
    createOrAddIndexPhrase(index, b, tlService.instant('roles.' + b.role));
  }
  return index;
}


@Injectable({
  providedIn: 'root'
})
export class BladeManagerService {
  private _blades$: BehaviorSubject<Blade[]> = new BehaviorSubject([]);
  private _drivers$: BehaviorSubject<Driver[]> = new BehaviorSubject([]);

  private _sortOrder$: BehaviorSubject<BladeOrderingType> = new BehaviorSubject<BladeOrderingType>('ALBUM');
  private _grouping$: BehaviorSubject<BladeGroupingType> = new BehaviorSubject<BladeGroupingType>('NONE');
  private _searchFilter$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private bladeMapSubscription: Subscription;
  private searchIndexSubscription: Subscription;

  public allBlades$: Observable<Blade[]> = this._blades$.pipe(filter((a) => a.length > 0));
  public allDrivers$: Observable<Driver[]> = this._drivers$.pipe(filter((a) => a.length > 0));
  public sortOrder$: Observable<BladeOrderingType> = this._sortOrder$.asObservable();
  public grouping$: Observable<BladeGroupingType> = this._grouping$.asObservable();
  public searchFilter$: Observable<string> = this._searchFilter$.asObservable();
  public groupedBlades$: Observable<BladeGroup[]>;

  private _bladeSearchIndex$: BehaviorSubject<{ [phrase: string]: string[] }> = new BehaviorSubject({});

  // Used for triggering recompute of filter on lang change.
  private lang$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  constructor(
    private dbService: DbRepositoryService,
    private gameSettingsService: GameSettingsService,
    private tlService: TranslateService,
  ) {
    // Build blade and driver map from DB+Settings
    this.bladeMapSubscription = this.subscribeBladeMap();
    // Subscribe to search index updates
    this.searchIndexSubscription = this.subscribeSearchIndex();
    this.groupedBlades$ = this.buildGroupedBladesObservable();
    this.lang$.next(this.tlService.currentLang);
    this.tlService.onLangChange.asObservable().subscribe(l => {
      this.lang$.next(l.lang);
    });
  }

  public setGrouping(grouping: BladeGroupingType) {
    this._grouping$.next(grouping);
  }


  public setOrdering(ordering: BladeOrderingType) {
    this._sortOrder$.next(ordering);
  }


  public setSearchFilter(searchFilter: string) {
    this._searchFilter$.next(searchFilter);
  }

  private subscribeSearchIndex(): Subscription {
    return combineLatest(
      this._blades$,
      this.lang$.pipe(distinctUntilChanged()), // Rebuild on lang change
    ).pipe(
      map(([blades]) => {
        return generateBladeSearchIndex(blades, this.tlService);
      })
    ).subscribe((f) => {
      this._bladeSearchIndex$.next(f);
    });
  }

  private buildGroupedBladesObservable(): Observable<BladeGroup[]> {
    return combineLatest(
      this._blades$,
      this._drivers$,
      this._sortOrder$,
      this._grouping$,
      this._searchFilter$,
      this._bladeSearchIndex$
    ).pipe(
      map(([allBlades, allDrivers, sortOrder, grouping, searchFilter, index]) => {
        const filteredBlades = filterBlades(allBlades, index, searchFilter);

        switch (grouping) {
          case 'ACQUISITION':
            // Separate by acquisition:
            // Quest blades, gacha blades, and story blades.
            return [
              {
                labelKey: 'my-game.quest-blades',
                blades: orderBlades(
                  filteredBlades.filter(x => x.bladeType === 'QUEST'),
                  this.tlService,
                  sortOrder),
                isHidden: false
              },
              {
                labelKey: 'my-game.gacha-blades',
                blades: orderBlades(
                  filteredBlades.filter(x => x.bladeType === 'GACHA'),
                  this.tlService,
                  sortOrder),
                isHidden: false
              },
              {
                labelKey: 'my-game.gacha-blades',
                blades: orderBlades(
                  filteredBlades.filter(x =>
                    x.bladeType === 'STORY' // Story blades (Roc, Aegaeon, Nia)
                    || x.bladeType === 'CHARA' // Character Blades (Dromarch, Brighid, Pandoria)
                    || x.bladeType === 'SEIHAI' // Aegis forms
                  ),
                  this.tlService,
                  sortOrder),
                isHidden: false
              }
            ];
          case 'BLADETYPE':
            return bladeTypes.map((bt) => {
              return {
                labelKey: 'blade-types.' + bt,
                blades: orderBlades(
                  filteredBlades.filter(x => x.bladeType === bt),
                  this.tlService,
                  sortOrder),
                isHidden: false
              };
            });
          case 'DRIVER':
            return allDrivers.map((d) => {
              return {
                labelKey: 'drivers.' + d.id,
                blades: orderBlades(
                  filteredBlades.filter(x => x.boundDriver === d),
                  this.tlService,
                  sortOrder),
                isHidden: d.isHidden
              };
            }).concat({
              labelKey: 'app.no-driver',
              blades: orderBlades(
                filteredBlades.filter(x => x.boundDriver === undefined),
                this.tlService,
                sortOrder),
              isHidden: false
            });
          case 'ELEMENT':
            return elements.map((elementId) => {
              return {
                labelKey: 'elements.' + elementId,
                blades: orderBlades(
                  filteredBlades.filter(x => x.element === elementId),
                  this.tlService,
                  sortOrder),
                isHidden: false
              };
            });
          case 'ROLE':
            return roles.map((roleId) => {
              return {
                labelKey: 'roles.' + roleId,
                blades: orderBlades(
                  filteredBlades.filter(x => x.role === roleId),
                  this.tlService,
                  sortOrder),
                isHidden: false
              };
            });
          default:
            // No grouping: Return all you guys!
            return [{
              labelKey: 'app.all-blades',
              blades: orderBlades(filteredBlades, this.tlService, sortOrder),
              isHidden: false
            }];
        }
      }),
      share(),
    );
  }

  private subscribeBladeMap() {
    return combineLatest(
      this.dbService.dbStore$,
      this.gameSettingsService.gameSettings$.pipe(
        distinctUntilChanged((currentSettings, newSettings) => {
          // Only rebuild if these settings changed
          return currentSettings.c === newSettings.c
            && currentSettings.e === newSettings.e
            && isEqual(currentSettings.b, newSettings.b);
        })
      ),
    ).pipe(
      map(([dbStore, gameSettings]) => {
        const blades: Blade[] = [];
        const drivers: Driver[] = [];

        const bladeMap: { [id: string]: Blade } = {};
        const driverMap: { [id: string]: Driver } = {};

        // Build Driver map
        dbStore.drivers.forEach(d => {
          const driver: Driver = {
            id: d.id,
            boundBlades: [],
            isHidden: gameSettings.c < d.chapter,
            db: d,
          };

          driverMap[d.id] = driver;
          drivers.push(driver);
        });

        // Build Blade map
        dbStore.blades.forEach(dbBlade => {
          // Load settings/weapons
          const gameSettingsBlade = gameSettings.b.find(x => x.b === dbBlade.id);
          const weapon = dbStore.weapons.find(x => x.id === dbBlade.weapon);
          if (!weapon) {
            throw new Error(`Weapon ${dbBlade.weapon} was not found in weapons DB`);
          }

          // Create base Blade
          const b: Blade = {
            id: dbBlade.id,
            db: dbBlade,
            role: weapon.role, // Overridden below
            exclusiveDriver: dbBlade.exclusiveDriver ? <DriverCharaId>dbBlade.exclusiveDriver : undefined,
            bladeType: dbBlade.type ? dbBlade.type : 'GACHA',
            element: dbBlade.element,
            boundDriver: gameSettingsBlade ? driverMap[gameSettingsBlade.d] : undefined,
            minChapter: dbBlade.chapter ? dbBlade.chapter : 2, // Default to chapter 2
            driverCombos: [], // Overridden below
            isFound: false, // Overridden below
            isHidden: true, // Overridden below
            weaponClass: weapon,
            thumbUrl: `assets/xc2/diamond_portraits/${dbBlade.id}.png`,
            aliases: dbBlade.aliases ? dbBlade.aliases : [],
            requiresExpansionPass: dbBlade.requiresExpansionPass ? true : false,
            canChangeBoundDriver: true
          };

          // Add Blade to collection
          blades.push(b);
          bladeMap[dbBlade.id] = b;

          // Post-process Blade
          b.isHidden = (
            // Blade Chapter not reached yet
            gameSettings.c < b.minChapter
          ) || (
              // Blade requires Expansion pass, but it's disabled
              b.requiresExpansionPass && !gameSettings.e
            );

          // Special Blades don't need an entry in the registered blades
          // to be bound and displayed
          b.isFound = (b.bladeType === 'CHARA'
            || b.bladeType === 'SEIHAI'
            || b.bladeType === 'STORY'
          ) && (gameSettings.c >= b.minChapter);

          // Special blades can't rebind
          b.canChangeBoundDriver = (
            b.bladeType !== 'CHARA'
            && b.bladeType !== 'SEIHAI'
            && b.bladeType !== 'STORY'
          );

          // Reset bound driver by force, if necessary
          if (!b.canChangeBoundDriver && b.exclusiveDriver) {
            b.boundDriver = driverMap[b.exclusiveDriver];
          }

          // Poppi special!
          let overrideElement = gameSettingsBlade ? gameSettingsBlade.e : undefined;
          let overrideRole = gameSettingsBlade ? gameSettingsBlade.r : undefined;

          // Poppi defaults!
          if (dbBlade.element === 'HANA' && !overrideRole) {
            overrideRole = 'TNK';
          }
          if (b.role === 'HANA' && !overrideElement) {
            switch (b.id) {
              case 'HANA_JS':
                overrideElement = 'EARTH';
                break;
              case 'HANA_JK':
                overrideElement = 'FIRE';
                break;
              case 'HANA_JD':
                overrideElement = 'ICE';
                break;
            }
          }

          if (overrideElement) {
            b.element = overrideElement;
          }
          if (overrideRole) {
            b.role = overrideRole;
          }

          // Map registered blades
          if (gameSettingsBlade) {
            b.isFound = true;
            if (b.boundDriver) {
              const dc = b.weaponClass.driverCombos[b.boundDriver.id];
              if (dc) {
                if (typeof dc === 'string') {
                  // Simple string
                  b.driverCombos = [dc];
                } else {
                  // Array
                  b.driverCombos = [...dc];
                }
              }
            }

            if (dbBlade.missingImg) {
              b.thumbUrl = `assets/xc2/diamond_portraits/WHOS-THAT-BLADE.png`;
            }
          }

          // Replace image for not-found blades
          if (!b.isFound) {
            b.thumbUrl = `assets/xc2/diamond_portraits/NOTHING-TO-SEE-HERE.png`;
          }

          // Add to relevant driver
          // Unbound blades like Poppibuster, Shulk and Fiora
          // can engage to everybody except Tora, but aren't technically bound.
          if (b.boundDriver && !b.db.unbound) {
            b.boundDriver.boundBlades.push(b);
          }
        });

        return { blades, drivers };
      }),
    ).subscribe(({ blades, drivers }) => {
      this._blades$.next(blades);
      this._drivers$.next(drivers);
    });
  }
}
