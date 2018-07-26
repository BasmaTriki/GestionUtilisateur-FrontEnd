import { Component, OnInit } 		from '@angular/core';
import { Location } 				from '@angular/common';
import { Router } 					from '@angular/router';
import {
	User, AuthService, LoadingIndicatorService
} 									from '../../raven.index';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
	model = new User("", "");
	errorMessage: string;

	constructor(
		private authService: AuthService,
		private location: Location,
		private router: Router,
		private _loadingSvc: LoadingIndicatorService
	) { }

	ngOnInit() {
		this._loadingSvc.setValue(true);
	}

	onSubmit() {
		this._loadingSvc.setValue(true);
		this.authService.login(this.model.username, this.model.password)
			.then(() => {
				this.router.navigate(['/']);
			})
			.catch(() => {
				this.errorMessage = "Login information incorrect. Try again";
			})
			.then(() => {
				this._loadingSvc.setValue(false);
			});
	}

	onClose() {
		this.location.back();
	}
}

