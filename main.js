(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app\" [ngStyle]=\"appStyle\">\r\n  <app-top-navbar></app-top-navbar>\r\n  <router-outlet></router-outlet>\r\n  <app-footer></app-footer>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host, .app {\n  display: block;\n  min-height: 100%; }\n\n.app {\n  background-size: cover;\n  background-attachment: fixed; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game-settings.service */ "./src/app/game-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = /** @class */ (function () {
    function AppComponent(translateService, gameSettingsService) {
        this.translateService = translateService;
        this.gameSettingsService = gameSettingsService;
        this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.appStyle = {};
        // Default language
        translateService.setDefaultLang('en');
        translateService.addLangs(['en', 'en-JP']);
        // Current language
        // translateService.use('en');
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameSettingsService.siteSettings$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.unsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (s) { return s.bgChapter; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])()).subscribe(function (c) {
            _this.appStyle['background-image'] = "url('assets/xc2/chapter-bg/" + c + ".jpg')";
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.gameSettingsService.siteSettings$, this.translateService.get('app.spoiler-warning-title'), this.translateService.get('app.spoiler-warning'), this.translateService.get('app.close-action'), this.translateService.get('app.game-copyright'), this.translateService.get('app.assets-copyright'), this.translateService.get('app.discharge-disclaimer'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.unsubscribe))
            .subscribe(function (_a) {
            var settings = _a[0], title = _a[1], messageHtml = _a[2], close = _a[3], copyright = _a[4], copyright2 = _a[5], disclaimer = _a[6];
            if (!settings.disclaimerClosed) {
                // Show spoiler warning.
                sweetalert2__WEBPACK_IMPORTED_MODULE_4___default()({
                    titleText: title,
                    html: messageHtml,
                    type: 'warning',
                    confirmButtonText: close,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    width: '40rem',
                    backdrop: "\n            url(\"assets/xc2/chapter-bg/0.jpg\")\n            black\n            center/cover\n          ",
                    footer: disclaimer + "<br>" + copyright + "<br>" + copyright2
                }).then(function (x) {
                    _this.gameSettingsService.setSpoiler(true);
                });
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"],
            _game_settings_service__WEBPACK_IMPORTED_MODULE_5__["GameSettingsService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: HttpLoaderFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/esm5/ngx-translate-http-loader.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/collapse */ "./node_modules/ngx-bootstrap/collapse/index.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _blade_driver_selection_row_blade_driver_selection_row_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./blade-driver-selection-row/blade-driver-selection-row.component */ "./src/app/blade-driver-selection-row/blade-driver-selection-row.component.ts");
/* harmony import */ var _blade_thumbnail_blade_thumbnail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./blade-thumbnail/blade-thumbnail.component */ "./src/app/blade-thumbnail/blade-thumbnail.component.ts");
/* harmony import */ var _my_party_page_my_party_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./my-party-page/my-party-page.component */ "./src/app/my-party-page/my-party-page.component.ts");
/* harmony import */ var _my_game_page_my_game_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./my-game-page/my-game-page.component */ "./src/app/my-game-page/my-game-page.component.ts");
/* harmony import */ var _not_found_page_not_found_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./not-found-page/not-found-page.component */ "./src/app/not-found-page/not-found-page.component.ts");
/* harmony import */ var _top_navbar_top_navbar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./top-navbar/top-navbar.component */ "./src/app/top-navbar/top-navbar.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _my_team_page_my_team_page_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./my-team-page/my-team-page.component */ "./src/app/my-team-page/my-team-page.component.ts");
/* harmony import */ var ngx_drag_drop__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-drag-drop */ "./node_modules/ngx-drag-drop/ngx-drag-drop.es5.js");
/* harmony import */ var _xc2_element_icon_xc2_element_icon_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./xc2-element-icon/xc2-element-icon.component */ "./src/app/xc2-element-icon/xc2-element-icon.component.ts");
/* harmony import */ var _xc2_role_icon_xc2_role_icon_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./xc2-role-icon/xc2-role-icon.component */ "./src/app/xc2-role-icon/xc2-role-icon.component.ts");
/* harmony import */ var _xc2_driver_combo_icon_xc2_driver_combo_icon_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./xc2-driver-combo-icon/xc2-driver-combo-icon.component */ "./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.ts");
/* harmony import */ var _blade_tooltip_content_blade_tooltip_content_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./blade-tooltip-content/blade-tooltip-content.component */ "./src/app/blade-tooltip-content/blade-tooltip-content.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























function HttpLoaderFactory(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_6__["TranslateHttpLoader"](http, "./assets/i18n/", ".json");
}
var appRoutes = [
    { path: 'my-game', component: _my_game_page_my_game_page_component__WEBPACK_IMPORTED_MODULE_13__["MyGamePageComponent"] },
    { path: 'my-party', component: _my_party_page_my_party_page_component__WEBPACK_IMPORTED_MODULE_12__["MyPartyPageComponent"] },
    { path: 'my-team', component: _my_team_page_my_team_page_component__WEBPACK_IMPORTED_MODULE_17__["MyTeamPageComponent"] },
    {
        path: '',
        redirectTo: '/my-game',
        pathMatch: 'full'
    },
    { path: '**', component: _not_found_page_not_found_page_component__WEBPACK_IMPORTED_MODULE_14__["NotFoundPageComponent"] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
                _top_navbar_top_navbar_component__WEBPACK_IMPORTED_MODULE_15__["TopNavbarComponent"],
                _my_party_page_my_party_page_component__WEBPACK_IMPORTED_MODULE_12__["MyPartyPageComponent"],
                _not_found_page_not_found_page_component__WEBPACK_IMPORTED_MODULE_14__["NotFoundPageComponent"],
                _my_game_page_my_game_page_component__WEBPACK_IMPORTED_MODULE_13__["MyGamePageComponent"],
                _blade_thumbnail_blade_thumbnail_component__WEBPACK_IMPORTED_MODULE_11__["BladeThumbnailComponent"],
                _blade_driver_selection_row_blade_driver_selection_row_component__WEBPACK_IMPORTED_MODULE_10__["BladeDriverSelectionRowComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_16__["FooterComponent"],
                _my_team_page_my_team_page_component__WEBPACK_IMPORTED_MODULE_17__["MyTeamPageComponent"],
                _xc2_element_icon_xc2_element_icon_component__WEBPACK_IMPORTED_MODULE_19__["Xc2ElementIconComponent"],
                _xc2_role_icon_xc2_role_icon_component__WEBPACK_IMPORTED_MODULE_20__["Xc2RoleIconComponent"],
                _xc2_driver_combo_icon_xc2_driver_combo_icon_component__WEBPACK_IMPORTED_MODULE_21__["Xc2DriverComboIconComponent"],
                _blade_tooltip_content_blade_tooltip_content_component__WEBPACK_IMPORTED_MODULE_22__["BladeTooltipContentComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["ButtonsModule"].forRoot(),
                ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_8__["CollapseModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["BsDropdownModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_7__["TooltipModule"].forRoot(),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateLoader"],
                        useFactory: HttpLoaderFactory,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]]
                    }
                }),
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot(appRoutes),
                ngx_drag_drop__WEBPACK_IMPORTED_MODULE_18__["DndModule"],
            ],
            providers: [
                { provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["LOCALE_ID"], useValue: 'en-US' },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/blade-driver-selection-row/blade-driver-selection-row.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/blade-driver-selection-row/blade-driver-selection-row.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n\r\n  <div class=\"col-lg-8 col-md-8 col-sm-6 blade-col\">\r\n    <app-blade-thumbnail [blade]=\"blade\" [showRole]=\"true\" [showDriver]=\"true\" [showElement]=\"true\"></app-blade-thumbnail>\r\n    <span class=\"blade-name\">{{'blades.'+blade.id|translate}}</span>\r\n  </div>\r\n\r\n  <div class=\"col-lg-4 col-md-4 col-sm-6\">\r\n    <div *ngIf=\"!blade.db.unbound\" class=\"btn-group\" role=\"group\" aria-label=\"Blade driver selection\" btnRadioGroup [ngModel]=\"blade.boundDriver\">\r\n      <button type=\"button\" role=\"button\" class=\"btn character-button\" *ngFor=\"let driver of drivers$ | async\" [disabled]=\"!blade.canChangeBoundDriver\"\r\n        [ngClass]=\"{'btn-success': blade.isFound, 'btn-info': !blade.isFound }\" [attr.title]=\"'drivers.'+driver.id|translate\"\r\n        [btnRadio]=\"driver\" (click)=\"setDriver(blade, driver.id)\">\r\n        <div class=\"character-img\" [ngStyle]=\"getButtonStyle(driver.id)\"></div>\r\n      </button>\r\n    </div>\r\n    <div *ngIf=\"blade.db.unbound && (this.defaultDriver$ | async) as defaultDriver\" class=\"btn-group all-drivers-group\" role=\"group\"\r\n      aria-label=\"Blade driver selection\" btnRadioGroup [ngModel]=\"blade.boundDriver\">\r\n      <button type=\"button\" role=\"button\" class=\"btn character-button\" *ngFor=\"let driver of drivers$ | async\" [ngClass]=\"{'btn-success': blade.isFound, 'btn-info': !blade.isFound }\"\r\n        [btnRadio]=\"defaultDriver\" (click)=\"setDriver(blade, defaultDriver.id)\">\r\n        <div class=\"character-img\" [attr.title]=\"'drivers.'+driver.id|translate\" [ngStyle]=\"getButtonStyle(driver.id)\"></div>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div *ngIf=\"blade.db.element === 'HANA' && blade.isFound\" class=\"col-md-6\">\r\n    {{'my-game.hana-element'|translate}}\r\n    <div class=\"btn-group\" role=\"group\" aria-label=\"Blade element selection\" btnRadioGroup [ngModel]=\"blade.element\">\r\n      <button type=\"button\" role=\"button\" class=\"btn element-button btn-default\" *ngFor=\"let elementId of elements\" [attr.title]=\"'elements.'+elementId|translate\"\r\n        [btnRadio]=\"elementId\" (click)=\"setElement(blade, elementId)\">\r\n        <div class=\"element-img\" [ngStyle]=\"getElementBgStyle(elementId)\"></div>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div *ngIf=\"blade.weaponClass.role === 'HANA' && blade.isFound\" class=\"col-md-6\">\r\n    {{'my-game.hana-role'|translate}}\r\n    <div class=\"btn-group\" role=\"group\" aria-label=\"Blade role selection\" btnRadioGroup [ngModel]=\"blade.role\">\r\n      <button type=\"button\" role=\"button\" class=\"btn role-button\" *ngFor=\"let roleId of roles\" [attr.title]=\"'roles.'+roleId|translate\"\r\n        [btnRadio]=\"roleId\" (click)=\"setRole(blade, roleId)\">\r\n        <div class=\"role-img\" [ngStyle]=\"getRoleBgStyle(roleId)\">{{roleId}}</div>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/blade-driver-selection-row/blade-driver-selection-row.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/blade-driver-selection-row/blade-driver-selection-row.component.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".btn-group.all-drivers-group.active .character-img, .btn-group.all-drivers-group.active .role-img, .btn-group.all-drivers-group.active .element-img, .btn-group.all-drivers-group:hover .character-img, .btn-group.all-drivers-group:hover .role-img, .btn-group.all-drivers-group:hover .element-img {\n  opacity: 1; }\n\n.character-button {\n  height: 56px; }\n\n.blade-name {\n  margin-left: 10px; }\n\n.character-button, .element-button, .role-button {\n  padding: 0; }\n\n.character-button .character-img, .character-button .element-img, .character-button .role-img, .element-button .character-img, .element-button .element-img, .element-button .role-img, .role-button .character-img, .role-button .element-img, .role-button .role-img {\n    opacity: 0.3;\n    background-size: contain; }\n\n.character-button .character-img, .element-button .character-img, .role-button .character-img {\n    display: inline-block;\n    height: 56px;\n    width: 56px; }\n\n.character-button .element-img, .element-button .element-img, .role-button .element-img {\n    height: 28px;\n    width: 28px; }\n\n.character-button .role-img, .element-button .role-img, .role-button .role-img {\n    height: 28px;\n    padding: 0 3px;\n    font-weight: bold; }\n\n.character-button.active .character-img, .character-button.active .role-img, .character-button.active .element-img, .character-button:hover .character-img, .character-button:hover .role-img, .character-button:hover .element-img, .element-button.active .character-img, .element-button.active .role-img, .element-button.active .element-img, .element-button:hover .character-img, .element-button:hover .role-img, .element-button:hover .element-img, .role-button.active .character-img, .role-button.active .role-img, .role-button.active .element-img, .role-button:hover .character-img, .role-button:hover .role-img, .role-button:hover .element-img {\n    opacity: 1; }\n\n.blade-col {\n  display: flex;\n  flex-direction: row;\n  align-items: center; }\n"

/***/ }),

/***/ "./src/app/blade-driver-selection-row/blade-driver-selection-row.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/blade-driver-selection-row/blade-driver-selection-row.component.ts ***!
  \************************************************************************************/
/*! exports provided: BladeDriverSelectionRowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BladeDriverSelectionRowComponent", function() { return BladeDriverSelectionRowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _db_repository_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../db-repository.service */ "./src/app/db-repository.service.ts");
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game-settings.service */ "./src/app/game-settings.service.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model */ "./src/app/model.ts");
/* harmony import */ var _blade_manager_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../blade-manager.service */ "./src/app/blade-manager.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BladeDriverSelectionRowComponent = /** @class */ (function () {
    function BladeDriverSelectionRowComponent(dbService, settingsService, bladeMgrService) {
        var _this = this;
        this.dbService = dbService;
        this.settingsService = settingsService;
        this.bladeMgrService = bladeMgrService;
        this.elements = _model__WEBPACK_IMPORTED_MODULE_5__["elements"];
        this.roles = _model__WEBPACK_IMPORTED_MODULE_5__["roles"];
        this.drivers$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])(bladeMgrService.allDrivers$, settingsService.gameSettings$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var drivers = _a[0], gameSettings = _a[1];
            return drivers
                .filter(function (d) { return d.db.chapter <= gameSettings.c
                && _this.canBind(_this.blade, d.id); });
        }));
        this.defaultDriver$ = bladeMgrService.allDrivers$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (drivers) { return drivers.find(function (x) { return x.id === 'REX'; }); }));
    }
    BladeDriverSelectionRowComponent.prototype.ngOnInit = function () {
    };
    BladeDriverSelectionRowComponent.prototype.setDriver = function (blade, driverId) {
        if (blade.boundDriver && driverId === blade.boundDriver.id) {
            // Toggle to unbound
            this.settingsService.removeBlade(blade.id);
        }
        else if (this.canBind(blade, driverId)) {
            this.settingsService.addBlade(blade.id, driverId);
        }
    };
    // TODO: staticify that and put it near the Blade interface?
    BladeDriverSelectionRowComponent.prototype.canBind = function (blade, driverId) {
        // Remember Binding !== Engaging
        // Master Driver Rex can *engage* almost any blade without *binding* to them
        switch (blade.bladeType) {
            case 'SEIHAI':
                // Only Rex can bind to the Aegis
                return driverId === 'REX';
            default:
                // Defer to the exclusiveDriver prop of the Blade
                if (blade.exclusiveDriver) {
                    return driverId === blade.exclusiveDriver;
                }
                else {
                    // All other blades can bind to anybody but Tora
                    // (Except Shulk/Fiora? Gotta check that)
                    return blade.canChangeBoundDriver && driverId !== 'TORA';
                }
        }
    };
    BladeDriverSelectionRowComponent.prototype.getButtonStyle = function (driverId) {
        return {
            'background-image': "url('assets/xc2/driver_icons/" + driverId + ".png')"
        };
    };
    BladeDriverSelectionRowComponent.prototype.setElement = function (blade, elementId) {
        this.settingsService.addBlade(blade.id, blade.boundDriver.id, elementId, blade.role);
    };
    BladeDriverSelectionRowComponent.prototype.setRole = function (blade, roleId) {
        this.settingsService.addBlade(blade.id, blade.boundDriver.id, blade.element, roleId);
    };
    BladeDriverSelectionRowComponent.prototype.getElementBgStyle = function (elementId) {
        return {
            'background-image': "url('assets/xc2/elements/" + elementId + ".png')"
        };
    };
    BladeDriverSelectionRowComponent.prototype.getRoleBgStyle = function (roleId) {
        return {};
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], BladeDriverSelectionRowComponent.prototype, "blade", void 0);
    BladeDriverSelectionRowComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-blade-driver-selection-row',
            template: __webpack_require__(/*! ./blade-driver-selection-row.component.html */ "./src/app/blade-driver-selection-row/blade-driver-selection-row.component.html"),
            styles: [__webpack_require__(/*! ./blade-driver-selection-row.component.scss */ "./src/app/blade-driver-selection-row/blade-driver-selection-row.component.scss")]
        }),
        __metadata("design:paramtypes", [_db_repository_service__WEBPACK_IMPORTED_MODULE_3__["DbRepositoryService"],
            _game_settings_service__WEBPACK_IMPORTED_MODULE_4__["GameSettingsService"],
            _blade_manager_service__WEBPACK_IMPORTED_MODULE_6__["BladeManagerService"]])
    ], BladeDriverSelectionRowComponent);
    return BladeDriverSelectionRowComponent;
}());



