"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const raven_index_1 = require("raven.index");
const routes = [
    {
        path: '', children: [
            { path: '', component: raven_index_1.DashboardComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'users', component: raven_index_1.UserComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'user/add-new', component: raven_index_1.AddUserComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'user/:id', component: raven_index_1.UpdateUserComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'change-password', component: raven_index_1.ChangePasswordComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'update-profile', component: raven_index_1.UpdateProfileComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'user/:id', component: raven_index_1.UpdateUserComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'categories', component: raven_index_1.CategoryComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'category/add-new', component: raven_index_1.AddCategoryComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'category/:id', component: raven_index_1.UpdateCategoryComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'news', component: raven_index_1.NewsComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'news/add-new', component: raven_index_1.AddNewsComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: 'news/:id', component: raven_index_1.UpdateNewsComponent, canActivate: [raven_index_1.AuthGuard] },
            { path: '', component: raven_index_1.HeaderComponent, outlet: 'header' },
            { path: '', component: raven_index_1.SidebarComponent, outlet: 'sidebar' },
        ]
    },
    {
        path: '', children: [
            { path: 'login', component: raven_index_1.LoginComponent, canActivate: [raven_index_1.NotForUserGuard] },
            { path: '404', component: raven_index_1.NotFoundComponent },
            { path: '403', component: raven_index_1.ForbiddenComponent },
            { path: '500', component: raven_index_1.ServerErrorComponent },
            { path: '**', component: raven_index_1.NotFoundComponent },
        ]
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map