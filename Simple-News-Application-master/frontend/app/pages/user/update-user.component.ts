import 'rxjs/add/operator/switchMap';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import {
	UserService, User, LoadingIndicatorService,
	DropdownValue, Notification
} from 'raven.index';

@Component({
	selector: 'raven-update-user',
	templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit, AfterViewInit {
	user: User;
	isSubmited: boolean = false;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private _loadingSvc: LoadingIndicatorService
	) { 
	}

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.userService.getUser(params['id']))
			.subscribe(user => {
				this.user = new User("", "");
				for(var key in user) this.user[key] = user[key];
			});
	}

	ngAfterViewInit(){
	}

	onSubmit() {
		this.isSubmited = true;

		if (this.user.isNameValid().stat && this.user.isPhoneNumberValid().stat) {
			this._loadingSvc.setValue(true);
			delete this.user.password;
			this.userService.update(this.user).then(() => {
				Notification.notySuccessMessage("Successfully updated user account with username: " + this.user.username);
				this._loadingSvc.setValue(false);
				this.router.navigate(['/users']);
			}).catch(() => {
				this._loadingSvc.setValue(false);
				Notification.notyErrorMessage("Account could not be updated with received data.");
				
			});
		}
	}

	goBack(): void {
		this.location.back();
	}
}