/***/ }),

/***/ "./src/app/blade-manager.service.ts":
/*!******************************************!*\
  !*** ./src/app/blade-manager.service.ts ***!
  \******************************************/
/*! exports provided: bladeGroupingTypes, bladeOrderingTypes, BladeManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bladeGroupingTypes", function() { return bladeGroupingTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bladeOrderingTypes", function() { return bladeOrderingTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BladeManagerService", function() { return BladeManagerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _db_repository_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db-repository.service */ "./src/app/db-repository.service.ts");
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-settings.service */ "./src/app/game-settings.service.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./model */ "./src/app/model.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var bladeGroupingTypes = [
    'NONE', 'ACQUISITION', 'BLADETYPE', 'DRIVER', 'ELEMENT', 'ROLE'
];
var bladeOrderingTypes = [
    'ALBUM', 'NAME', 'DRIVER', 'ELEMENT', 'ROLE', 'WEAPON'
];
var bladeOrderKeySelectors = {
    'ALBUM': function (b) { return b.db.albumNumber; },
    'NAME': function (b) { return b.id; },
    'DRIVER': function (b) { return b.boundDriver ? b.boundDriver.db.sortIdx : 999; },
    'ELEMENT': function (b) { return _model__WEBPACK_IMPORTED_MODULE_5__["elements"].indexOf(b.element); },
    'ROLE': function (b) { return _model__WEBPACK_IMPORTED_MODULE_5__["roles"].indexOf(b.role); },
    'WEAPON': function (b) { return b.weaponClass.sortIdx; },
};
function orderBlades(blades, tlService, sortOrder) {
    if (sortOrder === 'NAME') {
        var f = function (b) { return tlService.instant('blades.' + b.id).toLowerCase(); };
        return Object(lodash__WEBPACK_IMPORTED_MODULE_6__["sortBy"])(blades, f);
    }
    else {
        return Object(lodash__WEBPACK_IMPORTED_MODULE_6__["sortBy"])(blades, bladeOrderKeySelectors[sortOrder]);
    }
}
function filterBlades(blades, index, searchFilter) {
    searchFilter = searchFilter ? searchFilter.trim() : '';
    if (searchFilter) {
        var matchedBladeIds_1 = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["uniq"])(Object(lodash__WEBPACK_IMPORTED_MODULE_6__["flatten"])(Object.keys(index) // From all phrases
            .filter(function (s) { return s.includes(searchFilter); }) // Take phrases that match the filter
            .map(function (k) { return index[k]; }) // Select blade IDs from index
        )); // De-duplicated in uniq call
        // Map and filter blade IDs
        return blades.filter(function (b) { return matchedBladeIds_1.indexOf(b.id) >= 0 && !b.isHidden; });
    }
    else {
        return blades.filter(function (b) { return !b.isHidden; });
    }
}
function createOrAddIndexPhrase(index, b, phrase) {
    phrase = phrase.trim().toLowerCase();
    if (phrase) {
        if (index[phrase] && index[phrase].indexOf(b.id) < 0) {
            index[phrase].push(b.id);
        }
        else {
            index[phrase] = [b.id];
        }
    }
    return index;
}
function generateBladeSearchIndex(blades, tlService) {
    if (!tlService || !tlService.currentLang) {
        return {};
    }
    var index = {};
    for (var i = 0; i < blades.length; i++) {
        var b = blades[i];
        // Match blade ID
        createOrAddIndexPhrase(index, b, b.id);
        // Match TL name
        createOrAddIndexPhrase(index, b, tlService.instant('blades.' + b.id));
        // Match aliases
        for (var j = 0; j < b.aliases.length; j++) {
            createOrAddIndexPhrase(index, b, b.aliases[j]);
        }
        // Match bound driver TL name
        if (b.boundDriver) {
            createOrAddIndexPhrase(index, b, tlService.instant('drivers.' + b.boundDriver.id));
        }
        // Match elment, weapon, and role TL names
        createOrAddIndexPhrase(index, b, tlService.instant('elements.' + b.element));
        createOrAddIndexPhrase(index, b, tlService.instant('weapons.' + b.weaponClass.id));
        createOrAddIndexPhrase(index, b, tlService.instant('roles.' + b.role));
    }
    return index;
}
var BladeManagerService = /** @class */ (function () {
    function BladeManagerService(dbService, gameSettingsService, tlService) {
        var _this = this;
        this.dbService = dbService;
        this.gameSettingsService = gameSettingsService;
        this.tlService = tlService;
        this._blades$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this._drivers$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this._sortOrder$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('ALBUM');
        this._grouping$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('NONE');
        this._searchFilter$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this.allDrivers$ = this._drivers$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (a) { return a.length > 0; }));
        this.sortOrder$ = this._sortOrder$.asObservable();
        this.grouping$ = this._grouping$.asObservable();
        this.searchFilter$ = this._searchFilter$.asObservable();
        this._bladeSearchIndex$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]({});
        // Used for triggering recompute of filter on lang change.
        this.lang$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this.allBlades$ = this._blades$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (a) { return a.length > 0; }));
        this.ungroupedBlades$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])(this._blades$, this._sortOrder$, this._searchFilter$, this._bladeSearchIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (a) { return a.length > 0; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var blades = _a[0], sortOrder = _a[1], searchFilter = _a[2], index = _a[3];
            var filteredBlades = filterBlades(blades, index, searchFilter);
            return orderBlades(filteredBlades, _this.tlService, sortOrder);
        }));
        // Build blade and driver map from DB+Settings
        this.bladeMapSubscription = this.subscribeBladeMap();
        // Subscribe to search index updates
        this.searchIndexSubscription = this.subscribeSearchIndex();
        this.groupedBlades$ = this.buildGroupedBladesObservable();
        this.lang$.next(this.tlService.currentLang);
        this.tlService.onLangChange.asObservable().subscribe(function (l) {
            _this.lang$.next(l.lang);
        });
    }
    BladeManagerService.prototype.setGrouping = function (grouping) {
        this._grouping$.next(grouping);
    };
    BladeManagerService.prototype.setOrdering = function (ordering) {
        this._sortOrder$.next(ordering);
    };
    BladeManagerService.prototype.setSearchFilter = function (searchFilter) {
        this._searchFilter$.next(searchFilter);
    };
    BladeManagerService.prototype.subscribeSearchIndex = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])(this._blades$, this.lang$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var blades = _a[0];
            return generateBladeSearchIndex(blades, _this.tlService);
        })).subscribe(function (f) {
            _this._bladeSearchIndex$.next(f);
        });
    };
    BladeManagerService.prototype.buildGroupedBladesObservable = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])(this._blades$, this._drivers$, this._sortOrder$, this._grouping$, this._searchFilter$, this._bladeSearchIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var allBlades = _a[0], allDrivers = _a[1], sortOrder = _a[2], grouping = _a[3], searchFilter = _a[4], index = _a[5];
            var filteredBlades = filterBlades(allBlades, index, searchFilter);
            switch (grouping) {
                case 'ACQUISITION':
                    // Separate by acquisition:
                    // Quest blades, gacha blades, and story blades.
                    return [
                        {
                            labelKey: 'my-game.quest-blades',
                            blades: orderBlades(filteredBlades.filter(function (x) { return x.bladeType === 'QUEST'; }), _this.tlService, sortOrder),
                            isHidden: false
                        },
                        {
                            labelKey: 'my-game.gacha-blades',
                            blades: orderBlades(filteredBlades.filter(function (x) { return x.bladeType === 'GACHA'; }), _this.tlService, sortOrder),
                            isHidden: false
                        },
                        {
                            labelKey: 'my-game.gacha-blades',
                            blades: orderBlades(filteredBlades.filter(function (x) {
                                return x.bladeType === 'STORY' // Story blades (Roc, Aegaeon, Nia)
                                    || x.bladeType === 'CHARA' // Character Blades (Dromarch, Brighid, Pandoria)
                                    || x.bladeType === 'SEIHAI';
                            } // Aegis forms
                            ), _this.tlService, sortOrder),
                            isHidden: false
                        }
                    ];
                case 'BLADETYPE':
                    return _model__WEBPACK_IMPORTED_MODULE_5__["bladeTypes"].map(function (bt) {
                        return {
                            labelKey: 'blade-types.' + bt,
                            blades: orderBlades(filteredBlades.filter(function (x) { return x.bladeType === bt; }), _this.tlService, sortOrder),
                            isHidden: false
                        };
                    });
                case 'DRIVER':
                    return allDrivers.map(function (d) {
                        return {
                            labelKey: 'drivers.' + d.id,
                            blades: orderBlades(filteredBlades.filter(function (x) { return x.boundDriver === d; }), _this.tlService, sortOrder),
                            isHidden: d.isHidden
                        };
                    }).concat({
                        labelKey: 'app.no-driver',
                        blades: orderBlades(filteredBlades.filter(function (x) { return x.boundDriver === undefined; }), _this.tlService, sortOrder),
                        isHidden: false
                    });
                case 'ELEMENT':
                    return _model__WEBPACK_IMPORTED_MODULE_5__["elements"].map(function (elementId) {
                        return {
                            labelKey: 'elements.' + elementId,
                            blades: orderBlades(filteredBlades.filter(function (x) { return x.element === elementId; }), _this.tlService, sortOrder),
                            isHidden: false
                        };
                    });
                case 'ROLE':
                    return _model__WEBPACK_IMPORTED_MODULE_5__["roles"].map(function (roleId) {
                        return {
                            labelKey: 'roles.' + roleId,
                            blades: orderBlades(filteredBlades.filter(function (x) { return x.role === roleId; }), _this.tlService, sortOrder),
                            isHidden: false
                        };
                    });
                default:
                    // No grouping: Return all you guys!
                    return [{
                            labelKey: 'app.all-blades',
                            blades: orderBlades(filteredBlades, _this.tlService, sortOrder),
                            isHidden: false
                        }];
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
    };
    BladeManagerService.prototype.subscribeBladeMap = function () {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])(this.dbService.dbStore$, this.gameSettingsService.gameSettings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(function (currentSettings, newSettings) {
            // Only rebuild if these settings changed
            return currentSettings.c === newSettings.c
                && currentSettings.e === newSettings.e
                && Object(lodash__WEBPACK_IMPORTED_MODULE_6__["isEqual"])(currentSettings.b, newSettings.b);
        }))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (_a) {
            var dbStore = _a[0], gameSettings = _a[1];
            var blades = [];
            var drivers = [];
            var bladeMap = {};
            var driverMap = {};
            // Build Driver map
            dbStore.drivers.forEach(function (d) {
                var driver = {
                    id: d.id,
                    boundBlades: [],
                    isHidden: gameSettings.c < d.chapter,
                    db: d,
                };
                driverMap[d.id] = driver;
                drivers.push(driver);
            });
            // Build Blade map
            dbStore.blades.forEach(function (dbBlade) {
                // Load settings/weapons
                var gameSettingsBlade = gameSettings.b.find(function (x) { return x.b === dbBlade.id; });
                var weapon = dbStore.weapons.find(function (x) { return x.id === dbBlade.weapon; });
                if (!weapon) {
                    throw new Error("Weapon " + dbBlade.weapon + " was not found in weapons DB");
                }
                // Create base Blade
                var b = {
                    id: dbBlade.id,
                    db: dbBlade,
                    role: weapon.role,
                    exclusiveDriver: dbBlade.exclusiveDriver ? dbBlade.exclusiveDriver : undefined,
                    bladeType: dbBlade.type ? dbBlade.type : 'GACHA',
                    element: dbBlade.element,
                    boundDriver: gameSettingsBlade ? driverMap[gameSettingsBlade.d] : undefined,
                    minChapter: dbBlade.chapter ? dbBlade.chapter : 2,
                    driverCombos: [],
                    isFound: false,
                    isHidden: true,
                    weaponClass: weapon,
                    thumbUrl: "assets/xc2/diamond_portraits/" + dbBlade.id + ".png",
                    aliases: dbBlade.aliases ? dbBlade.aliases : [],
                    requiresExpansionPass: dbBlade.requiresExpansionPass ? true : false,
                    canChangeBoundDriver: true
                };
                // Add Blade to collection
                blades.push(b);
                bladeMap[dbBlade.id] = b;
                // Post-process Blade
                b.isHidden = (
                // Blade Chapter not reached yet
                gameSettings.c < b.minChapter) || (
                // Blade requires Expansion pass, but it's disabled
                b.requiresExpansionPass && !gameSettings.e);
                // Special Blades don't need an entry in the registered blades
                // to be bound and displayed
                b.isFound = (b.bladeType === 'CHARA'
                    || b.bladeType === 'SEIHAI'
                    || b.bladeType === 'STORY') && (gameSettings.c >= b.minChapter);
                // Special blades can't rebind
                b.canChangeBoundDriver = (b.bladeType !== 'CHARA'
                    && b.bladeType !== 'SEIHAI'
                    && b.bladeType !== 'STORY');
                // Reset bound driver by force, if necessary
                if (!b.canChangeBoundDriver && b.exclusiveDriver) {
                    b.boundDriver = driverMap[b.exclusiveDriver];
                }
                // Poppi special!
                var overrideElement = gameSettingsBlade ? gameSettingsBlade.e : undefined;
                var overrideRole = gameSettingsBlade ? gameSettingsBlade.r : undefined;
                // Poppi defaults!
                if (dbBlade.element === 'HANA' && !overrideRole) {
                    overrideRole = 'TNK';
                }
                if (b.role === 'HANA' && !overrideElement) {
                    switch (b.id) {
                        case 'HANA_JS':
                            overrideElement = 'EARTH';
                            break;
                        case 'HANA_JK':
                            overrideElement = 'FIRE';
                            break;
                        case 'HANA_JD':
                            overrideElement = 'ICE';
                            break;
                    }
                }
                if (overrideElement) {
                    b.element = overrideElement;
                }
                if (overrideRole) {
                    b.role = overrideRole;
                }
                // Map registered blades
                if (gameSettingsBlade) {
                    b.isFound = true;
                }
                // Map Driver Combos for every Driver
                // Exclude N/A and Unknown
                Object.keys(b.weaponClass.driverCombos).forEach(function (driverId) {
                    var combos = b.weaponClass.driverCombos[driverId]
                        .filter(function (c) { return _model__WEBPACK_IMPORTED_MODULE_5__["driverCombos"].indexOf(c) >= 0; });
                    if (combos.length > 0) {
                        b.driverCombos.push({
                            driverId: driverId,
                            combos: combos,
                        });
                    }
                });
                if (dbBlade.missingImg) {
                    b.thumbUrl = "assets/xc2/diamond_portraits/WHOS-THAT-BLADE.png";
                }
                // Replace image for not-found blades
                if (!b.isFound) {
                    b.thumbUrl = "assets/xc2/diamond_portraits/NOTHING-TO-SEE-HERE.png";
                }
                // Add to relevant driver
                // Unbound blades like Poppibuster, Shulk and Fiora
                // can engage to everybody except Tora, but aren't technically bound.
                if (b.boundDriver && !b.db.unbound) {
                    b.boundDriver.boundBlades.push(b);
                }
            });
            return { blades: blades, drivers: drivers };
        })).subscribe(function (_a) {
            var blades = _a.blades, drivers = _a.drivers;
            _this._blades$.next(blades);
            _this._drivers$.next(drivers);
        });
    };
    BladeManagerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_db_repository_service__WEBPACK_IMPORTED_MODULE_3__["DbRepositoryService"],
            _game_settings_service__WEBPACK_IMPORTED_MODULE_4__["GameSettingsService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], BladeManagerService);
    return BladeManagerService;
}());



/***/ }),

