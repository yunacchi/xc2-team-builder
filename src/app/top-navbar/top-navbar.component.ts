import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { GameSettingsService } from '../game-settings.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit, OnDestroy {
  public isCollapsed = true;
  public languages: string[] = [];
  public currentLanguage = 'en';

  private unsubscribe = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private gameSettingsService: GameSettingsService,
  ) {
  }

  public ngOnInit() {
    this.languages = this.translateService.langs;
    this.translateService.onLangChange
      .pipe(
        takeUntil(this.unsubscribe),
        map(gs => gs.lang),
        distinctUntilChanged(),
    ).subscribe((lang) => {
      this.currentLanguage = lang;
    });

    this.gameSettingsService.gameSettings$
      .pipe(
        takeUntil(this.unsubscribe),
        map(gs => gs.l),
        distinctUntilChanged(),
    ).subscribe((lang) => {
      this.translateService.use(lang);
    });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public selectLanguage(newLang: string) {
    this.gameSettingsService.setLang(newLang);
  }
}
