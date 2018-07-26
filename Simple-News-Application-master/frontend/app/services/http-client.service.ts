import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class HttpClient {
	constructor(private http: Http) { }

	createAuthorizationHeader(headers: Headers) {
		headers.append('x-access-token', localStorage.getItem("auth_token"));
	}

	get(url: string) {
		let headers = new Headers();
		this.createAuthorizationHeader(headers);
		return this.http.get(url, {
			headers: headers
		});
	}

	post(url: string, data: Object) {
		let headers = new Headers();

		this.createAuthorizationHeader(headers);
		headers.append('Content-Type', 'application/json');

		return this.http.post(url, data, {
			headers: headers
		});
	}

	postWithFile(url: string, data: any): Observable<any> {
		return Observable.create((observer: Observer<any>) => {
			let xhr: XMLHttpRequest = new XMLHttpRequest();

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						observer.next(JSON.parse(xhr.response));
						observer.complete();
					} else {
						observer.error(xhr.response);
					}
				}
			};
			xhr.open('POST', url, true);
			xhr.setRequestHeader('x-access-token', localStorage.getItem("auth_token"));
			xhr.send(data);
		});
	}

	put(url: string, data: Object) {
		let headers = new Headers();

		this.createAuthorizationHeader(headers);
		headers.append('Content-Type', 'application/json');

		return this.http.put(url, data, {
			headers: headers
		});
	}

	putWithFile(url: string, data: any): Observable<any> {
		return Observable.create((observer: Observer<any>) => {
			let xhr: XMLHttpRequest = new XMLHttpRequest();

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						observer.next(JSON.parse(xhr.response));
						observer.complete();
					} else {
						observer.error(xhr.response);
					}
				}
			};
			xhr.open('PUT', url, true);
			xhr.setRequestHeader('x-access-token', localStorage.getItem("auth_token"));
			xhr.send(data);
		});
	}

	patch(url: string, data: Object) {
		let headers = new Headers();

		this.createAuthorizationHeader(headers);
		headers.append('Content-Type', 'application/json');

		return this.http.patch(url, data, {
			headers: headers
		});
	}

	patchWithFile(url: string, data: any): Observable<any> {
		return Observable.create((observer: Observer<any>) => {
			let xhr: XMLHttpRequest = new XMLHttpRequest();

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						observer.next(JSON.parse(xhr.response));
						observer.complete();
					} else {
						observer.error(xhr.response);
					}
				}
			};
			xhr.open('PATCH', url, true);
			xhr.setRequestHeader('x-access-token', localStorage.getItem("auth_token"));
			xhr.send(data);
		});
	}

	delete(url: string) {
		let headers = new Headers();

		this.createAuthorizationHeader(headers);

		return this.http.delete(url, {
			headers: headers
		});
	}
}