/***/ "./src/app/blade-thumbnail/blade-thumbnail.component.html":
/*!****************************************************************!*\
  !*** ./src/app/blade-thumbnail/blade-thumbnail.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"blade-thumbnail\" [tooltip]=\"blade ? tooltipContentTemplate : undefined\" placement=\"auto\" container=\"body\" containerClass=\"blade-tooltip\" [ngClass]=\"{'no-role': !showRole, 'no-element': !showElement, 'no-driver': !showDriver}\">\r\n  <ng-container *ngIf=\"blade\">\r\n    <div [hidden]=\"!blade.isFound || !showRole\" class=\"role\" [attr.title]=\"('roles.'+blade.role|translate) + ' (' + ('weapons.'+blade.weaponClass.id|translate)  + ')'\"\r\n      [ngClass]=\"blade.role\">\r\n      <xc2-role-icon [role]=\"blade.role\"></xc2-role-icon>\r\n    </div>\r\n    <div [hidden]=\"!blade.isFound || !showElement\" class=\"bgimg element\" [attr.title]=\"'elements.'+blade.element|translate\" [ngStyle]=\"{'backgroundImage': 'url(assets/xc2/elements/'+blade.element+'.png)'}\"></div>\r\n    <div class=\"bgimg portrait\" [attr.title]=\"'#'+ blade.db.albumNumber + ': ' +('blades.'+blade.id|translate)\" [ngStyle]=\"{'backgroundImage': 'url('+blade.thumbUrl+')'}\"></div>\r\n    <div class=\"role-bg\"></div>\r\n    <div *ngIf=\"blade.boundDriver && !blade.db.unbound && showDriver\" class=\"bgimg driver-portrait\" [attr.title]=\"'drivers.'+blade.boundDriver.id|translate\"\r\n      [ngStyle]=\"{'backgroundImage': 'url(assets/xc2/driver_icons/'+blade.boundDriver.id+'.png)'}\"></div>\r\n  </ng-container>\r\n  <ng-container *ngIf=\"!blade\">\r\n    <img class=\"portrait\" src=\"assets/xc2/diamond_portraits/NOTHING-TO-SEE-HERE.png\">\r\n  </ng-container>\r\n</div>\r\n<ng-template #tooltipContentTemplate>\r\n  <app-blade-tooltip-content [blade]=\"blade\"></app-blade-tooltip-content>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/blade-thumbnail/blade-thumbnail.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/blade-thumbnail/blade-thumbnail.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host, .blade-thumbnail {\n  display: inline-block;\n  height: 56px; }\n\n.blade-thumbnail {\n  width: 84px; }\n\n.blade-thumbnail.no-role.no-element, .blade-thumbnail .no-driver {\n    width: 70px; }\n\n.blade-thumbnail.no-role.no-element.no-driver {\n    width: 56px; }\n\n.blade-thumbnail {\n  position: relative;\n  z-index: 10; }\n\n.blade-thumbnail .portrait {\n    position: absolute;\n    left: 14px;\n    height: 56px;\n    width: 56px;\n    z-index: 11; }\n\n.blade-thumbnail.no-role.no-element .portrait {\n    left: 0; }\n\n.blade-thumbnail .element {\n    position: absolute;\n    top: 28px;\n    left: 0;\n    height: 28px;\n    width: 28px;\n    z-index: 12; }\n\n.blade-thumbnail .driver-portrait {\n    position: absolute;\n    top: 28px;\n    left: 56px;\n    height: 28px;\n    width: 28px;\n    z-index: 13; }\n\n.blade-thumbnail .role {\n    cursor: default;\n    position: absolute;\n    z-index: 15;\n    left: 0;\n    top: 5px;\n    height: 28px;\n    width: 28px;\n    text-align: center;\n    text-shadow: 0px 0px 3px black;\n    font-weight: bold; }\n\n.blade-thumbnail .role.ATK {\n      color: red; }\n\n.blade-thumbnail .role.TNK {\n      color: blue; }\n\n.blade-thumbnail .role.HLR {\n      color: lime; }\n\n.bgimg {\n  display: inline-block;\n  background-size: contain; }\n\n:host ::ng-deep .tooltip-inner {\n  max-width: 500px; }\n"

/***/ }),

/***/ "./src/app/blade-thumbnail/blade-thumbnail.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/blade-thumbnail/blade-thumbnail.component.ts ***!
  \**************************************************************/
/*! exports provided: BladeThumbnailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BladeThumbnailComponent", function() { return BladeThumbnailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BladeThumbnailComponent = /** @class */ (function () {
    function BladeThumbnailComponent() {
    }
    BladeThumbnailComponent.prototype.ngOnInit = function () {
    };
    BladeThumbnailComponent.prototype.onDragStart = function () {
        return false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], BladeThumbnailComponent.prototype, "blade", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], BladeThumbnailComponent.prototype, "showDriver", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], BladeThumbnailComponent.prototype, "showElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], BladeThumbnailComponent.prototype, "showRole", void 0);
    BladeThumbnailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-blade-thumbnail',
            template: __webpack_require__(/*! ./blade-thumbnail.component.html */ "./src/app/blade-thumbnail/blade-thumbnail.component.html"),
            styles: [__webpack_require__(/*! ./blade-thumbnail.component.scss */ "./src/app/blade-thumbnail/blade-thumbnail.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BladeThumbnailComponent);
    return BladeThumbnailComponent;
}());



/***/ }),

/***/ "./src/app/blade-tooltip-content/blade-tooltip-content.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/blade-tooltip-content/blade-tooltip-content.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"blade-tooltip-content\" *ngIf=\"blade\">\r\n  <div class=\"d-flex flex-nowrap flex-column\">\r\n    <div class=\"d-flex flex-nowrap flex-row\">\r\n      <div class=\"bgimg portrait\" [ngStyle]=\"{'backgroundImage': 'url('+blade.thumbUrl+')'}\"></div>\r\n      <div class=\"title-container d-flex flex-nowrap flex-column align-items-stretch\">\r\n        <div class=\"title\">{{'blades.'+blade.id|translate}}</div>\r\n        <div class=\"subtitle d-flex flex-nowrap flex-row align-items-center\" *ngIf=\"blade.isFound && !blade.isHidden\">\r\n          <xc2-element-icon [element]=\"blade.element\"></xc2-element-icon>\r\n          <span>{{'elements.'+blade.element|translate}}</span>\r\n          <xc2-role-icon [role]=\"blade.role\"></xc2-role-icon>\r\n          <span>{{'roles.'+blade.role|translate}}</span>\r\n        </div>\r\n        <div class=\"subtitle\">{{'blade-types.'+blade.bladeType|translate}}</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"properties d-flex flex-nowrap flex-column\">\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.isFound && !blade.isHidden\">\r\n      <div class=\"property-name\">{{'blade-props.weapon'|translate}}</div>\r\n      <div class=\"property-value\">\r\n        {{'weapons.'+blade.weaponClass.id|translate}}\r\n        <xc2-role-icon [role]=\"blade.role\"></xc2-role-icon>\r\n      </div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.driverCombos.length > 0\">\r\n      <div class=\"property-name wrap-text\">\r\n        {{'blade-props.driver-combos'|translate}}\r\n        <span *ngFor=\"let dc of blade.driverCombos\">\r\n          {{'drivers.'+dc.driverId|translate}}\r\n          <xc2-driver-combo-icon *ngFor=\"let c of dc.combos\" [driverCombo]=\"c\"></xc2-driver-combo-icon>\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.isFound && !blade.isHidden\">\r\n      <div class=\"property-name\">{{'blade-props.stat-modifier'|translate}}</div>\r\n      <div class=\"property-value\" *ngIf=\"blade.db.modifier\">\r\n        {{'modifiers.'+blade.db.modifier.id|translate}} +{{blade.db.modifier.value}}%\r\n      </div>\r\n      <div class=\"property-value\" *ngIf=\"!blade.db.modifier && blade.db.element === 'HANA'\">\r\n        {{'blade-props.stat-modifier-poppi'|translate}}\r\n      </div>\r\n      <div class=\"property-value\" *ngIf=\"!blade.db.modifier && blade.db.element !== 'HANA'\">\r\n        {{'blade-props.stat-modifier-unknown'|translate}}\r\n      </div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.exclusiveDriver && blade.isFound && !blade.isHidden\">\r\n      <div class=\"property-name\">{{'blade-props.exclusive-driver'|translate}}</div>\r\n      <div class=\"property-value\">{{'drivers.'+blade.exclusiveDriver|translate}}</div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.db.requiresExpansionPass\">\r\n      <div class=\"property-name\">\r\n        {{'blade-props.requires-expansion-pass'|translate}}\r\n      </div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.db.unbound && blade.isFound && !blade.isHidden\">\r\n      <div class=\"property-name \">\r\n        {{'blade-props.unbound'|translate}}\r\n      </div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.minChapter && ( blade.bladeType !== 'GACHA' || blade.minChapter > 10 )\">\r\n      <div class=\"property-name\" *ngIf=\"blade.minChapter < 11\">\r\n        {{('blade-props.availability-chapter'|translate:{c:blade.minChapter})}}\r\n      </div>\r\n      <div class=\"property-name\" *ngIf=\"blade.minChapter === 11\">\r\n        {{'blade-props.availability-chapter-11'|translate}}\r\n      </div>\r\n      <div class=\"property-name\" *ngIf=\"blade.minChapter > 11\">\r\n        {{'blade-props.availability-chapter-12'|translate}}\r\n      </div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.bladeType === 'QUEST'\">\r\n      <div class=\"property-name wrap-text\">\r\n        {{'blade-acquisition.'+blade.id|translate}}\r\n      </div>\r\n    </div>\r\n    <div class=\"d-flex flex-nowrap flex-row\" *ngIf=\"blade.db.element === 'HANA'\">\r\n      <div class=\"property-name wrap-text\">\r\n        {{'blade-props.poppi-notice'|translate}}\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/blade-tooltip-content/blade-tooltip-content.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/blade-tooltip-content/blade-tooltip-content.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  text-align: left;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  :host .bgimg {\n    background-size: contain;\n    background-repeat: no-repeat; }\n  :host .portrait {\n    height: 66px;\n    width: 66px; }\n  :host .title {\n    font-size: 1.1rem;\n    font-weight: bold;\n    font-style: italic; }\n  :host .property-name {\n    margin-right: 5px;\n    color: #eee; }\n  :host .property-value {\n    font-weight: bold; }\n  :host .wrap-text {\n    white-space: normal;\n    text-overflow: ellipsis; }\n"

/***/ }),

/***/ "./src/app/blade-tooltip-content/blade-tooltip-content.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/blade-tooltip-content/blade-tooltip-content.component.ts ***!
  \**************************************************************************/
/*! exports provided: BladeTooltipContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BladeTooltipContentComponent", function() { return BladeTooltipContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BladeTooltipContentComponent = /** @class */ (function () {
    function BladeTooltipContentComponent() {
    }
    BladeTooltipContentComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], BladeTooltipContentComponent.prototype, "blade", void 0);
    BladeTooltipContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-blade-tooltip-content',
            template: __webpack_require__(/*! ./blade-tooltip-content.component.html */ "./src/app/blade-tooltip-content/blade-tooltip-content.component.html"),
            styles: [__webpack_require__(/*! ./blade-tooltip-content.component.scss */ "./src/app/blade-tooltip-content/blade-tooltip-content.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BladeTooltipContentComponent);
    return BladeTooltipContentComponent;
}());



/***/ }),

/***/ "./src/app/db-repository.service.ts":
/*!******************************************!*\
  !*** ./src/app/db-repository.service.ts ***!
  \******************************************/
/*! exports provided: DbRepositoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DbRepositoryService", function() { return DbRepositoryService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ "./src/app/model.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DbRepositoryService = /** @class */ (function () {
    function DbRepositoryService(http) {
        this.http = http;
        this.bladesJsonUrl = 'assets/db/blades.json';
        this.weaponClassesJsonUrl = 'assets/db/weapons.json';
        this._loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](true);
        this._dbStore$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({
            weapons: [],
            blades: [],
            drivers: [],
        });
        this.loading$ = this._loading$.asObservable();
        this.dbStore$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this._dbStore$, this._loading$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (_a) {
            var _ = _a[0], loading = _a[1];
            return !loading;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var store = _a[0], _ = _a[1];
            return store;
        }));
        this.loadFiles();
    }
    DbRepositoryService.prototype.loadFiles = function () {
        var _this = this;
        this._loading$.next(true);
        this.getDbFiles().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])()).subscribe(function (store) {
            _this._dbStore$.next(store);
            _this._loading$.next(false);
        }, function (err) {
            _this._loading$.next(false);
            console.error(err);
            alert(err);
        });
    };
    DbRepositoryService.prototype.getDbFiles = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.getDbWeapons(), this.getDbBlades()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (_a) {
            var weapons = _a[0], blades = _a[1];
            return {
                weapons: weapons,
                blades: blades,
                drivers: _model__WEBPACK_IMPORTED_MODULE_4__["driverCharacters"],
            };
        }));
    };
    DbRepositoryService.prototype.getDbWeapons = function () {
        return this.http.get(this.weaponClassesJsonUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (obj) { return obj.weapons; }));
    };
    DbRepositoryService.prototype.getDbBlades = function () {
        return this.http.get(this.bladesJsonUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (obj) { return obj.blades; }));
    };
    DbRepositoryService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], DbRepositoryService);
    return DbRepositoryService;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"footer-container\">\r\n  <div class=\"footer-bg\"></div>\r\n  <p class=\"footer-text\">\r\n    {{'app.discharge-disclaimer'|translate}}\r\n    <br> {{'app.game-copyright'|translate}}\r\n    <br> {{'app.assets-copyright'|translate}}\r\n  </p>\r\n</div>"

/***/ }),

