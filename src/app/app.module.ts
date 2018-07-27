import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule, ButtonsModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppComponent } from './app.component';
import { BladeDriverSelectionRowComponent } from './blade-driver-selection-row/blade-driver-selection-row.component';
import { BladeThumbnailComponent } from './blade-thumbnail/blade-thumbnail.component';
import { MyPartyPageComponent } from './my-party-page/my-party-page.component';
import { MyGamePageComponent } from './my-game-page/my-game-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MyTeamPageComponent } from './my-team-page/my-team-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const appRoutes: Routes = [
  { path: 'my-game', component: MyGamePageComponent },
  { path: 'my-party', component: MyPartyPageComponent },
  { path: 'my-team', component: MyTeamPageComponent },
  {
    path: '',
    redirectTo: '/my-game',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    MyPartyPageComponent,
    NotFoundPageComponent,
    MyGamePageComponent,
    BladeThumbnailComponent,
    BladeDriverSelectionRowComponent,
    FooterComponent,
    MyTeamPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
