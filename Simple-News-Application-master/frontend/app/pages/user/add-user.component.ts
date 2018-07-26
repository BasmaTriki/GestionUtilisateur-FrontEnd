///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {
	UserService, User, LoadingIndicatorService,
	DropdownValue, Notification
} from '../../raven.index';

@Component({
	selector: 'raven-add-user',
	templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {

	user: User = new User("", "");
	isSubmited: boolean = false;
	prevUsername: string = "";
	prevEmail: string = "";
	isExistUsername: boolean = false;
	isExistEmail: boolean = false;

	constructor(
		private userService: UserService,
		private location: Location,
		private _loadingSvc: LoadingIndicatorService,
		private router: Router
	) {
	}

	ngOnInit() {
	}

	onSubmit() {
		this.isSubmited = true;

		if (this.user.isValid() && !this.isExistEmail && !this.isExistUsername) {
			this._loadingSvc.setValue(true);
			this.userService.create(this.user).then(() => {

				Notification.notySuccessMessage("Successfully created user account with username: " + this.user.username);
				this._loadingSvc.setValue(false);
				this.router.navigate(['/users']);

			}).catch(() => {

				this._loadingSvc.setValue(false);
				Notification.notyErrorMessage("Account could not be created with received data.");

			});
		}
	}

	searchByEmail() {
		if (this.user.email == this.prevEmail) {
			return
		}

		this.prevEmail = this.user.email;
		this.userService.searchByEmail(this.user.email, false).then(response => {
				this.isExistEmail = response.count > 0;
		}).catch(() => {
			this.isExistEmail = false;
		});
	}

	searchByUsername() {
		if (this.user.username == this.prevUsername) {
			return
		}

		this.prevUsername = this.user.username;
		this.userService.searchByUsername(this.user.username, false).then(response => {
			this.isExistUsername = response.count > 0;
		}).catch(() => {
			this.isExistUsername = false;
		});
	}

	emailValidation() {

		if (this.isExistEmail == true) {
			return {
				stat: false,
				err: [
					"This email is already registered please choose another one"
				]
			}
		}

		return this.user.isEmailValid();
	}

	usernameValidation() {

		if (this.isExistUsername == true) {
			return {
				stat: false,
				err: [
					"This username is already registered please choose another one"
				]
			}
		}

		return this.user.isUsernameValid();
	}

	goBack(): void {
		this.location.back();
	}
}
