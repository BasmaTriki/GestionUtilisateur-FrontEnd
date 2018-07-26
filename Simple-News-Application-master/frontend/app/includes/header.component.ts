import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'raven.index';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {

	userInfo: Object;

	constructor(
		public authService: AuthService,
		private router: Router
	) { 
		this.userInfo = authService.getUser();
	}


	logout(){
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}