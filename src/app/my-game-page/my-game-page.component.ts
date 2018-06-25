import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, concat, Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, takeUntil } from 'rxjs/operators';
import { BladeManagerService } from '../blade-manager.service';
import { GameSettingsService } from '../game-settings.service';
import { Blade } from '../model';

@Component({
  selector: 'app-my-game-page',
  templateUrl: './my-game-page.component.html',
  styleUrls: ['./my-game-page.component.scss']
})
export class MyGamePageComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject<void>();
  private lang$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  private filter$: BehaviorSubject<string> = new BehaviorSubject('');

  public currentChapter = 1;
  // There are 10 chapters.
  public earlyChapters: number[] = Array(7).fill(0).map((x, i) => i + 1);
  public lateChapters: number[] = Array(3).fill(0).map((x, i) => i + 8);
  public gachaBlades: Blade[] = [];
  public questBlades: Blade[] = [];
  public storyBlades: Blade[] = [];
  public expansionPass = false;
  public collapseQuestBlades = false;
  public collapseGachaBlades = false;
  public collapseStoryBlades = false;
  public searchFilterControl = new FormControl();

  constructor(
    private gameSettingsService: GameSettingsService,
    private bladeManagerService: BladeManagerService,
    private tlService: TranslateService,
  ) {
  }

  public ngOnInit() {
    this.lang$.next(this.tlService.currentLang);
    this.tlService.onLangChange.asObservable()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((langEvt) => {
        this.lang$.next(langEvt.lang);
      });
    this.searchFilterControl.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((f) => {
        this.filter$.next(f);
      });

    this.gameSettingsService.gameSettings$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(s => {
        this.currentChapter = s.c;
        this.expansionPass = s.e;
      });

    combineLatest(
      this.bladeManagerService.blades$,
      this.filter$,
      this.lang$,
    ).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(([blades, filter, lang]) => {
      this.gachaBlades = blades.filter(b => !b.isHidden
        && b.bladeType === 'GACHA' // Vanilla Gacha Blades
        && this.bladeMatchesFilter(b, filter));

      this.questBlades = blades.filter(b => !b.isHidden
        && b.bladeType === 'QUEST' // Non-mandatory blades
        && this.bladeMatchesFilter(b, filter));

      this.storyBlades = blades.filter(b => !b.isHidden
        && (
          b.bladeType === 'STORY' // Mandatory Blades (Roc, Aegaeon, Nia)
          || b.bladeType === 'CHARA' // Character Blades (Dromarch, Brighid, Pandoria)
          || b.bladeType === 'SEIHAI' // Aegis forms
        ) && this.bladeMatchesFilter(b, filter));
    });
  }

  private bladeMatchesFilter(b: Blade, filter: string): boolean {
    if (!filter) {
      return true;
    }
    const matches: string[] = [];
    const bladeName = this.tlService.instant('blades.' + b.id);
    filter = filter.trim().toLowerCase();
    matches.push(
      b.id.toLowerCase(),
      bladeName.toLowerCase(),
    );
    if (b.aliases && b.aliases.length) {
      b.aliases.forEach(a => matches.push(a.toLowerCase()));
    }
    if (b.boundDriver) {
      matches.push(this.tlService.instant('drivers.' + b.boundDriver).toLowerCase());
    }
    matches.push(this.tlService.instant('elements.' + b.element).toLowerCase());
    matches.push(this.tlService.instant('weapons.' + b.weaponClass.id).toLowerCase());
    matches.push(this.tlService.instant('roles.' + b.role).toLowerCase());
    // const bladeName = this.tlService.get('blades'+b.id);
    return matches.some(s => s.includes(filter));
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
