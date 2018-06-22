import { Injectable } from '@angular/core';
import { DbStore } from './db-repository.service';
import { GameSettingsService } from './game-settings.service';

@Injectable({
  providedIn: 'root'
})
export class BladeManagerService {
  constructor(
    private dbService: DbStore,
    private gameSettings: GameSettingsService,
  ) { }
}