/***/ "./src/app/footer/footer.component.scss":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer-container {\n  position: relative;\n  height: 100px; }\n  .footer-container .footer-text {\n    position: absolute;\n    z-index: 11;\n    top: 0;\n    left: 0;\n    width: 100%;\n    text-align: center;\n    font-size: 0.8em;\n    font-style: italic;\n    opacity: 0.6;\n    color: #000;\n    text-shadow: white 0px 0px 10px;\n    margin-bottom: 0;\n    margin-top: 1rem; }\n  .footer-container .footer-bg {\n    background-color: rgba(245, 245, 245, 0.5);\n    -webkit-filter: blur(5px);\n            filter: blur(5px);\n    position: absolute;\n    z-index: 10;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/game-settings.service.ts":
/*!******************************************!*\
  !*** ./src/app/game-settings.service.ts ***!
  \******************************************/
/*! exports provided: GameSettingsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameSettingsService", function() { return GameSettingsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var defaultGameSettings = {
    c: 1,
    b: [],
    e: false,
};
var defaultSiteSettings = {
    lang: 'en',
    disclaimerClosed: false,
    bgChapter: 1,
};
var XC2_GAME_SETTINGS_KEY = 'xc2_game_settings';
var XC2_SITE_SETTINGS_KEY = 'xc2_site_settings';
var GameSettingsService = /** @class */ (function () {
    function GameSettingsService() {
        this._gameSettings$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](defaultGameSettings);
        this._siteSettings$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](defaultSiteSettings);
        this.gameSettings$ = this._gameSettings$.asObservable();
        this.siteSettings$ = this._siteSettings$.asObservable();
        this.loadGameSettings();
        this.loadSiteSettings();
    }
    GameSettingsService.prototype.saveGameSettings = function (newSettings) {
        this._gameSettings$.next(newSettings);
        window.localStorage.setItem(XC2_GAME_SETTINGS_KEY, JSON.stringify(newSettings));
    };
    GameSettingsService.prototype.saveSiteSettings = function (newSettings) {
        this._siteSettings$.next(newSettings);
        window.localStorage.setItem(XC2_SITE_SETTINGS_KEY, JSON.stringify(newSettings));
    };
    GameSettingsService.prototype.loadGameSettings = function () {
        var settingsStr = window.localStorage.getItem(XC2_GAME_SETTINGS_KEY);
        if (settingsStr) {
            var settingsObj = JSON.parse(settingsStr);
            if (settingsObj) {
                this._gameSettings$.next(settingsObj);
            }
        }
    };
    GameSettingsService.prototype.loadSiteSettings = function () {
        var settingsStr = window.localStorage.getItem(XC2_SITE_SETTINGS_KEY);
        if (settingsStr) {
            var settingsObj = JSON.parse(settingsStr);
            if (settingsObj) {
                this._siteSettings$.next(settingsObj);
            }
        }
    };
    GameSettingsService.prototype.clearGameSettings = function () {
        window.localStorage.removeItem(XC2_GAME_SETTINGS_KEY);
        this._gameSettings$.next(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(defaultGameSettings));
    };
    GameSettingsService.prototype.clearSiteSettings = function () {
        window.localStorage.removeItem(XC2_SITE_SETTINGS_KEY);
        this._siteSettings$.next(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(defaultSiteSettings));
    };
    GameSettingsService.prototype.changeGameSettings = function (action) {
        var settings = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(this._gameSettings$.value);
        action(settings);
        this.saveGameSettings(settings);
    };
    GameSettingsService.prototype.changeSiteSettings = function (action) {
        var settings = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(this._siteSettings$.value);
        action(settings);
        this.saveSiteSettings(settings);
    };
    GameSettingsService.prototype.setGameChapter = function (newChapter) {
        this.changeGameSettings(function (s) {
            s.c = newChapter;
        });
    };
    GameSettingsService.prototype.setSiteChapter = function (newChapter) {
        this.changeSiteSettings(function (s) {
            s.bgChapter = newChapter;
        });
    };
    GameSettingsService.prototype.addBlade = function (bladeId, driverId, overrideElement, overrideRole) {
        this.changeGameSettings(function (s) {
            var blade = s.b.find(function (x) { return x.b === bladeId; });
            if (!blade) {
                blade = {
                    b: bladeId,
                    d: driverId
                };
                s.b.push(blade);
            }
            blade.d = driverId;
            blade.e = overrideElement;
            blade.r = overrideRole;
        });
    };
    GameSettingsService.prototype.removeBlade = function (bladeId) {
        this.changeGameSettings(function (s) {
            var idx = s.b.findIndex(function (x) { return x.b === bladeId; });
            if (idx >= 0) {
                s.b.splice(idx, 1);
            }
        });
    };
    GameSettingsService.prototype.setExpansionPass = function (hasExpansionPass) {
        this.changeGameSettings(function (s) {
            s.e = hasExpansionPass;
        });
    };
    GameSettingsService.prototype.setLang = function (newLang) {
        this.changeSiteSettings(function (s) {
            if (s.lang !== newLang) {
                var codeA = s.lang.substr(0, 2);
                var codeB = s.lang.substr(0, 2);
                if (codeA !== codeB) {
                    // Reset spoiler warning.
                    // This will trigger the warning to be displayed again.
                    s.disclaimerClosed = false;
                }
            }
            s.lang = newLang;
        });
    };
    GameSettingsService.prototype.setSpoiler = function (spoilerWarningShown) {
        this.changeSiteSettings(function (s) {
            s.disclaimerClosed = spoilerWarningShown;
        });
    };
    GameSettingsService.prototype.exportJson = function () {
        return JSON.stringify(this._gameSettings$.value);
    };
    GameSettingsService.prototype.importJson = function (json) {
        try {
            var d = JSON.parse(json);
            var s = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(defaultGameSettings);
            Object(lodash__WEBPACK_IMPORTED_MODULE_1__["merge"])(s, d);
            this.saveGameSettings(s);
        }
        catch (err) {
            console.error(err);
            alert(err);
        }
    };
    GameSettingsService.prototype.resetSettings = function () {
        this.clearGameSettings();
    };
    GameSettingsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], GameSettingsService);
    return GameSettingsService;
}());



/***/ }),

/***/ "./src/app/math.util.ts":
/*!******************************!*\
  !*** ./src/app/math.util.ts ***!
  \******************************/
/*! exports provided: computeKCombinations, computeCombinations, reorderAndDistinct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeKCombinations", function() { return computeKCombinations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeCombinations", function() { return computeCombinations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reorderAndDistinct", function() { return reorderAndDistinct; });
// Courtesy of https://gist.github.com/axelpale/3118596 .
// MIT license. Adapted for TypeScript.
function computeKCombinations(set, k) {
    if (k > set.length || k <= 0) {
        return [];
    }
    if (k === set.length) {
        return [set];
    }
    var combs = [];
    if (k === 1) {
        for (var i = 0; i < set.length; i++) {
            combs.push([set[i]]);
        }
        return combs;
    }
    for (var i = 0; i < set.length - k + 1; i++) {
        var head = set.slice(i, i + 1);
        var tailcombs = computeKCombinations(set.slice(i + 1), k - 1);
        for (var j = 0; j < tailcombs.length; j++) {
            combs.push(head.concat(tailcombs[j]));
        }
    }
    return combs;
}
// Courtesy of https://gist.github.com/axelpale/3118596 .
// MIT license. Adapted for TypeScript.
function computeCombinations(set) {
    var combs = [];
    for (var k = 1; k <= set.length; k++) {
        var k_combs = computeKCombinations(set, k);
        for (var i = 0; i < k_combs.length; i++) {
            combs.push(k_combs[i]);
        }
    }
    return combs;
}
function reorderAndDistinct(sets) {
    var newSets = [];
    sets.forEach(function (s) {
        s = s.sort();
        if (!newSets.some(function (ns) {
            return ns.length === s.length
                && ns.every(function (v, i) { return s[i] === v; });
        })) {
            newSets.push(s);
        }
    });
    return newSets;
}


/***/ }),

/***/ "./src/app/model.ts":
/*!**************************!*\
  !*** ./src/app/model.ts ***!
  \**************************/
/*! exports provided: roles, elements, genders, bladeTypes, driverCombos, driverCharacters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roles", function() { return roles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elements", function() { return elements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genders", function() { return genders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bladeTypes", function() { return bladeTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "driverCombos", function() { return driverCombos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "driverCharacters", function() { return driverCharacters; });
// 'HANA' is just a temporary role for Poppi
// while game settings are not applied, so it's not here.
var roles = [
    'ATK', 'HLR', 'TNK'
];
// Uses the order from the game's Blade Manager.
// 'HANA' is just a temporary element for Poppi
// while game settings are not applied, so it's not here.
var elements = [
    'FIRE',
    'WATER',
    'WIND',
    'EARTH',
    'ELECTRIC',
    'ICE',
    'LIGHT',
    'DARK',
];
// Uses the order from the game's Blade Manager.
var genders = [
    'M',
    'F',
    'N/A',
];
var bladeTypes = [
    'SEIHAI',
    'CHARA',
    'GACHA',
    'STORY',
    'QUEST',
];
var driverCombos = [
    'BREAK',
    'TOPPLE',
    'LAUNCH',
    'SMASH',
];
// Playable drivers are probably not going to change any time soon. They're hardcoded here.
var driverCharacters = [
    {
        id: 'REX',
        chapter: 1,
        sortIdx: 0,
    },
    {
        id: 'NIA',
        chapter: 2,
        sortIdx: 1,
    },
    {
        id: 'TORA',
        chapter: 2,
        sortIdx: 2,
    },
    {
        id: 'MELEPH',
        chapter: 5,
        sortIdx: 3,
    },
    {
        id: 'ZEKE',
        chapter: 6,
        sortIdx: 4,
    },
];


/***/ }),

/***/ "./src/app/my-game-page/my-game-page.component.html":
/*!**********************************************************!*\
  !*** ./src/app/my-game-page/my-game-page.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"my-game-page container page-container\">\r\n  <div class=\"chapter-selection\">\r\n    <h3>{{'my-game.story-chapter'|translate}}</h3>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4\">\r\n        {{'my-game.story-chapter-desc'|translate}}\r\n      </div>\r\n      <div class=\"col-md-8\">\r\n        <div class=\"btn-toolbar\" role=\"group\" aria-label=\"Chapter selection\" btnRadioGroup [ngModel]=\"currentChapter\">\r\n          <div class=\"btn-group mr-2\" role=\"group\">\r\n            <button type=\"button\" role=\"button\" class=\"btn btn-warning\" [attr.title]=\"('chapters.desc'|translate:{c:chapter}) + ('chapters.'+chapter|translate)\"\r\n              *ngFor=\"let chapter of earlyChapters\" [btnRadio]=\"chapter\" (click)=\"selectChapter($event, chapter)\">{{chapter}}</button>\r\n          </div>\r\n          <div class=\"btn-group mr-2\" role=\"group\">\r\n            <button type=\"button\" role=\"button\" class=\"btn btn-info\" [attr.title]=\"('chapters.desc'|translate:{c:chapter}) + ('chapters.'+chapter|translate)\"\r\n              *ngFor=\"let chapter of lateChapters\" [btnRadio]=\"chapter\" (click)=\"selectChapter($event, chapter)\">{{chapter}}</button>\r\n          </div>\r\n          <div class=\"btn-group\" role=\"group\">\r\n            <button type=\"button\" role=\"button\" class=\"btn btn-success\" [attr.title]=\"'chapters.11'|translate\" [btnRadio]=\"11\" (click)=\"selectChapter($event, 11)\">{{'my-game.game-cleared-item'|translate}}</button>\r\n            <button type=\"button\" role=\"button\" class=\"btn btn-success\" [attr.title]=\"'chapters.12'|translate\" [btnRadio]=\"12\" (click)=\"selectChapter($event, 12)\">{{'my-game.new-game-plus-item'|translate}}</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4\">\r\n        {{'my-game.expansion-pass-desc'|translate}}\r\n      </div>\r\n      <div class=\"col-md-8\">\r\n        <button type=\"button\" class=\"btn\" [ngModel]=\"expansionPass\" btnCheckbox [ngClass]=\"{'btn-default': !expansionPass, 'btn-success': expansionPass}\"\r\n          (click)=\"toggleExpansionPass()\" [btnCheckboxTrue]=\"true\" [btnCheckboxFalse]=\"false\">\r\n          <span [hidden]=\"!expansionPass\" class=\"fa fas fa-check\"></span>\r\n          {{'my-game.enable-expansion-pass'|translate}}\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"blade-driver-selection\">\r\n    <h3>{{'my-game.bonded-blades'|translate}}</h3>\r\n    <p>{{'my-game.bonded-blades-desc'|translate}}</p>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n        <div class=\"input-group mb-3\">\r\n          <input type=\"text\" class=\"form-control\" [formControl]=\"searchFilterControl\" [attr.placeholder]=\"'app.filter-placeholder'|translate\"\r\n            [attr.aria-label]=\"'app.filter-placeholder'|translate\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col\">\r\n        <div class=\"filter-toolbar\">\r\n          {{'app.grouping.label'|translate}}\r\n          <span *ngFor=\"let g of bladeGroupingTypes; let l=last\">\r\n            <span class=\"filter-link\" (click)=\"groupBy(g)\" [ngClass]=\"{active:g===currentGrouping}\">{{'app.grouping.'+g|translate}}</span>\r\n            <span *ngIf=\"!l\">/</span>\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"col\">\r\n        <div class=\"filter-toolbar\">\r\n          {{'app.ordering.label'|translate}}\r\n          <span *ngFor=\"let o of bladeOrderingTypes; let l=last\">\r\n            <span class=\"filter-link\" (click)=\"orderBy(o)\" [ngClass]=\"{active:o===currentOrder}\">{{'app.ordering.'+o|translate}}</span>\r\n            <span *ngIf=\"!l\">/</span>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div *ngFor=\"let bg of bladeGroups; index as idx\">\r\n      <h4 class=\"collapse-title\" (click)=\"collapsedGroups[idx] = !collapsedGroups[idx]\" [hidden]=\"bg.blades.length < 1\">\r\n        <span class=\"fas\" [ngClass]=\"{'fa-caret-right': collapsedGroups[idx],'fa-caret-down': !collapsedGroups[idx]}\"></span>\r\n        {{bg.labelKey|translate}} ({{bg.blades.length}})\r\n      </h4>\r\n      <div class=\"blade-driver-selection-rows\" [collapse]=\"collapsedGroups[idx]\" [hidden]=\"bg.blades.length < 1\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-4 col-md-4 col-sm-6 offset-lg-8 offset-md-8 offset-sm-6\">\r\n            <strong>{{'my-game.select-blade-driver'|translate}}</strong>\r\n          </div>\r\n        </div>\r\n        <app-blade-driver-selection-row *ngFor=\"let b of bg.blades; let idx=index\" [blade]=\"b\" [ngClass]=\"{even: (idx % 2) == 0}\"></app-blade-driver-selection-row>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <h3>{{'my-game.import-export'|translate}}</h3>\r\n  <p>\r\n    <button class=\"btn btn-primary mr-2\" (click)=\"importData()\">{{'my-game.import-data'|translate}}</button>\r\n    <button class=\"btn btn-primary mr-2\" (click)=\"exportData()\">{{'my-game.export-data'|translate}}</button>\r\n    <button class=\"btn btn-default\" (click)=\"resetData()\">{{'my-game.reset-data'|translate}}</button>\r\n  </p>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/my-game-page/my-game-page.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/my-game-page/my-game-page.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".collapse-title {\n  cursor: pointer; }\n\n.filter-toolbar .filter-link {\n  cursor: pointer; }\n\n.filter-toolbar .filter-link:hover, .filter-toolbar .filter-link.active {\n    font-weight: bold; }\n\n.blade-driver-selection-rows .even ::ng-deep > .row {\n  background-color: rgba(255, 255, 255, 0.5); }\n"

/***/ }),

/***/ "./src/app/my-game-page/my-game-page.component.ts":
/*!********************************************************!*\
  !*** ./src/app/my-game-page/my-game-page.component.ts ***!
  \********************************************************/
/*! exports provided: MyGamePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyGamePageComponent", function() { return MyGamePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _blade_manager_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../blade-manager.service */ "./src/app/blade-manager.service.ts");
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../game-settings.service */ "./src/app/game-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyGamePageComponent = /** @class */ (function () {
    function MyGamePageComponent(gameSettingsService, bladeManagerService, tlService, changeDetectorRef) {
        this.gameSettingsService = gameSettingsService;
        this.bladeManagerService = bladeManagerService;
        this.tlService = tlService;
        this.changeDetectorRef = changeDetectorRef;
        this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.earlyChapters = Array(7).fill(0).map(function (x, i) { return i + 1; });
        this.lateChapters = Array(3).fill(0).map(function (x, i) { return i + 8; });
        this.currentChapter = 1;
        this.expansionPass = false;
        this.collapsedGroups = [];
        this.bladeGroups = [];
        this.searchFilterControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.currentGrouping = 'NONE';
        this.currentOrder = 'ALBUM';
        this.bladeGroupingTypes = _blade_manager_service__WEBPACK_IMPORTED_MODULE_5__["bladeGroupingTypes"];
        this.bladeOrderingTypes = _blade_manager_service__WEBPACK_IMPORTED_MODULE_5__["bladeOrderingTypes"];
    }
    MyGamePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchFilterControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])()).subscribe(function (f) {
            _this.bladeManagerService.setSearchFilter(f);
        });
        this.bladeManagerService.searchFilter$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (f) {
            _this.searchFilterControl.setValue(f);
        });
        this.bladeManagerService.grouping$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (g) {
            _this.currentGrouping = g;
        });
        this.bladeManagerService.sortOrder$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (o) {
            _this.currentOrder = o;
        });
        this.gameSettingsService.gameSettings$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (s) {
            _this.currentChapter = s.c;
            _this.expansionPass = s.e;
        });
        this.bladeManagerService.groupedBlades$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (bladeGroups) {
            _this.bladeGroups = bladeGroups;
        });
        this.bladeManagerService.grouping$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])()).subscribe(function () {
            _this.collapsedGroups = [];
        });
    };
    MyGamePageComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    MyGamePageComponent.prototype.groupBy = function (g) {
        this.bladeManagerService.setGrouping(g);
    };
    MyGamePageComponent.prototype.orderBy = function (o) {
        this.bladeManagerService.setOrdering(o);
    };
    MyGamePageComponent.prototype.selectChapter = function ($event, newChapter) {
        // Always set site chapter
        this.gameSettingsService.setSiteChapter(newChapter);
        if ($event.ctrlKey) {
            // With Ctrl: Don't change the game chapter, only the background
            // Unfortunately, we need to do a few things to ensure the new chapter is not selected
            // in the html radio input buttons:
            // Store the currently selected chapter
            var previousChapter = this.currentChapter;
            // Set the variable and force-refresh Angular before the end of the method,
            // to select the new chapter in the html inputs
            this.currentChapter = newChapter;
            this.changeDetectorRef.detectChanges();
            // Reset the previous chapter
            this.currentChapter = previousChapter;
            // Angular will be refreshed after this method
            // and re-select the previous chapter in the html inputs
        }
        else {
            // Without Ctrl: Also change the game chapter.
            // No need to tinker with the inputs here: they change as expected.
            this.gameSettingsService.setGameChapter(newChapter);
        }
    };
    MyGamePageComponent.prototype.toggleExpansionPass = function () {
        this.gameSettingsService.setExpansionPass(!this.expansionPass);
    };
    MyGamePageComponent.prototype.importData = function () {
        var msg = this.tlService.instant('my-game.import-data-paste');
        var p = window.prompt(msg);
        if (p) {
            this.gameSettingsService.importJson(p);
        }
    };
    MyGamePageComponent.prototype.exportData = function () {
        var msg = this.tlService.instant('my-game.export-data-copy');
        var p = window.prompt(msg, this.gameSettingsService.exportJson());
    };
    MyGamePageComponent.prototype.resetData = function () {
        var msg = this.tlService.instant('my-game.reset-data-confirm');
        if (window.confirm(msg)) {
            this.gameSettingsService.resetSettings();
        }
    };
    MyGamePageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-my-game-page',
            template: __webpack_require__(/*! ./my-game-page.component.html */ "./src/app/my-game-page/my-game-page.component.html"),
            styles: [__webpack_require__(/*! ./my-game-page.component.scss */ "./src/app/my-game-page/my-game-page.component.scss")]
        }),
        __metadata("design:paramtypes", [_game_settings_service__WEBPACK_IMPORTED_MODULE_6__["GameSettingsService"],
            _blade_manager_service__WEBPACK_IMPORTED_MODULE_5__["BladeManagerService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], MyGamePageComponent);
    return MyGamePageComponent;
}());



/***/ }),

