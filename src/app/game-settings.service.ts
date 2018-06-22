import { Injectable } from '@angular/core';
import { DriverCharaId, ElementId, RoleId } from './db-repository.service';
import { Observable, BehaviorSubject } from 'rxjs';

interface ObtainedBlade {
  bladeId: string;
  driverId: DriverCharaId;
  overrideElement?: ElementId;
  overrideRole?: RoleId;
}

export interface GameSettings {
  currentChapter: number; // 1 to 10 - Above this is New Game +
  myBlades: ObtainedBlade[];
}

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private _gameSettings$: BehaviorSubject<GameSettings> = new BehaviorSubject({
    currentChapter: 1,
    myBlades: [
      {
        bladeId: 'SEIHAI_HOMURA',
        driverId: <DriverCharaId>'REX',
      }
    ]
  });

  public gameSettings$: Observable<GameSettings> = this._gameSettings$.asObservable();

  constructor() {
  }
}
