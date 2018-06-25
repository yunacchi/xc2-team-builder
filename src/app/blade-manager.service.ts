import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { DbRepositoryService } from './db-repository.service';
import { GameSettingsService } from './game-settings.service';
import { Blade, Driver, DriverCharaId } from './model';


@Injectable({
  providedIn: 'root'
})
export class BladeManagerService {
  private _blades$: BehaviorSubject<Blade[]> = new BehaviorSubject([]);
  private _drivers$: BehaviorSubject<Driver[]> = new BehaviorSubject([]);

  // private _blades$: BehaviorSubject<Blade[]> = new BehaviorSubject([]);
  // public blades$: Observable<Blade[]> = this._blades$.asObservable();
  public blades$: Observable<Blade[]> = this._blades$.asObservable();
  public drivers$: Observable<Driver[]> = this._drivers$.asObservable();

  constructor(
    private dbService: DbRepositoryService,
    private gameSettingsService: GameSettingsService,
  ) {
    combineLatest(
      dbService.dbStore$,
      gameSettingsService.gameSettings$,
    ).pipe(
      map(([dbStore, gameSettings]) => {
        // TODO: Optimize this.
        // This is currently called about every time any setting (lang or bound driver) change.

        const blades: Blade[] = [];
        const drivers: Driver[] = [];

        const bladeMap: {[id:string]: Blade} = {};
        const driverMap: {[id:string]: Driver} = {};

        // Build Driver map
        dbStore.drivers.forEach( d => {
          const driver: Driver = {
            id: d.id,
            boundBlades: [],
            isHidden: gameSettings.c < d.chapter,
          }

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
            boundDriver: gameSettingsBlade ? gameSettingsBlade.d : undefined,
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
            b.boundDriver = b.exclusiveDriver;
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
                overrideElement = 'FIRE';
                break;
              case 'HANA_JK':
                overrideElement = 'EARTH';
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
              const dc = b.weaponClass.driverCombos[b.boundDriver];
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
          if(b.boundDriver) {
            driverMap[b.boundDriver].boundBlades.push(b);
          }
        });

        return {blades, drivers};
      }),
    ).subscribe(({blades, drivers}) => {
      this._blades$.next(blades);
      this._drivers$.next(drivers);
    });
  }
}
