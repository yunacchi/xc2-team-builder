import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private tlService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
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

  public selectChapter($event: KeyboardEvent | MouseEvent, newChapter: number) {
    // Always set site chapter
    this.gameSettingsService.setSiteChapter(newChapter);

    if ($event.ctrlKey) {
      // With Ctrl: Don't change the game chapter, only the background
      // Unfortunately, we need to do a few things to ensure the new chapter is not selected
      // in the html radio input buttons:

      // Store the currently selected chapter
      const previousChapter = this.currentChapter;

      // Set the variable and force-refresh Angular before the end of the method,
      // to select the new chapter in the html inputs
      this.currentChapter = newChapter;
      this.changeDetectorRef.detectChanges();

      // Reset the previous chapter
      this.currentChapter = previousChapter;
      // Angular will be refreshed after this method
      // and re-select the previous chapter in the html inputs
    } else {
      // Without Ctrl: Also change the game chapter.
      // No need to tinker with the inputs here: they change as expected.
      this.gameSettingsService.setGameChapter(newChapter);
    }
  }

  public toggleExpansionPass() {
    this.gameSettingsService.setExpansionPass(!this.expansionPass);
  }

  public importData() {
    const msg = this.tlService.instant('my-game.import-data-paste');
    const p = window.prompt(msg);
    if (p) {
      this.gameSettingsService.importJson(p);
    }
  }

  public exportData() {
    const msg = this.tlService.instant('my-game.export-data-copy');
    const p = window.prompt(msg, this.gameSettingsService.exportJson());
  }

  public resetData() {
    const msg = this.tlService.instant('my-game.reset-data-confirm');
    if (window.confirm(msg)) {
      this.gameSettingsService.resetSettings();
    }
  }
}
