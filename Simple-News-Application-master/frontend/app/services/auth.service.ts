import { Headers, Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { User, Config } from '../raven.index';
import 'rxjs/add/operator/toPromise';

import { StatusCode } from '../raven.index';

@Injectable()
export class AuthService {
	username: string = "";
	authToken: string = "";

	static userInfo: User;

	constructor(private http: Http) {
		if(localStorage.getItem("user_info") != null){
			AuthService.userInfo = JSON.parse(localStorage.getItem("user_info"));
		}
	}

	getCookie(name: string) {
		var cookieValue:any = null;
		if (document.cookie && document.cookie !== '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}


	authUrl = Config.ApiUrl + "authenticate";

	login(username: string, password: string): Promise<any> {

		var headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});

		let options = new RequestOptions({ headers: headers });

		let urlSearchParams = new URLSearchParams();
		urlSearchParams.append('username', username);
		urlSearchParams.append('password', password);
		let body = urlSearchParams.toString();

		return this.http.post(this.authUrl, urlSearchParams, options)
			.toPromise()
			.then((response: Response) => {
				var body = response.json();
				if(response.status == StatusCode.Success && body.token != null && body.user_info != null) {
					body.user_info.expired = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
					AuthService.userInfo = body.user_info;
					localStorage.setItem("user_info", JSON.stringify(AuthService.userInfo));
					localStorage.setItem("auth_token", body.token);
				}
				return body;
			})
			.catch(this.handleError);
	}

	isLoggedIn(): boolean {
		return AuthService.userInfo != null &&
			(new Date().getTime() < new Date(AuthService.userInfo.expired).getTime());
	}

	getUser() {
		return AuthService.userInfo;
	}

	setUser(user: User){
		AuthService.userInfo = user;
	}

	getToken(){
		return "Token " + AuthService.userInfo.token;
	}

	logout() {
		localStorage.removeItem("user_info");
		localStorage.removeItem("auth_token");
		AuthService.userInfo = null;
	}

	private handleError(error: any): Promise<any> {
		console.log(error);
		return Promise.reject(error.message || error);
	}
}
