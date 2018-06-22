import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppComponent } from './app.component';
import { MyBladesPageComponent } from './my-blades-page/my-blades-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'my-blades', component: MyBladesPageComponent },
  {
    path: '',
    redirectTo: '/my-blades',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopNavbarComponent,
    MyBladesPageComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