/***/ "./src/app/my-party-page/my-party-page.component.html":
/*!************************************************************!*\
  !*** ./src/app/my-party-page/my-party-page.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"my-party-page container-fluid page-container\">\r\n  <h3>{{'app.my-party'|translate}}</h3>\r\n\r\n  <div class=\"party-selection container-fluid\">\r\n    <div class=\"party-selector row\">\r\n\r\n      <div class=\"party-member col-sm\" *ngFor=\"let partyIdx of partyCnt\" [ngClass]=\"{'in-battle': isInBattle(partyIdx)}\">\r\n        <div class=\"driver-title\" *ngIf=\"this.currentParty && this.currentParty.partyMembers[partyIdx] as partyMember\" (click)=\"onPartyMemberClick(partyMember)\">\r\n          <div class=\"character-img\" [attr.title]=\"'drivers.'+partyMember.driver.id|translate\" [ngStyle]=\"getDriverImgStyle(partyMember)\"></div>\r\n          <div class=\"character-name-container\">\r\n            <h3 class=\"character-name\">{{'drivers.'+partyMember.driver.id|translate}}</h3>\r\n            <p class=\"character-class\">\r\n              {{'classes.'+partyMember.classId|translate}}\r\n              <xc2-role-icon *ngFor=\"let r of partyMember.roles\" [role]=\"r\"></xc2-role-icon>\r\n            </p>\r\n          </div>\r\n        </div>\r\n        <div class=\"party-member-blades\" *ngIf=\"this.currentParty && this.currentParty.partyMembers[partyIdx] as partyMember\">\r\n          <div class=\"blade-diamond\">\r\n            <div class=\"blade-diamond-visible\">\r\n              <div class=\"party-member-blade\" *ngFor=\"let bladeIdx of bladeCnt\">\r\n\r\n                <div class=\"blade active-blade\" *ngIf=\"partyMember.blades[bladeIdx] as blade\" dndDropzone (dndDrop)=\"onBladeDropOnCharacterBladeSlot($event, partyMember, blade)\"\r\n                  (click)=\"onCharacterSlotBladeClick($event, partyMember, blade)\" [dndDraggable]=\"blade.id\" (dndStart)=\"onBladeDragStart($event, blade.id, partyMember.driver.id)\">\r\n\r\n                  <app-blade-thumbnail [blade]=\"blade\" [showElement]=\"false\"></app-blade-thumbnail>\r\n\r\n                  <div class=\"blade-name-container\">\r\n                    <!-- <img class=\"element-img active\" [src]=\"'assets/xc2/elements/'+blade.element+'.png'\" [attr.title]=\"'elements.'+blade.element|translate\"> -->\r\n                    <div class=\"blade-name\">\r\n                      {{'blades.'+blade.id|translate}}</div>\r\n                    <xc2-element-icon [element]=\"blade.element\"></xc2-element-icon>\r\n                    <xc2-role-icon [role]=\"blade.role\"></xc2-role-icon>\r\n                    <xc2-driver-combo-icon *ngFor=\"let dc of getDriverCombos(blade,partyMember.driver.id)\" [driverCombo]=\"dc\"></xc2-driver-combo-icon>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <div class=\"blade free-slot\" *ngIf=\"!partyMember.blades[bladeIdx]\" dndDropzone (dndDrop)=\"onBladeDropOnCharacterEmptySlot($event, partyMember)\">\r\n                  <app-blade-thumbnail [blade]=\"undefined\"></app-blade-thumbnail>\r\n                </div>\r\n              </div>\r\n              <div class=\"party-member-blade hidden-slot\" *ngIf=\"partyMember.hiddenBlade\">\r\n                <div class=\"blade\">\r\n                  <app-blade-thumbnail [blade]=\"partyMember.hiddenBlade\"></app-blade-thumbnail>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"stat-modifiers\" *ngIf=\"this.currentParty && this.currentParty.partyMembers[partyIdx] as partyMember\">\r\n          <div *ngFor=\"let m of partyMember.modifiers\">\r\n            {{'modifiers.'+m.id|translate}} +{{m.value}}%\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"class-modifiers\" *ngIf=\"this.currentParty && this.currentParty.partyMembers[partyIdx] as partyMember\">\r\n          <div *ngFor=\"let m of partyMember.classModifiers\">\r\n            {{'class-attributes.'+m.id|translate}}\r\n            <i class=\"fas fa-arrow-up\" *ngIf=\"m.value > 0\"></i>\r\n            <i class=\"fas fa-arrow-up\" *ngIf=\"m.value > 1\"></i>\r\n            <i class=\"fas fa-arrow-up\" *ngIf=\"m.value > 2\"></i>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"party-stats container\">\r\n      <div class=\"row\" *ngIf=\"this.currentParty && this.currentParty.errors.length\">\r\n        <div class=\"col-md\">\r\n          <h3>{{'my-party.party-issues'|translate}}</h3>\r\n          <ul>\r\n            <li *ngFor=\"let e of this.currentParty.errors\">\r\n              {{e.key|translate:translateParams(e.params)}}\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-md\" *ngIf=\"this.currentParty\">\r\n          <span class=\"stat-title\">{{'my-party.elements'|translate}} {{this.currentParty.elements.length}} / {{elements.length}}</span>\r\n          <img class=\"element-img\" *ngFor=\"let e of elements\" [src]=\"'assets/xc2/elements/'+e+'.png'\" [attr.title]=\"'elements.'+e|translate\"\r\n            [ngClass]=\"{'active':this.currentParty.elements.indexOf(e) >= 0}\">\r\n        </div>\r\n        <div class=\"col-md\" *ngIf=\"this.currentParty\">\r\n          <span class=\"stat-title\">{{'my-party.driver-combos'|translate}} {{this.currentParty.driverCombos.length}} / {{driverCombos.length}}</span>\r\n          <span class=\"driver-combo\" *ngFor=\"let dc of driverCombos\" [ngClass]=\"{'active':this.currentParty.driverCombos.indexOf(dc) >= 0}\">\r\n            <xc2-driver-combo-icon [driverCombo]=\"dc\"></xc2-driver-combo-icon>\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"blade-selection container\">\r\n      <h3>{{'my-party.blades'|translate}}</h3>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"input-group mb-3\">\r\n            <input type=\"text\" class=\"form-control\" [formControl]=\"searchFilterControl\" [attr.placeholder]=\"'app.filter-placeholder'|translate\"\r\n              [attr.aria-label]=\"'app.filter-placeholder'|translate\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col\">\r\n          <div class=\"filter-toolbar\">\r\n            {{'my-party.filter-driver'|translate}}\r\n            <span class=\"filter-link\" (click)=\"filterDriver()\" [ngClass]=\"{active:!driverFilter}\">{{'my-party.filter-driver-all'|translate}}</span>\r\n            <span *ngFor=\"let d of drivers; let l=last\">\r\n              <span>/</span>\r\n              <span class=\"filter-link\" (click)=\"filterDriver(d)\" [ngClass]=\"{active: driverFilter && driverFilter.id === d.id}\">{{'drivers.'+d.id|translate}}</span>\r\n            </span>\r\n          </div>\r\n        </div>\r\n        <div class=\"col\">\r\n          <div class=\"filter-toolbar\">\r\n            {{'app.ordering.label'|translate}}\r\n            <span *ngFor=\"let o of bladeOrderingTypes; let l=last\">\r\n              <span class=\"filter-link\" (click)=\"orderBy(o)\" [ngClass]=\"{active:o===currentOrder}\">{{'app.ordering.'+o|translate}}</span>\r\n              <span *ngIf=\"!l\">/</span>\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-3 blade-item\" *ngFor=\"let blade of usableBlades\" [dndDraggable]=\"blade.id\" (dndStart)=\"onBladeDragStart($event, blade.id)\">\r\n          <app-blade-thumbnail [blade]=\"blade\" [showElement]=\"true\" [showDriver]=\"true\" [showRole]=\"true\"></app-blade-thumbnail>\r\n          <span class=\"blade-name\">{{'blades.'+blade.id|translate}}</span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>"

/***/ }),

/***/ "./src/app/my-party-page/my-party-page.component.scss":
/*!************************************************************!*\
  !*** ./src/app/my-party-page/my-party-page.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".my-party-page .container {\n  background: transparent; }\n\n.my-party-page .party-member .character-img,\n.my-party-page .party-member .character-name,\n.my-party-page .party-member .blade-diamond {\n  opacity: 0.5; }\n\n.my-party-page .party-member.in-battle .character-img,\n.my-party-page .party-member.in-battle .character-name,\n.my-party-page .party-member.in-battle .blade-diamond {\n  opacity: 1; }\n\n.my-party-page .party-member .blade-diamond {\n  position: relative;\n  height: 168px; }\n\n.my-party-page .party-member .blade-diamond .party-member-blade {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 15; }\n\n.my-party-page .party-member .blade-diamond .party-member-blade:nth-child(2) {\n      top: 38px;\n      left: 38px; }\n\n.my-party-page .party-member .blade-diamond .party-member-blade:nth-child(3) {\n      top: 76px;\n      left: 0; }\n\n.my-party-page .party-member .blade-diamond .party-member-blade.hidden-slot {\n      /* Hidden slot */\n      top: 38px;\n      left: -28px;\n      opacity: 0.5;\n      z-index: 14; }\n\n.my-party-page .party-member .blade-diamond .blade {\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    flex-wrap: nowrap;\n    align-items: stretch; }\n\n.my-party-page .party-member .blade-diamond .blade .blade-name-container {\n      margin-left: 5px;\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      align-items: center; }\n\n.my-party-page .party-member .blade-diamond .blade .blade-name-container .blade-name {\n        font-weight: bold;\n        font-style: italic; }\n\n.my-party-page .party-member .blade-diamond .blade.free-slot {\n      opacity: 0.5; }\n\n.my-party-page .blade-selection .blade-item {\n  display: flex;\n  flex-direction: row;\n  align-items: center; }\n\n.my-party-page .blade-selection .blade-item .blade-name {\n    margin-left: 5px; }\n\n.my-party-page .stat-title {\n  font-weight: bold;\n  margin-right: 10px; }\n\n.my-party-page .element-img {\n  opacity: 0.2;\n  height: 32px;\n  width: 32px; }\n\n.my-party-page .element-img.active {\n    opacity: 1; }\n\n.my-party-page .driver-combo {\n  opacity: 0.2; }\n\n.my-party-page .driver-combo.active {\n    opacity: 1; }\n\n.my-party-page .driver-title,\n.my-party-page .active-blade {\n  cursor: pointer; }\n\n.my-party-page .blade-item {\n  cursor: -webkit-grab;\n  cursor: grab; }\n\n.my-party-page .driver-title {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n  align-items: stretch; }\n\n.my-party-page .driver-title .character-img {\n    height: 66px;\n    width: 66px;\n    background-size: contain; }\n\n.my-party-page .driver-title .character-name-container {\n    flex-grow: 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: center; }\n\n.my-party-page .driver-title .character-name {\n    margin: 0 0 0 5px;\n    font-size: 16pt;\n    vertical-align: baseline; }\n\n.my-party-page .driver-title .character-class {\n    margin: 0 0 0 5px; }\n\n.my-party-page .filter-toolbar .filter-link {\n  cursor: pointer; }\n\n.my-party-page .filter-toolbar .filter-link:hover, .my-party-page .filter-toolbar .filter-link.active {\n    font-weight: bold; }\n"

/***/ }),

/***/ "./src/app/my-party-page/my-party-page.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/my-party-page/my-party-page.component.ts ***!
  \**********************************************************/
/*! exports provided: createDescriptionFromEffectiveParty, engageBladeOn, removeBladeFrom, canEngageBladeOn, MyPartyPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDescriptionFromEffectiveParty", function() { return createDescriptionFromEffectiveParty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "engageBladeOn", function() { return engageBladeOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeBladeFrom", function() { return removeBladeFrom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canEngageBladeOn", function() { return canEngageBladeOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyPartyPageComponent", function() { return MyPartyPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _party_manager_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../party-manager.service */ "./src/app/party-manager.service.ts");
/* harmony import */ var _blade_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blade-manager.service */ "./src/app/blade-manager.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../model */ "./src/app/model.ts");
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../game-settings.service */ "./src/app/game-settings.service.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









