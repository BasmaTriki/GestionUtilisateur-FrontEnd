import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Category, HttpClient, Config } from 'raven.index';

@Injectable()
export class CategoryService {

	private categoryUrl = Config.ApiUrl + 'category';
	private categoriesUrl = Config.ApiUrl + 'categories';

	constructor(private http: HttpClient) { }

	getCategories(): Promise<Category[]> {
		return this.http.get(this.categoriesUrl)
			.toPromise()
			.then(response => response.json() as Category[])
			.catch(this.handleError);
	}

	getCategory(id: string): Promise<Category> {
		const url = `${this.categoryUrl}/${id}/`;
		return this.http.get(url)
			.toPromise()
			.then(response => response.json() as Category)
			.catch(this.handleError);
	}

	delete(id: string): Promise<void> {
		const url = `${this.categoryUrl}/${id}/`;
		return this.http.delete(url)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	create(category: Category): Promise<Category> {
		return this.http
			.post(this.categoriesUrl + "/", category)
			.toPromise()
			.then(res => res.json() as Category)
			.catch(this.handleError);
	}

	update(category: Category): Promise<Category> {
		const url = `${this.categoryUrl}/${category._id}/`;
		return this.http
			.put(url, category)
			.toPromise()
			.then(() => category)
			.catch(this.handleError);
	}
	
	private handleError(error: any): Promise<any> {
		return Promise.reject(error.message || error);
	}
}