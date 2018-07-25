import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, concat, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import {
  BladeManagerService, BladeGroup, BladeGroupingType,
  BladeOrderingType, bladeGroupingTypes, bladeOrderingTypes
} from '../blade-manager.service';
import { GameSettingsService } from '../game-settings.service';
import { Blade } from '../model';
@Component({
  selector: 'app-my-game-page',
  templateUrl: './my-game-page.component.html',
  styleUrls: ['./my-game-page.component.scss']
})
export class MyGamePageComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();

  public earlyChapters: number[] = Array(7).fill(0).map((x, i) => i + 1);
  public lateChapters: number[] = Array(3).fill(0).map((x, i) => i + 8);

  public currentChapter = 1;
  public expansionPass = false;
  public collapsedGroups: boolean[] = [];
  public bladeGroups: BladeGroup[] = [];
  public searchFilterControl = new FormControl();

  public currentGrouping: BladeGroupingType = 'NONE';
  public currentOrder: BladeOrderingType = 'ALBUM';

  public bladeGroupingTypes = bladeGroupingTypes;
  public bladeOrderingTypes = bladeOrderingTypes;

  constructor(
    private gameSettingsService: GameSettingsService,
    private bladeManagerService: BladeManagerService,
  ) {
  }

  public ngOnInit() {
    this.searchFilterControl.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((f) => {
      this.bladeManagerService.setSearchFilter(f);
    });

    this.bladeManagerService.searchFilter$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((f) => {
      this.searchFilterControl.setValue(f);
    });

    this.bladeManagerService.grouping$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((g) => {
      this.currentGrouping = g;
    });

    this.bladeManagerService.sortOrder$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((o) => {
      this.currentOrder = o;
    });

    this.gameSettingsService.gameSettings$.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(s => {
      this.currentChapter = s.c;
      this.expansionPass = s.e;
    });

    this.bladeManagerService.groupedBlades$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((bladeGroups) => {
      this.bladeGroups = bladeGroups;
    });

    this.bladeManagerService.grouping$.pipe(
      takeUntil(this.unsubscribe),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.collapsedGroups = [];
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public groupBy(g: BladeGroupingType) {
    this.bladeManagerService.setGrouping(g);
  }

  public orderBy(o: BladeOrderingType) {
    this.bladeManagerService.setOrdering(o);
  }

  public selectChapter(newChapter: number) {
    this.gameSettingsService.setChapter(newChapter);
  }

  public toggleExpansionPass() {
    this.gameSettingsService.setExpansionPass(!this.expansionPass);
  }

  public importData() {
    const p = window.prompt('Paste your data:');
    if (p) {
      this.gameSettingsService.importJson(p);
    }
  }

  public exportData() {
    const p = window.prompt('Copy your data:', this.gameSettingsService.exportJson());
  }
}
