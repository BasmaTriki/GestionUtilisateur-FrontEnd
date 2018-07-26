"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/http");
const animations_1 = require("@angular/platform-browser/animations");
const ng2_ckeditor_1 = require("ng2-ckeditor");
// Module
const app_routing_module_1 = require("./modules/app-routing.module");
const raven_index_1 = require("./raven.index");
let RavenModule = class RavenModule {
};
RavenModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule,
            http_1.HttpModule, forms_1.FormsModule,
            animations_1.BrowserAnimationsModule,
            ng2_ckeditor_1.CKEditorModule,
            raven_index_1.LoadingIndicatorModule.forRoot(),
        ],
        declarations: [
            raven_index_1.RavenComponent, raven_index_1.FullLayoutComponent,
            raven_index_1.SimpleLayoutComponent, raven_index_1.HeaderComponent,
            raven_index_1.SidebarComponent, raven_index_1.SettingComponent,
            raven_index_1.DashboardComponent, raven_index_1.NotFoundComponent,
            raven_index_1.ForbiddenComponent, raven_index_1.ServerErrorComponent,
            raven_index_1.LoginComponent, raven_index_1.UserComponent,
            raven_index_1.UpdateUserComponent, raven_index_1.DropdownComponent,
            raven_index_1.AddUserComponent, raven_index_1.CategoryComponent,
            raven_index_1.AddCategoryComponent, raven_index_1.UpdateCategoryComponent,
            raven_index_1.ChangePasswordComponent, raven_index_1.UpdateProfileComponent,
            raven_index_1.NewsComponent, raven_index_1.AddNewsComponent, raven_index_1.UpdateNewsComponent
        ],
        providers: [
            raven_index_1.MonarchUI, raven_index_1.Notification,
            raven_index_1.AuthGuard, raven_index_1.NotForUserGuard,
            raven_index_1.AuthService,
            raven_index_1.HttpClient, raven_index_1.LoadingIndicatorService,
            raven_index_1.WindowRef, raven_index_1.UserService,
            raven_index_1.CategoryService, raven_index_1.NewsService
        ],
        bootstrap: [raven_index_1.RavenComponent]
    })
], RavenModule);
exports.RavenModule = RavenModule;
//# sourceMappingURL=raven.module.js.map