function createDescriptionFromEffectiveParty(ep) {
    var pd = {
        gameChapter: ep.gameChapter,
        partyMembers: [],
    };
    for (var _i = 0, _a = ep.partyMembers; _i < _a.length; _i++) {
        var epm = _a[_i];
        pd.partyMembers.push({
            inBattle: epm.inBattle,
            driverId: epm.driver.id,
            bladeIds: epm.blades.map(function (m) { return m.id; }),
        });
    }
    return pd;
}
function engageBladeOn(pm, bladeIdToSet, bladeIdToReplace) {
    var idxOfBladeToSet = bladeIdToSet ? pm.bladeIds.indexOf(bladeIdToSet) : -1;
    var idxOfBladeToReplace = pm.bladeIds.indexOf(bladeIdToReplace);
    if (bladeIdToSet === 'SEIHAI_HOMURA' && idxOfBladeToSet < 0) {
        idxOfBladeToSet = pm.bladeIds.indexOf('SEIHAI_HIKARI');
    }
    else if (bladeIdToSet === 'SEIHAI_HIKARI' && idxOfBladeToSet < 0) {
        idxOfBladeToSet = pm.bladeIds.indexOf('SEIHAI_HOMURA');
    }
    if (bladeIdToSet && !bladeIdToReplace) {
        if (idxOfBladeToSet < 0) {
            // Add Blade
            pm.bladeIds.push(bladeIdToSet);
        }
        else {
            // Reset blade at position
            pm.bladeIds[idxOfBladeToSet] = bladeIdToSet;
        }
    }
    else if (bladeIdToSet && bladeIdToReplace) {
        if (idxOfBladeToSet >= 0 && idxOfBladeToReplace >= 0) {
            if (idxOfBladeToSet === idxOfBladeToReplace) {
                // Reset blade at position
                pm.bladeIds[idxOfBladeToSet] = bladeIdToSet;
            }
            else {
                // Blade to set already exists, and blade to replace exists
                // Exchange both blades
                var bladeIdReplaced = pm.bladeIds[idxOfBladeToReplace];
                pm.bladeIds[idxOfBladeToSet] = bladeIdReplaced;
                pm.bladeIds[idxOfBladeToReplace] = bladeIdToSet;
            }
        }
        else if (idxOfBladeToSet < 0 && idxOfBladeToReplace >= 0) {
            // Blade to set doesn't exist, and blade to replace exists
            // Replace blade
            pm.bladeIds[idxOfBladeToReplace] = bladeIdToSet;
        }
    }
}
function removeBladeFrom(pm, bladeIdToRemove) {
    var idxOfBladeToRemove = pm.bladeIds.indexOf(bladeIdToRemove);
    if (idxOfBladeToRemove >= 0) {
        pm.bladeIds.splice(idxOfBladeToRemove, 1);
    }
}
function canEngageBladeOn(b, d) {
    var enableMasterDriver = true;
    if (d.id === 'TORA') {
        return b.exclusiveDriver === 'TORA'; // Poppi only!
    }
    else if (d.id === 'REX' && enableMasterDriver) {
        return b.exclusiveDriver !== 'TORA'; // All Blades except Poppi are fair game on Rex
    }
    else {
        // Only exclusive Blades, and non-exclusive, bound Blades
        return b.exclusiveDriver === d.id || (b.boundDriver && b.boundDriver.id === d.id);
    }
}
var MyPartyPageComponent = /** @class */ (function () {
    function MyPartyPageComponent(partyManagerService, bladeManagerService, gameSettingsService, translateService) {
        this.partyManagerService = partyManagerService;
        this.bladeManagerService = bladeManagerService;
        this.gameSettingsService = gameSettingsService;
        this.translateService = translateService;
        this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.defaultPartyDesc = undefined;
        this.defaultParty = undefined;
        this.blades = [];
        this.searchFilterControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormControl"]();
        this.partyCnt = Array.from({ length: 5 }, function (_, i) { return i; }); // [0, 1, 2, 3, 4]
        this.bladeCnt = Array.from({ length: 3 }, function (_, i) { return i; }); // [0, 1, 2]
        this.currentPartyDesc = undefined;
        this.currentParty = undefined;
        this.drivers = [];
        this.driverFilter$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](undefined);
        this.driverFilter = undefined;
        this.usableBlades = [];
        this.currentOrder = 'ALBUM';
        this.bladeOrderingTypes = _blade_manager_service__WEBPACK_IMPORTED_MODULE_2__["bladeOrderingTypes"];
        this.elements = _model__WEBPACK_IMPORTED_MODULE_5__["elements"];
        this.driverCombos = _model__WEBPACK_IMPORTED_MODULE_5__["driverCombos"];
    }
    MyPartyPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchFilterControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(500), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])()).subscribe(function (f) {
            _this.bladeManagerService.setSearchFilter(f);
        });
        this.bladeManagerService.searchFilter$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (f) {
            _this.searchFilterControl.setValue(f);
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.partyManagerService.defaultParty$, this.gameSettingsService.gameSettings$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (_a) {
            var p = _a[0], s = _a[1];
            _this.defaultPartyDesc = p;
            _this.defaultParty = _this.partyManagerService.buildEffectiveParty(p);
            if (!_this.currentParty) {
                _this.currentPartyDesc = _this.defaultPartyDesc;
                _this.currentParty = _this.defaultParty;
            }
        });
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(this.bladeManagerService.ungroupedBlades$, this.driverFilter$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (_a) {
            var blades = _a[0], driverFilter = _a[1];
            _this.driverFilter = driverFilter;
            _this.blades = blades;
            if (driverFilter) {
                _this.usableBlades = blades.filter(function (b) { return !b.isHidden && b.isFound && canEngageBladeOn(b, driverFilter); });
            }
            else {
                _this.usableBlades = blades.filter(function (b) { return !b.isHidden && b.isFound; });
            }
        });
        this.bladeManagerService.allDrivers$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe)).subscribe(function (drivers) {
            _this.drivers = drivers;
        });
    };
    MyPartyPageComponent.prototype.applyPartyDesc = function (partyDesc) {
        this.currentPartyDesc = partyDesc;
        this.currentParty = this.partyManagerService.buildEffectiveParty(partyDesc);
    };
    MyPartyPageComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    MyPartyPageComponent.prototype.getDriverImgStyle = function (partyMember) {
        if (partyMember) {
            return {
                'background-image': "url('assets/xc2/driver_icons/" + partyMember.driver.id + ".png')"
            };
        }
    };
    MyPartyPageComponent.prototype.isInBattle = function (partyIdx) {
        return this.currentParty && this.currentParty.partyMembers[partyIdx] && this.currentParty.partyMembers[partyIdx].inBattle;
    };
    MyPartyPageComponent.prototype.onBladeDragStart = function (evt, bladeId, originDriverId) {
    };
    MyPartyPageComponent.prototype.onBladeDropOnCharacterBladeSlot = function (evt, partyMember, blade) {
        var newDesc = createDescriptionFromEffectiveParty(this.currentParty);
        var driver = newDesc.partyMembers.find(function (x) { return x.driverId === partyMember.driver.id; });
        if (canEngageBladeOn(blade, partyMember.driver)) {
            engageBladeOn(driver, evt.data, blade.id);
            this.applyPartyDesc(newDesc);
        }
    };
    MyPartyPageComponent.prototype.onBladeDropOnCharacterEmptySlot = function (evt, partyMember) {
        var newDesc = createDescriptionFromEffectiveParty(this.currentParty);
        var blade = this.blades.find(function (b) { return b.id === evt.data; });
        var driver = newDesc.partyMembers.find(function (x) { return x.driverId === partyMember.driver.id; });
        if (canEngageBladeOn(blade, partyMember.driver)) {
            engageBladeOn(driver, blade.id, undefined);
            this.applyPartyDesc(newDesc);
        }
    };
    MyPartyPageComponent.prototype.onCharacterSlotBladeClick = function (_, partyMember, blade) {
        var newDesc = createDescriptionFromEffectiveParty(this.currentParty);
        var driver = newDesc.partyMembers.find(function (x) { return x.driverId === partyMember.driver.id; });
        removeBladeFrom(driver, blade.id);
        this.applyPartyDesc(newDesc);
    };
    MyPartyPageComponent.prototype.translateParams = function (inParams) {
        var outParams = {};
        if (inParams) {
            if (inParams.bladeId) {
                outParams.b = this.translateService.instant('blades.' + inParams.bladeId);
            }
            if (inParams.driverId) {
                outParams.d = this.translateService.instant('drivers.' + inParams.driverId);
            }
        }
        return outParams;
    };
    MyPartyPageComponent.prototype.onPartyMemberClick = function (partyMember) {
        var newDesc = createDescriptionFromEffectiveParty(this.currentParty);
        var driver = newDesc.partyMembers.find(function (x) { return x.driverId === partyMember.driver.id; });
        driver.inBattle = !driver.inBattle;
        this.applyPartyDesc(newDesc);
    };
    MyPartyPageComponent.prototype.orderBy = function (o) {
        this.bladeManagerService.setOrdering(o);
    };
    MyPartyPageComponent.prototype.filterDriver = function (d) {
        this.driverFilter$.next(d);
    };
    MyPartyPageComponent.prototype.getDriverCombos = function (b, driverId) {
        return b.weaponClass.driverCombos[driverId] || [];
    };
    MyPartyPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-my-party-page',
            template: __webpack_require__(/*! ./my-party-page.component.html */ "./src/app/my-party-page/my-party-page.component.html"),
            styles: [__webpack_require__(/*! ./my-party-page.component.scss */ "./src/app/my-party-page/my-party-page.component.scss")]
        }),
        __metadata("design:paramtypes", [_party_manager_service__WEBPACK_IMPORTED_MODULE_1__["PartyManagerService"],
            _blade_manager_service__WEBPACK_IMPORTED_MODULE_2__["BladeManagerService"],
            _game_settings_service__WEBPACK_IMPORTED_MODULE_6__["GameSettingsService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateService"]])
    ], MyPartyPageComponent);
    return MyPartyPageComponent;
}());



/***/ }),

/***/ "./src/app/my-team-page/my-team-page.component.html":
/*!**********************************************************!*\
  !*** ./src/app/my-team-page/my-team-page.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"my-blades-page container page-container\">\r\n  <p>\r\n    <button class=\"btn btn-primary\" (click)=\"doStuff()\">?!</button>\r\n  </p>\r\n</div>"

/***/ }),

/***/ "./src/app/my-team-page/my-team-page.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/my-team-page/my-team-page.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/my-team-page/my-team-page.component.ts":
/*!********************************************************!*\
  !*** ./src/app/my-team-page/my-team-page.component.ts ***!
  \********************************************************/
/*! exports provided: MyTeamPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyTeamPageComponent", function() { return MyTeamPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _team_computer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../team-computer.service */ "./src/app/team-computer.service.ts");
/* harmony import */ var _blade_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blade-manager.service */ "./src/app/blade-manager.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../game-settings.service */ "./src/app/game-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyTeamPageComponent = /** @class */ (function () {
    function MyTeamPageComponent(teamComputerService, bladeManagerService, gameSettings) {
        this.teamComputerService = teamComputerService;
        this.bladeManagerService = bladeManagerService;
        this.gameSettings = gameSettings;
        this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.bladePool = [];
        this.driverPool = [];
        this.currentChapter = 1;
    }
    MyTeamPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bladeManagerService.allBlades$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe))
            .subscribe(function (blades) {
            _this.bladePool = blades.filter(function (b) { return !b.isHidden; });
        });
        this.bladeManagerService.allDrivers$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe))
            .subscribe(function (drivers) {
            _this.driverPool = drivers.filter(function (b) { return !b.isHidden; });
        });
        this.gameSettings.gameSettings$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this.unsubscribe))
            .subscribe(function (gameSettings) {
            _this.currentChapter = gameSettings.c;
        });
    };
    MyTeamPageComponent.prototype.doStuff = function () {
        this.teamComputerService.computeTeams(this.bladePool, this.driverPool, this.currentChapter, {
            disableCharacterBladeReassignment: false,
            disableRexMasterDriver: false,
        });
    };
    MyTeamPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-my-team-page',
            template: __webpack_require__(/*! ./my-team-page.component.html */ "./src/app/my-team-page/my-team-page.component.html"),
            styles: [__webpack_require__(/*! ./my-team-page.component.scss */ "./src/app/my-team-page/my-team-page.component.scss")]
        }),
        __metadata("design:paramtypes", [_team_computer_service__WEBPACK_IMPORTED_MODULE_1__["TeamComputerService"],
            _blade_manager_service__WEBPACK_IMPORTED_MODULE_2__["BladeManagerService"],
            _game_settings_service__WEBPACK_IMPORTED_MODULE_5__["GameSettingsService"]])
    ], MyTeamPageComponent);
    return MyTeamPageComponent;
}());



/***/ }),

/***/ "./src/app/not-found-page/not-found-page.component.html":
/*!**************************************************************!*\
  !*** ./src/app/not-found-page/not-found-page.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"not-found-page\">\r\n  <h1 i18n=\"Page Not Found title@@pageNotFound\">Page not found</h1>\r\n  <h3 i18n=\"YER DUN?@@as_yerDun\">YER DUN?</h3>\r\n  <p i18n=\"Pipqueak!@@as_pipsqueak\">Pipsqueak!</p>\r\n  <p>\r\n    <a class=\"btn btn-info\" routerLink=\"/my-game\" i18n=\"Back to My Blades link@@link_backToMyBlades\">\r\n      Back to My Game\r\n    </a>\r\n  </p>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/not-found-page/not-found-page.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/not-found-page/not-found-page.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1, h2, h3, p {\n  text-align: center; }\n\nh1 {\n  font-weight: bolder;\n  font-style: italic; }\n"

/***/ }),

/***/ "./src/app/not-found-page/not-found-page.component.ts":
/*!************************************************************!*\
  !*** ./src/app/not-found-page/not-found-page.component.ts ***!
  \************************************************************/
/*! exports provided: NotFoundPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundPageComponent", function() { return NotFoundPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundPageComponent = /** @class */ (function () {
    function NotFoundPageComponent() {
    }
    NotFoundPageComponent.prototype.ngOnInit = function () {
    };
    NotFoundPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-not-found-page',
            template: __webpack_require__(/*! ./not-found-page.component.html */ "./src/app/not-found-page/not-found-page.component.html"),
            styles: [__webpack_require__(/*! ./not-found-page.component.scss */ "./src/app/not-found-page/not-found-page.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundPageComponent);
    return NotFoundPageComponent;
}());



/***/ }),

/***/ "./src/app/party-manager.service.ts":
/*!******************************************!*\
  !*** ./src/app/party-manager.service.ts ***!
  \******************************************/
/*! exports provided: PartyManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PartyManagerService", function() { return PartyManagerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _blade_manager_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blade-manager.service */ "./src/app/blade-manager.service.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ "./src/app/model.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game-settings.service */ "./src/app/game-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







