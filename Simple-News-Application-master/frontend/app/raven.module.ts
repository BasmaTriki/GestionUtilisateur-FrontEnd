import { NgModule } 							from '@angular/core';
import { BrowserModule } 						from '@angular/platform-browser';
import { FormsModule } 							from '@angular/forms';
import { HttpModule } 							from '@angular/http';
import { BrowserAnimationsModule } 				from '@angular/platform-browser/animations';
import { CKEditorModule } 					from 'ng2-ckeditor';
import * as $ 											from 'jquery';

// Module
import { AppRoutingModule } 					from './modules/app-routing.module'

import {
	FullLayoutComponent, SimpleLayoutComponent,
	HeaderComponent, SidebarComponent,
	SettingComponent, RavenComponent,
	LoadingIndicatorModule, LoadingIndicatorService,
	Notification, UpdateProfileComponent,
	NotFoundComponent, DashboardComponent,
	ForbiddenComponent, ServerErrorComponent,
	LoginComponent, UserComponent,
	UpdateUserComponent, AddUserComponent,
	UserService, DropdownComponent,
	AuthGuard, NotForUserGuard, CategoryComponent,
	AddCategoryComponent, UpdateCategoryComponent,
	CategoryService, ChangePasswordComponent,
	NewsComponent, AddNewsComponent,
	MonarchUI, NewsService, UpdateNewsComponent,
	AuthService, HttpClient, WindowRef
} from './raven.index'


@NgModule({
	imports: [
		BrowserModule, AppRoutingModule,
		HttpModule, FormsModule,
		BrowserAnimationsModule,
		CKEditorModule,
		LoadingIndicatorModule.forRoot(),
	],
	declarations: [
		RavenComponent, FullLayoutComponent,
		SimpleLayoutComponent, HeaderComponent,
		SidebarComponent, SettingComponent,
		DashboardComponent, NotFoundComponent,
		ForbiddenComponent, ServerErrorComponent,
		LoginComponent, UserComponent,
		UpdateUserComponent, DropdownComponent,
		AddUserComponent, CategoryComponent,
		AddCategoryComponent, UpdateCategoryComponent,
		ChangePasswordComponent, UpdateProfileComponent,
		NewsComponent, AddNewsComponent, UpdateNewsComponent
	],
	providers: [
		MonarchUI, Notification,
		AuthGuard, NotForUserGuard,
		AuthService,
		HttpClient, LoadingIndicatorService,
		WindowRef, UserService,
		CategoryService, NewsService
	],
	bootstrap: [RavenComponent]
})
export class RavenModule { }