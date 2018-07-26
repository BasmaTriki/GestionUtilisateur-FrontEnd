import { NgModule } 				from '@angular/core';
import { RouterModule, Routes } 	from '@angular/router';
import { 
	NotForUserGuard, AuthGuard,
	ChangePasswordComponent,
	UpdateProfileComponent,
	NotFoundComponent, DashboardComponent,
	ServerErrorComponent, ForbiddenComponent,
	HeaderComponent, SidebarComponent,
	SettingComponent, LoginComponent,
	UserComponent, UpdateUserComponent,
	AddUserComponent, CategoryComponent,
	AddCategoryComponent, UpdateCategoryComponent,
	NewsComponent, AddNewsComponent, UpdateNewsComponent
} 		from 'raven.index';


const routes: Routes = [
	{
		path: '', children: [
			{ path: '', redirectTo: 'users', pathMatch: 'full', canActivate: [AuthGuard] },
			{ path: 'users', component: UserComponent, canActivate: [AuthGuard] },
			{ path: 'user/add-new', component: AddUserComponent, canActivate: [AuthGuard] },
			{ path: 'user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
			{ path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
			{ path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
			{ path: 'user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
			{ path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
			{ path: 'category/add-new', component: AddCategoryComponent, canActivate: [AuthGuard] },
			{ path: 'category/:id', component: UpdateCategoryComponent, canActivate: [AuthGuard] },
			{ path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
			{ path: 'news/add-new', component: AddNewsComponent, canActivate: [AuthGuard] },
			{ path: 'news/:id', component: UpdateNewsComponent, canActivate: [AuthGuard] },
			{ path: '', component: HeaderComponent, outlet: 'header' },
			{ path: '', component: SidebarComponent, outlet: 'sidebar' },
		]
	},
	{
		path: '', children: [
			{ path: 'login', component: LoginComponent, canActivate: [NotForUserGuard] },
			{ path: '404', component: NotFoundComponent },
			{ path: '403', component: ForbiddenComponent },
			{ path: '500', component: ServerErrorComponent },
			{ path: '**', component: NotFoundComponent },
		]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
