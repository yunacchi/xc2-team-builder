import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, first } from 'rxjs/operators';

export interface DbStore {
  weapons: DbWeaponClass[];
  blades: DbBlade[];
}

export type RoleId = 'ATK' | 'TNK' | 'HLR';
export type BladeTypeId = 'SEIHAI' | 'CHARA' | 'HANA' | 'GACHA' | 'STORY' | 'QUEST' | 'DLC1' | 'DLC2';
export type ElementId = 'LIGHT' | 'DARK' | 'WATER' | 'FIRE' | 'ELECTRIC' | 'EARTH' | 'ICE' | 'WIND';
export type DriverComboId = 'UNKNOWN' | 'N/A' | 'BREAK' | 'TOPPLE' | 'LAUNCH' | 'SMASH';
export type DriverCharaId = 'REX' | 'NIA' | 'TORA' | 'MELEPH' | 'ZEKE';

export type DriverComboMap = {
  [driver in DriverCharaId]: DriverComboId | DriverComboId[];
};

export interface DbWeaponClass {
  id: string;
  role: RoleId;
  driverCombos: DriverComboMap;
}

export interface DbBlade {
  albumNumber: number;
  id: string;
  weapon: string;
  element: ElementId;
  exclusiveDriver?: string;
  type?: BladeTypeId;
}

@Injectable({
  providedIn: 'root'
})
export class DbRepositoryService {

  private bladesJsonUrl = 'assets/db/blades.json';
  private weaponClassesJsonUrl = 'assets/db/weapons.json';
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _dbStore$: BehaviorSubject<DbStore> = new BehaviorSubject<DbStore>({
    weapons: [],
    blades: [],
  });

  public loading$: Observable<boolean> = this._loading$.asObservable();
  public dbStore$: Observable<DbStore> = this._dbStore$.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.loadFiles();
  }

  private loadFiles() {
    this._loading$.next(true);
    this.getDbFiles().pipe(
      first(),
    ).subscribe(
      (store) => {
        this._dbStore$.next(store);
        this._loading$.next(false);
      },
      (err) => {
        this._loading$.next(false);
        console.error(err);
        alert(err);
      },
    );
  }

  private getDbFiles(): Observable<DbStore> {
    return combineLatest(
      this.getDbWeapons(),
      this.getDbBlades()
    ).pipe(
      map(([weapons, blades]) => {
        return {
          weapons,
          blades
        };
      })
    );
  }

  private getDbWeapons(): Observable<DbWeaponClass[]> {
    return this.http.get(this.weaponClassesJsonUrl)
      .pipe(map((obj: { weapons: DbWeaponClass[] }) => obj.weapons));
  }

  private getDbBlades(): Observable<DbBlade[]> {
    return this.http.get(this.bladesJsonUrl)
      .pipe(map((obj: { blades: DbBlade[] }) => obj.blades));
  }
}
