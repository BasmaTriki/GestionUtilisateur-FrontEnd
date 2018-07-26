import { Injectable } 			from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild,
	NavigationExtras,
	CanLoad, Route
} 								from '@angular/router';
import { Observable } 			from 'rxjs/Observable';
import { AuthService } 			from 'raven.index';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(protected router: Router, private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		if (state.url !== '/login' && !this.authService.isLoggedIn()) {
			this.router.navigate(['/login']);
			return false;
		}

		return true;
	}
}

@Injectable()
export class NotForUserGuard implements CanActivate {

	constructor(protected router: Router, private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		if (state.url !== '/' && this.authService.isLoggedIn()) {
			this.router.navigate(['/']);
			return false;
		}

		return true;
	}
}