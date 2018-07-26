
// Module
export { AppRoutingModule } 					from './modules/app-routing.module';
export { slideToLeft, slideToBottom } 			from './modules/animation.module';
export { MonarchUI }				 			from './modules/monarch.module';
export { Notification }				 			from './modules/notification.module';

// Loading indicator module
export { LoadingIndicatorService } 				from './services/loading-indicator.service';
export { LoadingIndicatorModule } 				from './modules/loading-indicator.module';
export { LoadingIndicatorComponent } 			from './includes/loading-indicator.component';

// Services
export { AuthService }				 			from './services/auth.service';
export { AuthGuard, NotForUserGuard }			from './services/auth-guard.service';
export { HttpClient }				 			from './services/http-client.service';
export { WindowRef }							from './services/window.service';
export { UserService } 							from './services/user.service';
export { CategoryService }							from './services/category.service';
export { NewsService }              from './services/news.service';

// Enum
export {
	StatusCode, Status,
	DocumentMimeType, MediaMimeType, Config
}												from './raven.enum';

// Model
export { User } 								from './models/user';
export { Category }								from './models/category';
export { News }                from './models/news';

// Includes
export { FullLayoutComponent }				 	from './includes/full-layout.component';
export { SimpleLayoutComponent }				from './includes/simple-layout.component';
export { HeaderComponent }						from './includes/header.component';
export { SidebarComponent }						from './includes/sidebar.component';
export { SettingComponent }						from './includes/setting.component';
export { DropdownComponent, DropdownValue}		from './includes/dropdown.component';

// Component
export { RavenComponent }						from './raven.component';
export { NotFoundComponent }					from './pages/404/404.component';
export { ForbiddenComponent }					from './pages/403/403.component';
export { ServerErrorComponent }					from './pages/500/500.component';
export { DashboardComponent }					from './pages/dashboard/dashboard.component';
export { LoginComponent }						from './pages/login/login.component';
export { UserComponent }						from './pages/user/user.component';
export { UpdateUserComponent }					from './pages/user/update-user.component';
export { UpdateProfileComponent }				from './pages/user/update-profile.component';
export { ChangePasswordComponent }				from './pages/user/change-password.component';
export { AddUserComponent }						from './pages/user/add-user.component';
export { CategoryComponent}		 				from './pages/category/category.component';
export { AddCategoryComponent}		 				from './pages/category/add-category.component';
export { UpdateCategoryComponent}           from './pages/category/update-category.component';
export { NewsComponent}           from './pages/news/news.component';
export { AddNewsComponent}           from './pages/news/add-news.component';
export { UpdateNewsComponent}	 				from './pages/news/update-news.component';