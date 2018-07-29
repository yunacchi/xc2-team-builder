import { Component, OnInit } from '@angular/core';
import { TeamComputerService } from '../team-computer.service';
import { BladeManagerService } from '../blade-manager.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Blade, Driver } from '../model';
import { GameSettingsService } from '../game-settings.service';

@Component({
  selector: 'app-my-team-page',
  templateUrl: './my-team-page.component.html',
  styleUrls: ['./my-team-page.component.scss']
})
export class MyTeamPageComponent implements OnInit {
  private unsubscribe = new Subject<void>();
  private bladePool: Blade[] = [];
  private driverPool: Driver[] = [];
  private currentChapter = 1;

  constructor(
    private teamComputerService: TeamComputerService,
    private bladeManagerService: BladeManagerService,
    private gameSettings: GameSettingsService,
  ) { }

  ngOnInit() {
    this.bladeManagerService.allBlades$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((blades) => {
        this.bladePool = blades.filter(b => !b.isHidden);
      });

    this.bladeManagerService.allDrivers$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((drivers) => {
        this.driverPool = drivers.filter(b => !b.isHidden);
      });

    this.gameSettings.gameSettings$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((gameSettings) => {
        this.currentChapter = gameSettings.c;
      });
  }

  public doStuff() {
    this.teamComputerService.computeTeams(
      this.bladePool,
      this.driverPool,
      this.currentChapter,
      {
        disableCharacterBladeReassignment: false,
        disableRexMasterDriver: false,
      }
    );
  }
}
