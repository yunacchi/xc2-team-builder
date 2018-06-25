import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DbBlade, DbStore, DbWeaponClass, driverCharacters } from './model';

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
    drivers: [],
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
          blades,
          drivers: driverCharacters,
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
