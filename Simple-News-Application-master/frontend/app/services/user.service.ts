import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User, HttpClient, Config } from 'raven.index';

@Injectable()
export class UserService {

	private userUrl = Config.ApiUrl + 'user';

	constructor(private http: HttpClient) { }

	getUsers(): Promise<User[]> {
		return this.http.get(this.userUrl)
			.toPromise()
			.then(response => response.json() as User[])
			.catch(this.handleError);
	}

	getUser(id: string): Promise<User> {
		const url = `${this.userUrl}/${id}/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as User)
			.catch(this.handleError);
	}

	delete(id: string): Promise<void> {
		const url = `${this.userUrl}/${id}/`;
		return this.http.delete(url)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	create(user: User): Promise<User> {
		return this.http
			.post(this.userUrl + "s/", user)
			.toPromise()
			.then(res => res.json() as User)
			.catch(this.handleError);
	}

	update(user: User): Promise<User> {
		const url = `${this.userUrl}/${user._id}/`;
		return this.http
			.put(url, user)
			.toPromise()
			.then(() => user)
			.catch(this.handleError);
	}

	updateProfile(user: User): Promise<User> {
		const url = `${this.userUrl}/update_profile/`;
		return this.http
			.put(url, user)
			.toPromise()
			.then(() => user)
			.catch(this.handleError);
	}

	changePassword(data: Object): Promise<any> {
		return this.http.post(`${this.userUrl}/change_password/`, data)
			.toPromise()
			.then((response: Response) => {
				return response.json();
			})
			.catch(this.handleError);
	}

	patch(user: User): Promise<User> {
		const url = `${this.userUrl}/${user._id}/`;
		return this.http
			.patch(url, user)
			.toPromise()
			.then(res => res.json() as User)
			.catch(this.handleError);
	}

	searchByEmail(term: string, exclude: boolean): Promise<any> {
		return this.http.get(this.userUrl + '/count_by_email/?email=' + term + '&exclude=' + exclude)
			.toPromise()
			.then((response: Response) => {

				return response.json();
			})
			.catch(this.handleError);
	}

	searchByUsername(term: string, exclude: boolean): Promise<any> {
		return this.http.get(this.userUrl + '/count_by_username/?username=' + term + '&exclude=' + exclude)
			.toPromise()
			.then((response: Response) => {

				return response.json();
			})
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}
}