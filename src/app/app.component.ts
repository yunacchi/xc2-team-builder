import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { GameSettingsService } from './game-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  public appStyle: any = {};

  constructor(
    private translateService: TranslateService,
    private gameSettingsService: GameSettingsService,
  ) {
    // Default language
    translateService.setDefaultLang('en');
    translateService.addLangs(['en', 'en-JP']);
    // Current language
    // translateService.use('en');
  }

  public ngOnInit() {
    this.gameSettingsService.siteSettings$
      .pipe(
        takeUntil(this.unsubscribe),
        map(s => s.bgChapter),
        distinctUntilChanged()
      ).subscribe(c => {
        this.appStyle['background-image'] = `url('assets/xc2/chapter-bg/${c}.jpg')`;
      });

    combineLatest(
      this.gameSettingsService.siteSettings$,
      this.translateService.get('app.spoiler-warning-title'),
      this.translateService.get('app.spoiler-warning'),
      this.translateService.get('app.close-action'),
      this.translateService.get('app.game-copyright'),
      this.translateService.get('app.assets-copyright'),
      this.translateService.get('app.discharge-disclaimer'),
    )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([settings, title, messageHtml, close, copyright, copyright2, disclaimer]) => {
        if (!settings.disclaimerClosed) {
          // Show spoiler warning.
          Swal({
            titleText: title,
            html: messageHtml,
            type: 'warning',
            confirmButtonText: close,
            allowOutsideClick: false,
            allowEscapeKey: false,
            width: '40rem',
            backdrop: `
            url("assets/xc2/chapter-bg/0.jpg")
            black
            center/cover
          `,
            footer: `${disclaimer}<br>${copyright}<br>${copyright2}`
          }).then(x => {
            this.gameSettingsService.setSpoiler(true);
          });
        }
      });
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
