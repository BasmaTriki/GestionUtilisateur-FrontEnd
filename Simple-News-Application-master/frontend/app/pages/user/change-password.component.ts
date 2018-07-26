import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User, AuthService, UserService, LoadingIndicatorService, Notification } from 'raven.index';

@Component({
	selector: 'raven-change-password',
	templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
	user: User;
	currentPassword: string;
	isSubmited: boolean;

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private _loadingSvc: LoadingIndicatorService
	) { }

	ngOnInit() {
		this.user = new User("", "");
		this.user._id = this.authService.getUser()._id;
	}

	isCurrentPasswordValid() {
		var err: any[] = [];
		var stat = true;
		if (!this.currentPassword) {
			err.push("Current Password is required");
			stat = false;
			return { stat, err };
		}
		if (this.currentPassword.length < 5) {
			err.push("Current Password Length cannot be less than 5");
			stat = false;
		}
		if (this.currentPassword.length > 30) {
			err.push("Current Password Length cannot be more than 30");
			stat = false;
		}
		var myRe = /^[\d\w_.-]*$/;
		var myArray = myRe.exec(this.currentPassword);

		if (!myArray) {
			err.push("Current Password can only contain Letters, numbers, underscore(_) and hyphen(-).");
			stat = false;
		}
		return { stat, err };
	}

	onSubmit() {
		this.isSubmited = true;

		if (this.user.isPasswordValid().stat && this.user.isrPasswordValid().stat && this.isCurrentPasswordValid().stat) {
			this._loadingSvc.setValue(true);

			let pwObj = {
				"currentPassword": this.currentPassword,
				"newPassword": this.user.password
			}

			this.userService.changePassword(pwObj).then((res) => {
				this._loadingSvc.setValue(false);
				if (res.status && res.status == 'success') {
					Notification.notySuccessMessage(res.message);
					let that = this;
					setTimeout(function() {
						that.authService.logout();
						that.router.navigate(['/login']);
					}, 3000);
				}
				else if (res.status && res.status == 'error') {
					Notification.notyErrorMessage(res.message);
				}
			}).catch(() => {
				this._loadingSvc.setValue(false);
				Notification.notyErrorMessage("Something wrong. Please try again later.");

			});
		}
	}

	goBack(): void {
		this.location.back();
	}
}