function addBladeToParty(ep, epm, blade, isHidden) {
    if (isHidden) {
        epm.hiddenBlade = blade;
    }
    else {
        epm.blades.push(blade);
    }
    // Add driver combos
    var equippedDriverCombos = blade.weaponClass.driverCombos[epm.driver.id];
    if (equippedDriverCombos !== undefined) {
        for (var _i = 0, equippedDriverCombos_1 = equippedDriverCombos; _i < equippedDriverCombos_1.length; _i++) {
            var dc = equippedDriverCombos_1[_i];
            // Remove N/A
            if (_model__WEBPACK_IMPORTED_MODULE_4__["driverCombos"].indexOf(dc) >= 0) {
                if (epm.driverCombos.indexOf(dc) < 0) {
                    epm.driverCombos.push(dc);
                }
                if (epm.inBattle && ep.driverCombos.indexOf(dc) < 0) {
                    ep.driverCombos.push(dc);
                }
            }
        }
    }
    // Add Element
    if (epm.elements.indexOf(blade.element) < 0) {
        epm.elements.push(blade.element);
    }
    if (epm.inBattle && ep.elements.indexOf(blade.element) < 0) {
        ep.elements.push(blade.element);
    }
    // Add modifier
    if (blade.db.modifier !== undefined) {
        var m = epm.modifiers.find(function (m) { return m.id === blade.db.modifier.id; });
        if (m === undefined) {
            m = {
                id: blade.db.modifier.id,
                value: blade.db.modifier.value,
            };
            epm.modifiers.push(m);
        }
        else {
            m.value += blade.db.modifier.value;
        }
    }
}
function buildClassModifiers(classId) {
    switch (classId) {
        case '': return [];
        case 'ATK': return [{ id: 'DAMAGE', value: 1 }];
        case 'HLR': return [{ id: 'POTION', value: 1 }, { id: 'STEALTH', value: 1 }];
        case 'TNK': return [{ id: 'DEFENSE', value: 1 }, { id: 'ATKAGGRO', value: 1 }, { id: 'ARTSAGGRO', value: 1 }];
        case 'ATK-ATK': return [{ id: 'DAMAGE', value: 2 }];
        case 'ATK-HLR': return [{ id: 'DAMAGE', value: 1 }, { id: 'POTION', value: 1 }, { id: 'STEALTH', value: 1 }];
        case 'ATK-TNK': return [{ id: 'DEFENSE', value: 1 }, { id: 'DAMAGE', value: 1 }, { id: 'ARTSAGGRO', value: 1 }];
        case 'HLR-HLR': return [{ id: 'POTION', value: 2 }, { id: 'STEALTH', value: 2 }];
        case 'HLR-TNK': return [{ id: 'DEFENSE', value: 1 }, { id: 'POTION', value: 1 }];
        case 'TNK-TNK': return [{ id: 'DEFENSE', value: 2 }, { id: 'ATKAGGRO', value: 2 }, { id: 'ARTSAGGRO', value: 2 }];
        case 'ATK-ATK-ATK': return [{ id: 'DAMAGE', value: 3 }];
        case 'ATK-ATK-HLR': return [{ id: 'DAMAGE', value: 2 }, { id: 'POTION', value: 1 }, { id: 'STEALTH', value: 1 }];
        case 'ATK-ATK-TNK': return [{ id: 'DEFENSE', value: 1 }, { id: 'DAMAGE', value: 2 }, { id: 'ARTSAGGRO', value: 1 }];
        case 'ATK-HLR-HLR': return [{ id: 'DAMAGE', value: 1 }, { id: 'POTION', value: 2 }, { id: 'STEALTH', value: 2 }];
        case 'ATK-HLR-TNK': return [{ id: 'DEFENSE', value: 1 }, { id: 'DAMAGE', value: 1 }, { id: 'POTION', value: 1 }];
        case 'ATK-TNK-TNK': return [{ id: 'DEFENSE', value: 2 }, { id: 'DAMAGE', value: 1 }, { id: 'ARTSAGGRO', value: 2 }];
        case 'HLR-HLR-HLR': return [{ id: 'POTION', value: 3 }, { id: 'STEALTH', value: 3 }];
        case 'HLR-HLR-TNK': return [{ id: 'DEFENSE', value: 1 }, { id: 'POTION', value: 2 }, { id: 'STEALTH', value: 2 }];
        case 'HLR-TNK-TNK': return [{ id: 'DEFENSE', value: 2 }, { id: 'POTION', value: 1 }, { id: 'ARTSAGGRO', value: 1 }];
        case 'TNK-TNK-TNK': return [{ id: 'DEFENSE', value: 3 }, { id: 'ATKAGGRO', value: 3 }, { id: 'ARTSAGGRO', value: 3 }];
        default: throw new Error("Unknown class ID: " + classId);
    }
}
var PartyManagerService = /** @class */ (function () {
    function PartyManagerService(bladeManagerService, gameSettings) {
        var _this = this;
        this.bladeManagerService = bladeManagerService;
        this.gameSettings = gameSettings;
        this.drivers = undefined;
        this.blades = undefined;
        this._defaultParty$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this.defaultParty$ = this._defaultParty$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (p) { return p !== undefined; }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])(this.bladeManagerService.allDrivers$, this.bladeManagerService.allBlades$, this.gameSettings.gameSettings$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_a) {
            var d = _a[0], b = _a[1];
            return d.length > 0 && b.length > 0;
        })).subscribe(function (_a) {
            var d = _a[0], b = _a[1], s = _a[2];
            _this.drivers = d;
            _this.blades = b;
            _this.updateDefaults(s.c);
        });
    }
    PartyManagerService.prototype.updateDefaults = function (gameChapter) {
        this._defaultParty$.next(this.buildDefaultParty(gameChapter));
    };
    PartyManagerService.prototype.buildDefaultParty = function (gameChapter) {
        var partyMembers = [];
        var desc = {
            partyMembers: partyMembers,
            gameChapter: gameChapter
        };
        var i = 0;
        for (var _i = 0, _a = this.drivers; _i < _a.length; _i++) {
            var d = _a[_i];
            if (!d.isHidden) {
                var pm = {
                    driverId: d.id,
                    bladeIds: [],
                    inBattle: i < 3,
                };
                ++i;
                partyMembers.push(pm);
                switch (d.id) {
                    case 'REX':
                        pm.bladeIds.push('SEIHAI_HOMURA');
                        break;
                    case 'NIA':
                        pm.bladeIds.push('BYAKKO');
                        break;
                    case 'TORA':
                        var hanaJk = this.blades.find(function (b) { return b.id === 'HANA_JK'; });
                        var hanaJd = this.blades.find(function (b) { return b.id === 'HANA_JD'; });
                        pm.bladeIds.push('HANA_JS');
                        if (hanaJk && !hanaJk.isHidden && hanaJk.isFound) {
                            pm.bladeIds.push(hanaJk.id);
                        }
                        if (hanaJd && !hanaJd.isHidden && hanaJd.isFound) {
                            pm.bladeIds.push(hanaJd.id);
                        }
                        break;
                    case 'MELEPH':
                        pm.bladeIds.push('KAGUTSUCHI');
                        break;
                    case 'ZEKE':
                        pm.bladeIds.push('SAIKA');
                        break;
                }
            }
        }
        return desc;
    };
    PartyManagerService.prototype.buildEffectiveParty = function (partyDesc) {
        var ep = {
            driverCombos: [],
            elements: [],
            errors: [],
            partyMembers: [],
            gameChapter: partyDesc.gameChapter,
        };
        var driversInBattle = 0;
        var hasNia = false;
        var matchedBlades = [];
        if (partyDesc.partyMembers && partyDesc.partyMembers.length) {
            var _loop_1 = function (pm) {
                var driver = this_1.drivers.find(function (d) { return d.id === pm.driverId; });
                // Skip unknown Drivers
                if (driver === undefined) {
                    ep.errors.push({ key: 'errors.unknown-driver-id', params: { driverId: pm.driverId } });
                    return "continue";
                }
                // Warn for Drivers in active party beyond maximum party size
                if (pm.inBattle) {
                    if (driversInBattle >= 3) {
                        ep.errors.push({ key: 'errors.too-many-drivers-in-battle', params: { driverId: pm.driverId } });
                    }
                    ++driversInBattle;
                }
                // Warn for Drivers used before their appointed time
                if (partyDesc.gameChapter < driver.db.chapter) {
                    ep.errors.push({ key: 'errors.driver-time-paradox', params: { driverId: pm.driverId } });
                }
                // Special catgirl management - Driver edition
                if (pm.driverId === 'NIA' && pm.inBattle) {
                    if (hasNia) {
                        ep.errors.push({ key: 'errors.critical-welsh-catgirl-overflow' });
                    }
                    hasNia = true;
                }
                var epm = {
                    driver: driver,
                    blades: [],
                    classId: undefined,
                    driverCombos: [],
                    modifiers: [],
                    elements: [],
                    hiddenBlade: undefined,
                    inBattle: pm.inBattle,
                    roles: [],
                    classModifiers: [],
                };
                // const roles: RoleId[] = [];
                var bladeCount = 0;
                ep.partyMembers.push(epm);
                var _loop_2 = function (bladeId) {
                    var blade = this_1.blades.find(function (b) { return b.id === bladeId; });
                    // Skip unknown Blades
                    if (blade === undefined) {
                        ep.errors.push({ key: 'errors.unknown-blade-id', params: { bladeId: bladeId } });
                        return "continue";
                    }
                    // Skip blades beyond 3
                    if (bladeCount >= 3) {
                        ep.errors.push({ key: 'errors.too-many-blades-engaged-on-character', params: { bladeId: bladeId } });
                        return "continue";
                    }
                    ++bladeCount;
                    // Special catgirl management - Blade edition
                    if (bladeId === 'NIA') {
                        if (hasNia) {
                            ep.errors.push({ key: 'errors.critical-welsh-catgirl-overflow' });
                        }
                        hasNia = true;
                    }
                    // Warn for Blades used before their appointed time
                    if (partyDesc.gameChapter < (blade.db.chapter || 2)) {
                        ep.errors.push({ key: 'errors.blade-time-paradox', params: { bladeId: bladeId } });
                    }
                    if (matchedBlades.indexOf(bladeId) >= 0) {
                        // Blade is engaged multiple times
                        ep.errors.push({ key: 'errors.blade-engaged-multiple-times', params: { bladeId: bladeId } });
                    }
                    else {
                        matchedBlades.push(bladeId);
                    }
                    // Add role for class calculation
                    epm.roles.push(blade.role);
                    addBladeToParty(ep, epm, blade, false);
                    // The Mythra-Pyra problem (Rex-only)
                    if (partyDesc.gameChapter >= 4 && driver.id === 'REX') {
                        var hiddenBlade = void 0;
                        if (blade.id === 'SEIHAI_HOMURA') {
                            hiddenBlade = this_1.blades.find(function (b) { return b.id === 'SEIHAI_HIKARI'; });
                        }
                        else if (blade.id === 'SEIHAI_HIKARI') {
                            hiddenBlade = this_1.blades.find(function (b) { return b.id === 'SEIHAI_HOMURA'; });
                        }
                        if (hiddenBlade !== undefined) {
                            if (matchedBlades.indexOf(hiddenBlade.id) >= 0) {
                                // Blade is engaged multiple times
                                ep.errors.push({ key: 'errors.blade-engaged-multiple-times', params: { bladeId: bladeId } });
                            }
                            else {
                                matchedBlades.push(hiddenBlade.id);
                            }
                            addBladeToParty(ep, epm, hiddenBlade, true);
                        }
                    }
                };
                // Add Blades
                for (var _i = 0, _a = pm.bladeIds; _i < _a.length; _i++) {
                    var bladeId = _a[_i];
                    _loop_2(bladeId);
                }
                // Guess Class, which is the concatenated, ordered list of roles (eg. ATK-ATK-HLR or ATK-HLR-TNK)
                epm.classId = epm.roles.sort().join('-');
                epm.classModifiers = buildClassModifiers(epm.classId);
                // Re-order elements and driver combos by their idx
                epm.elements = epm.elements.sort(function (a, b) { return _model__WEBPACK_IMPORTED_MODULE_4__["elements"].indexOf(a) - _model__WEBPACK_IMPORTED_MODULE_4__["elements"].indexOf(b); });
                epm.driverCombos = epm.driverCombos.sort(function (a, b) { return _model__WEBPACK_IMPORTED_MODULE_4__["driverCombos"].indexOf(a) - _model__WEBPACK_IMPORTED_MODULE_4__["driverCombos"].indexOf(b); });
            };
            var this_1 = this;
            for (var _i = 0, _a = partyDesc.partyMembers; _i < _a.length; _i++) {
                var pm = _a[_i];
                _loop_1(pm);
            }
        }
        else {
            ep.errors.push({ key: 'errors.party-is-empty' });
        }
        // Re-order elements and driver combos by their idx
        ep.elements = ep.elements.sort(function (a, b) { return _model__WEBPACK_IMPORTED_MODULE_4__["elements"].indexOf(a) - _model__WEBPACK_IMPORTED_MODULE_4__["elements"].indexOf(b); });
        ep.driverCombos = ep.driverCombos.sort(function (a, b) { return _model__WEBPACK_IMPORTED_MODULE_4__["driverCombos"].indexOf(a) - _model__WEBPACK_IMPORTED_MODULE_4__["driverCombos"].indexOf(b); });
        ep.errors = Object(lodash__WEBPACK_IMPORTED_MODULE_5__["uniqWith"])(ep.errors, lodash__WEBPACK_IMPORTED_MODULE_5__["isEqual"]);
        return ep;
    };
    PartyManagerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_blade_manager_service__WEBPACK_IMPORTED_MODULE_3__["BladeManagerService"],
            _game_settings_service__WEBPACK_IMPORTED_MODULE_6__["GameSettingsService"]])
    ], PartyManagerService);
    return PartyManagerService;
}());



/***/ }),

/***/ "./src/app/team-computer.service.ts":
/*!******************************************!*\
  !*** ./src/app/team-computer.service.ts ***!
  \******************************************/
/*! exports provided: TeamComputerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamComputerService", function() { return TeamComputerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _math_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.util */ "./src/app/math.util.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


function testParty(partyCombination, niaIdx, niaAlbumNumber, byakkoAlbumNumber, chapter) {
    var allBladeNumbers = [];
    for (var i = 0; i < partyCombination.length; i++) {
        var driverBlades = partyCombination[i];
        for (var j = 0; j < driverBlades.length; j++) {
            var bladeAlbumNumber = driverBlades[j];
            if (allBladeNumbers.indexOf(bladeAlbumNumber) >= 0) {
                // Blade was already engaged!
                return false;
            }
            else if (niaIdx >= 0 && bladeAlbumNumber === niaAlbumNumber) {
                // Trying to put Blade Nia in party when Driver Nia is in use!
                return false;
            }
            else if (chapter < 12
                && bladeAlbumNumber === byakkoAlbumNumber
                && niaIdx >= 0
                && i !== niaIdx) {
                // Trying to put Dromarch on another character than Nia
                // When Driver Nia is in the party!
                // (Does not apply to NG+)
                return false;
            }
        }
    }
    return true;
}
function rateParty(driverIds, engagedBladeSets, bladeMap) {
    // Would you like some Blades with those numbers?
    var b;
    var partyBlades = [];
    var allBlades = [];
    var driverRoles;
    var partyRoles = [];
    var allElements = [];
    var allDriverCombos = [];
    // let score = 0;
    var driverCombos;
    for (var i = 0; i < engagedBladeSets.length; i++) {
        partyBlades[i] = [];
        driverRoles = [];
        for (var j = 0; j < engagedBladeSets[i].length; j++) {
            b = bladeMap[engagedBladeSets[i][j]];
            allBlades.push(b);
            if (allElements.indexOf(b.element) < 0) {
                allElements.push(b.element);
            }
            if (driverRoles.indexOf(b.role) < 0) {
                driverRoles.push(b.role);
            }
            driverCombos = b.weaponClass.driverCombos[driverIds[i]];
            for (var k = 0; k < driverCombos.length; k++) {
                if (allDriverCombos.indexOf(driverCombos[k]) < 0
                    && (driverCombos[k] === 'BREAK'
                        || driverCombos[k] === 'TOPPLE'
                        || driverCombos[k] === 'LAUNCH'
                        || driverCombos[k] === 'SMASH')) {
                    allDriverCombos.push(driverCombos[k]);
                }
            }
        }
        if (driverRoles.length === 1) {
            if (partyRoles.indexOf(driverRoles[0]) < 0) {
                partyRoles.push(driverRoles[0]);
            }
        }
    }
    // All elements? 200 points!
    // if (allElements.length >= 8) {
    //   score += 200;
    // } else {
    //   score += 10 * allElements.length;
    // }
    // All driver combos? 100 points!
    // if (allDriverCombos.length >= 4) {
    //   score += 100;
    // } else {
    //   score += 5 * allElements.length;
    // }
    var hasAllElements = allElements.length >= 8;
    if (hasAllElements) {
        var hasAllDriverCombos = allDriverCombos.length >= 4;
        if (hasAllDriverCombos) {
            var hasAllRoles = partyRoles.length >= 3;
            if (hasAllElements && hasAllDriverCombos && hasAllRoles) {
                console.log('Score!');
                return true;
            }
        }
    }
    return false;
    // console.log(score);
}
var TeamComputerService = /** @class */ (function () {
    function TeamComputerService() {
    }
    TeamComputerService.prototype.computeTeams = function (bladePool, driverPool, currentChapter, options) {
        // Hold on! This is going to get a bit wild.
        // Also, this is brute-forcing.
        // We could be smarter! We're not.
        // Look! A bird lady! I want to ride that bird lady.
        // First off: create driver and blade arrays and maps!
        // Note that we're going to use blades by their album number
        // instead of their ID string like we do in the rest of the app.
        var bladeMap = {};
        var bladeIdMap = {};
        // Memorize special IDs for later.
        var niaAlbumNumber = 0;
        var byakkoAlbumNumber = 0;
        var homuraAlbumNumber = 0;
        var hikariAlbumNumber = 0;
        for (var i = 0; i < bladePool.length; i++) {
            switch (bladePool[i].id) {
                case 'NIA':
                    niaAlbumNumber = bladePool[i].db.albumNumber;
                    break;
                case 'BYAKKO':
                    byakkoAlbumNumber = bladePool[i].db.albumNumber;
                    break;
                case 'SEIHAI_HOMURA':
                    homuraAlbumNumber = bladePool[i].db.albumNumber;
                    break;
                case 'SEIHAI_HIKARI':
                    hikariAlbumNumber = bladePool[i].db.albumNumber;
                    break;
            }
            bladeMap[bladePool[i].db.albumNumber] = bladePool[i];
            bladeIdMap[bladePool[i].id] = bladePool[i];
        }
        // This will contain the blade combinations per driver.
        var bladeNumberCombinations = {};
        // And this will contain the combinations of drivers.
        var driverIdCombinations;
        // Compute all possible driver combinations.
        // You can do this in your head, but we can also ask your computer to do it for us!
        // Spoiler: There are 10.
        // Rex/Nia/Tora
        // Rex/Nia/Morag
        // Rex/Nia/Zeke
        // Rex/Tora/Morag
        // Rex/Tora/Zeke
        // Rex/Morag/Zeke
        // Nia/Tora/Morag
        // Nia/Tora/Zeke
        // Nia/Morag/Zeke
        // Tora/Morag/Zeke
        if (driverPool.length > 3) {
            driverIdCombinations = Object(_math_util__WEBPACK_IMPORTED_MODULE_1__["computeKCombinations"])(driverPool.map(function (x) { return x.id; }), 3);
        }
        else {
            driverIdCombinations = [driverPool.map(function (x) { return x.id; })];
        }
        console.log("Using " + driverIdCombinations.length + " driver combinations!");
        // Now: Compute all possible combination of engaged blades
        // for all the drivers.
        // Constraint: Up to three Blades per driver at the same time.
        // (Except Rex, that CHEATER, having two blades plus anywhere betwee
        // one to three girls, plus possibly a catgirl, at any given time)
        // Order is not important here.
        // Rex's Master Driver mode will be taken care of later.
        driverPool.forEach(function (d) {
            var bladeNumbers = d.boundBlades
                .filter(function (x) { return !x.isHidden && x.id !== 'SEIHAI_HIKARI'; })
                .map(function (x) { return x.db.albumNumber; });
            var combinations;
            if (bladeNumbers.length <= 3) {
                // No more than a full team?
                // ...Well, there is really only one combination. :(
                combinations = [bladeNumbers];
            }
            else {
                combinations = Object(_math_util__WEBPACK_IMPORTED_MODULE_1__["computeKCombinations"])(bladeNumbers, 3);
            }
            bladeNumberCombinations[d.id] = combinations;
            console.log(d.id + ": " + combinations.length + " possible blade combinations!");
        });
        // Now - speaking about Rex' Master Driver mode:
        // Rex is Master Driver from chapter 8 onwards.
        if (currentChapter >= 8 && !options.disableRexMasterDriver) {
            // And he can engage Nia. And all you guys!
            // But he still can't engage Poppi (she really, *really* wants that Nopon).
            var bladeNumbers = bladePool
                .filter(function (x) { return !x.isHidden
                && x.id !== 'SEIHAI_HIKARI'
                && x.id !== 'HANA_JS'
                && x.id !== 'HANA_JK'
                && x.id !== 'HANA_JD'
                && x.id !== 'HANABUSTER'; })
                .map(function (x) { return x.db.albumNumber; });
            var combinations = void 0;
            if (bladeNumbers.length <= 3) {
                // No more than a full team?
                // Okay, this is bullshit (and impossible at this stage in the game).
                // But I'll allow it!
                combinations = [bladeNumbers];
            }
            else {
                combinations = Object(_math_util__WEBPACK_IMPORTED_MODULE_1__["computeKCombinations"])(bladeNumbers, 3);
            }
            bladeNumberCombinations['REX'] = combinations;
            console.log("REX (Master Driver): " + combinations.length + " possible blade combinations!");
        }
        // All right. We have all possible blade engagement combinations
        // for all possible drivers.
        // The lead Character Blade (Pyra/Mythra, Dromarch, Brighid, Pandoria)
        // cannot be disengaged UNLESS you're on New Game +.
        // We can remove all combinations that don't have them.
        if (currentChapter < 12 && !options.disableCharacterBladeReassignment) {
            var _loop_1 = function (driverId) {
                if (bladeNumberCombinations.hasOwnProperty(driverId)) {
                    var bladeId = void 0;
                    // Tora is not affected (he can't be taken in battle without Poppi anyway)
                    switch (driverId) {
                        case 'REX':
                            bladeId = 'SEIHAI_HOMURA';
                            break;
                        case 'NIA':
                            bladeId = 'BYAKKO';
                            break;
                        case 'MELEPH':
                            bladeId = 'KAGUTSUCHI';
                            break;
                        case 'ZEKE':
                            bladeId = 'SAIKA';
                            break;
                    }
                    if (bladeId !== undefined && bladeIdMap[bladeId]) {
                        var bladeNumber_1 = bladeIdMap[bladeId].db.albumNumber;
                        bladeNumberCombinations[driverId] = bladeNumberCombinations[driverId]
                            .filter(function (combination) { return combination.indexOf(bladeNumber_1) >= 0; });
                    }
                }
            };
            for (var driverId in bladeNumberCombinations) {
                _loop_1(driverId);
            }
        }
        // Remap blade numbers to blades
        var bladeCombinations = {};
        // We can now compute entire party combinations!
        // With crazy constraints like:
        // You can't use Nia as a Blade if she's a Driver!
        // You can't use Nia as a Driver if she's a Blade!
        // You can't use Byakko on Rex unless you're on New Game+ OR Nia is in her Blade form!
        // You can't use a Blade on Rex if it's out on another character in the *same party*!
        // I mentioned brute forcing earlier? Here it is.
        // Complexity is O(d^b^n^Look! That bird lady again!)
        // const partyCombinations: {
        //   drivers: Driver[]
        //   engagedBladeSets: number[][]
        // }[] = [];
        // let allParties = 0;
        // let validParties = 0;
        // let ratedParties = 0;
        // let driverCombination: Driver[];
        // let driverEngagedBladeSets: number[][][];
        // let driverIds: DriverCharaId[];
        // let niaIdx: number;
        // let driverEngagedBladeNumbers: number[][];
        // for (let i = 0; i < driverIdCombinations.length; i++) {
        //   driverCombination = driverIdCombinations[i];
        //   driverIds = driverCombination.map(d => d.id);
        //   console.log(`Testing driver combination ${driverIds.join(', ')}: ${i + 1}/${driverIdCombinations.length}`);
        //   niaIdx = driverIds.indexOf('NIA');
        //   driverEngagedBladeSets = driverCombination.map(d => [...bladeCombinations[d.id]]);
        //   driverEngagedBladeNumbers = [];
        //   const totalCombinations = driverEngagedBladeSets[0].length
        //     * driverEngagedBladeSets[1].length
        //     * driverEngagedBladeSets[2].length;
        //   console.log(`Checking ${totalCombinations} engaged blade combinations`);
        //   for (let i0 = 0; i0 < driverEngagedBladeSets[0].length; i0++) {
        //     for (let i1 = 0; i1 < driverEngagedBladeSets[1].length; i1++) {
        //       for (let i2 = 0; i2 < driverEngagedBladeSets[2].length; i2++) {
        //         driverEngagedBladeNumbers[0] = driverEngagedBladeSets[0][i0];
        //         driverEngagedBladeNumbers[1] = driverEngagedBladeSets[1][i1];
        //         driverEngagedBladeNumbers[2] = driverEngagedBladeSets[2][i2];
        //         allParties++;
        //         // Reinsert Mythra into the fray
        //         if (
        //           driverEngagedBladeNumbers[0].indexOf(homuraAlbumNumber) >= 0
        //           && driverEngagedBladeNumbers[0].indexOf(hikariAlbumNumber) < 0
        //         ) {
        //           driverEngagedBladeNumbers[0].push(hikariAlbumNumber);
        //         }
        //         if (
        //           driverEngagedBladeNumbers[1].indexOf(homuraAlbumNumber) >= 0
        //           && driverEngagedBladeNumbers[1].indexOf(hikariAlbumNumber) < 0) {
        //           driverEngagedBladeNumbers[1].push(hikariAlbumNumber);
        //         }
        //         if (
        //           driverEngagedBladeNumbers[2].indexOf(homuraAlbumNumber) >= 0
        //           && driverEngagedBladeNumbers[2].indexOf(hikariAlbumNumber) < 0
        //         ) {
        //           driverEngagedBladeNumbers[2].push(hikariAlbumNumber);
        //         }
        //         if (testParty(driverEngagedBladeNumbers, niaIdx, niaAlbumNumber, byakkoAlbumNumber, this.gameSettings.c)) {
        //           validParties++;
        //           if (rateParty(driverIds, driverEngagedBladeNumbers, bladeMap)) {
        //             ratedParties++;
        //             partyCombinations.push({
        //               drivers: driverCombination,
        //               engagedBladeSets: driverEngagedBladeNumbers
        //             });
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        // driverCombinations.forEach((drivers) => {
        //   const combinationSets = drivers.map(d => [...bladeCombinations[d.id]]);
        //   const driverIds = drivers.map(d => d.id);
        //   combinationSets[0].forEach(driver0blades => {
        //     combinationSets[1].forEach(driver1blades => {
        //       combinationSets[2].forEach(driver2blades => {
        //         const engagedBladeSets = [
        //           driver0blades,
        //           driver1blades,
        //           driver2blades
        //         ];
        //         if(testParty(engagedBladeSets, driverIds)) {
        //           validParties++;
        //           }
        //       });
        //     });
        //   });
        // console.log(`${allParties} parties tested!`);
        // console.log(`${validParties} parties valid!`);
        // console.log(`${ratedParties} parties rated!`);
        // console.log(`${partyCombinations.length} party combinations!`);
    };
    TeamComputerService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], TeamComputerService);
    return TeamComputerService;
}());



