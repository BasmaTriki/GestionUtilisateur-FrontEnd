import 'rxjs/add/operator/switchMap';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import {
	UserService, User, LoadingIndicatorService,
	DropdownValue, Notification, AuthService
} from 'raven.index';

@Component({
	selector: 'raven-update-profile',
	templateUrl: './update-profile.component.html'
})
export class UpdateProfileComponent implements OnInit {
	user: User;
	isSubmited: boolean = false;

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private _loadingSvc: LoadingIndicatorService
	) {}

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.userService.getUser(this.authService.getUser()._id))
			.subscribe(user => {
				this.user = new User("", "");
				for(var key in user) this.user[key] = user[key];
			});
	}

	onSubmit() {
		this.isSubmited = true;

		if (this.user.isNameValid().stat && this.user.isPhoneNumberValid().stat) {

			let submitUserObj: User = new User("", "");
			submitUserObj.name = this.user.name;
			submitUserObj.phone_number = this.user.phone_number;
			delete submitUserObj.password;
			delete submitUserObj.username;

			this._loadingSvc.setValue(true);
			this.userService.updateProfile(submitUserObj).then((res) => {
				localStorage.setItem("user_info", JSON.stringify(res));
				this.authService.setUser(res);
				Notification.notySuccessMessage("Successfully updated your profile.");
				this._loadingSvc.setValue(false);
			}).catch(() => {
				this._loadingSvc.setValue(false);
				Notification.notyErrorMessage("Your profile could not be updated with received data.");
				
			});
		}
	}

	goBack(): void {
		this.location.back();
	}
}