/***/ }),

/***/ "./src/app/top-navbar/top-navbar.component.html":
/*!******************************************************!*\
  !*** ./src/app/top-navbar/top-navbar.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light\">\r\n  <a class=\"navbar-brand\" irouterLink=\"/\">{{'app.title'|translate}}</a>\r\n  <button class=\"navbar-toggler\" type=\"button\" (click)=\"isCollapsed = !isCollapsed\" aria-controls=\"navbarSupportedContent\"\r\n    aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n\r\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\" [collapse]=\"isCollapsed\">\r\n    <ul class=\"navbar-nav mr-auto\">\r\n      <li class=\"nav-item\" routerLinkActive=\"active\">\r\n        <a class=\"nav-link\" routerLink=\"/my-game\">\r\n          {{'app.my-game'|translate}}\r\n        </a>\r\n      </li>\r\n      <li class=\"nav-item\" routerLinkActive=\"active\">\r\n        <a class=\"nav-link\" routerLink=\"/my-party\">\r\n          {{'app.my-party'|translate}}\r\n        </a>\r\n      </li>\r\n    </ul>\r\n    <ul class=\"navbar-nav\">\r\n      <li class=\"nav-item dropdown\" dropdown placement=\"bottom right\">\r\n        <a class=\"nav-link dropdown-toggle\" id=\"navbarLangDropdown\" role=\"button\" dropdownToggle\r\n          aria-haspopup=\"true\" aria-expanded=\"false\" aria-controls=\"nav-dropdown-lang\">\r\n          <i class=\"fas fa-globe\"></i>\r\n          {{'languages.'+currentLanguage|translate}}\r\n        </a>\r\n        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navbarLangDropdown\" id=\"nav-dropdown-lang\" *dropdownMenu>\r\n          <a class=\"dropdown-item\" *ngFor=\"let language of languages\" (click)=\"selectLanguage(language)\">\r\n              {{'languages.'+language|translate}}\r\n          </a>\r\n        </div>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n\r\n</nav>"

/***/ }),

/***/ "./src/app/top-navbar/top-navbar.component.scss":
/*!******************************************************!*\
  !*** ./src/app/top-navbar/top-navbar.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dropdown-toggle,\n.dropdown-menu a {\n  cursor: pointer; }\n\n.navbar {\n  background-color: rgba(255, 255, 255, 0.8); }\n"

/***/ }),

/***/ "./src/app/top-navbar/top-navbar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/top-navbar/top-navbar.component.ts ***!
  \****************************************************/
/*! exports provided: TopNavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopNavbarComponent", function() { return TopNavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _game_settings_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game-settings.service */ "./src/app/game-settings.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TopNavbarComponent = /** @class */ (function () {
    function TopNavbarComponent(translateService, gameSettingsService) {
        this.translateService = translateService;
        this.gameSettingsService = gameSettingsService;
        this.isCollapsed = true;
        this.languages = [];
        this.currentLanguage = 'en';
        this.unsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    TopNavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.languages = this.translateService.langs;
        this.translateService.onLangChange
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.unsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (gs) { return gs.lang; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])()).subscribe(function (lang) {
            _this.currentLanguage = lang;
        });
        this.gameSettingsService.siteSettings$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.unsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (siteSettings) { return siteSettings.lang; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])()).subscribe(function (lang) {
            _this.translateService.use(lang);
        });
    };
    TopNavbarComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    };
    TopNavbarComponent.prototype.selectLanguage = function (newLang) {
        this.gameSettingsService.setLang(newLang);
    };
    TopNavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-top-navbar',
            template: __webpack_require__(/*! ./top-navbar.component.html */ "./src/app/top-navbar/top-navbar.component.html"),
            styles: [__webpack_require__(/*! ./top-navbar.component.scss */ "./src/app/top-navbar/top-navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"],
            _game_settings_service__WEBPACK_IMPORTED_MODULE_4__["GameSettingsService"]])
    ], TopNavbarComponent);
    return TopNavbarComponent;
}());



/***/ }),

/***/ "./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span [ngClass]=\"getClass()\" [attr.title]=\"'driver-combos.'+driverCombo|translate\" class=\"xc2-driver-combo-icon\"></span>"

/***/ }),

/***/ "./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".xc2-driver-combo-icon {\n  color: magenta; }\n"

/***/ }),

/***/ "./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.ts ***!
  \**************************************************************************/
/*! exports provided: Xc2DriverComboIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xc2DriverComboIconComponent", function() { return Xc2DriverComboIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Xc2DriverComboIconComponent = /** @class */ (function () {
    function Xc2DriverComboIconComponent() {
    }
    Xc2DriverComboIconComponent.prototype.ngOnInit = function () {
    };
    Xc2DriverComboIconComponent.prototype.getClass = function () {
        return {
            'ra': this.driverCombo === 'BREAK',
            'fas': this.driverCombo === 'TOPPLE'
                || this.driverCombo === 'LAUNCH'
                || this.driverCombo === 'SMASH',
            'driver-combo-break': this.driverCombo === 'BREAK',
            'ra-broken-shield': this.driverCombo === 'BREAK',
            'driver-combo-topple': this.driverCombo === 'TOPPLE',
            'fa-undo-alt': this.driverCombo === 'TOPPLE',
            'fa-rotate-270': this.driverCombo === 'TOPPLE',
            'driver-combo-launch': this.driverCombo === 'LAUNCH',
            'fa-arrow-up': this.driverCombo === 'LAUNCH',
            'driver-combo-smash': this.driverCombo === 'SMASH',
            'fa-arrow-down': this.driverCombo === 'SMASH',
        };
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], Xc2DriverComboIconComponent.prototype, "driverCombo", void 0);
    Xc2DriverComboIconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'xc2-driver-combo-icon',
            template: __webpack_require__(/*! ./xc2-driver-combo-icon.component.html */ "./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.html"),
            styles: [__webpack_require__(/*! ./xc2-driver-combo-icon.component.scss */ "./src/app/xc2-driver-combo-icon/xc2-driver-combo-icon.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], Xc2DriverComboIconComponent);
    return Xc2DriverComboIconComponent;
}());



/***/ }),

/***/ "./src/app/xc2-element-icon/xc2-element-icon.component.html":
/*!******************************************************************!*\
  !*** ./src/app/xc2-element-icon/xc2-element-icon.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"xc2-element-icon\" [attr.title]=\"'elements.'+element|translate\" [ngStyle]=\"{'background-image':'url(\\'assets/xc2/elements/'+element+'.png\\')'}\"></div>"

/***/ }),

/***/ "./src/app/xc2-element-icon/xc2-element-icon.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/xc2-element-icon/xc2-element-icon.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 20px;\n  height: 20px;\n  display: block; }\n\n.xc2-element-icon {\n  height: 100%;\n  width: 100%;\n  background-size: contain;\n  display: block; }\n"

/***/ }),

/***/ "./src/app/xc2-element-icon/xc2-element-icon.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/xc2-element-icon/xc2-element-icon.component.ts ***!
  \****************************************************************/
/*! exports provided: Xc2ElementIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xc2ElementIconComponent", function() { return Xc2ElementIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Xc2ElementIconComponent = /** @class */ (function () {
    function Xc2ElementIconComponent() {
    }
    Xc2ElementIconComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], Xc2ElementIconComponent.prototype, "element", void 0);
    Xc2ElementIconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'xc2-element-icon',
            template: __webpack_require__(/*! ./xc2-element-icon.component.html */ "./src/app/xc2-element-icon/xc2-element-icon.component.html"),
            styles: [__webpack_require__(/*! ./xc2-element-icon.component.scss */ "./src/app/xc2-element-icon/xc2-element-icon.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], Xc2ElementIconComponent);
    return Xc2ElementIconComponent;
}());



/***/ }),

/***/ "./src/app/xc2-role-icon/xc2-role-icon.component.html":
/*!************************************************************!*\
  !*** ./src/app/xc2-role-icon/xc2-role-icon.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span [ngClass]=\"getClass()\" [attr.title]=\"'roles.'+role|translate\" class=\"xc2-role-icon ra\"></span>"

/***/ }),

/***/ "./src/app/xc2-role-icon/xc2-role-icon.component.scss":
/*!************************************************************!*\
  !*** ./src/app/xc2-role-icon/xc2-role-icon.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".role-tnk {\n  color: blue; }\n\n.role-hlr {\n  color: green; }\n\n.role-atk {\n  color: red; }\n"

/***/ }),

/***/ "./src/app/xc2-role-icon/xc2-role-icon.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/xc2-role-icon/xc2-role-icon.component.ts ***!
  \**********************************************************/
/*! exports provided: Xc2RoleIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xc2RoleIconComponent", function() { return Xc2RoleIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Xc2RoleIconComponent = /** @class */ (function () {
    function Xc2RoleIconComponent() {
    }
    Xc2RoleIconComponent.prototype.ngOnInit = function () {
    };
    Xc2RoleIconComponent.prototype.getClass = function () {
        return {
            'role-atk': this.role === 'ATK',
            'ra-sword': this.role === 'ATK',
            'role-hlr': this.role === 'HLR',
            'ra-health': this.role === 'HLR',
            'role-tnk': this.role === 'TNK',
            'ra-shield': this.role === 'TNK',
        };
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], Xc2RoleIconComponent.prototype, "role", void 0);
    Xc2RoleIconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'xc2-role-icon',
            template: __webpack_require__(/*! ./xc2-role-icon.component.html */ "./src/app/xc2-role-icon/xc2-role-icon.component.html"),
            styles: [__webpack_require__(/*! ./xc2-role-icon.component.scss */ "./src/app/xc2-role-icon/xc2-role-icon.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], Xc2RoleIconComponent);
    return Xc2RoleIconComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dev\xc2-team-builder\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map