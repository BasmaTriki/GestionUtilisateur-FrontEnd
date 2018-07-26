import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { News, HttpClient, Config } from 'raven.index';

@Injectable()
export class NewsService {

  private newsUrl = Config.ApiUrl + 'news';

  constructor(private http: HttpClient) { }

  getAllNews(): Promise<News[]> {
    return this.http.get(this.newsUrl)
      .toPromise()
      .then(response => response.json() as News[])
      .catch(this.handleError);
  }

  getNews(id: string): Promise<News> {
    const url = `${this.newsUrl}/${id}/`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as News)
      .catch(this.handleError);
  }

  delete(id: string): Promise<void> {
    const url = `${this.newsUrl}/${id}/`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(news: News, files:File): Promise<News> {
    let formData: FormData = new FormData();
    formData.append("thumbnail", files[0], files[0].name);

    for (var property in news) {
      if (news.hasOwnProperty(property)) {
        if(typeof news[property] == 'object')
          formData.append(property, news[property]._id);
        else
          formData.append(property, news[property]);
      }
    }

    return this.http
      .postWithFile(this.newsUrl + "/", formData)
      .toPromise()
      .then(response => response as News)
      .catch(this.handleError);
  }

  update(news: News, files:File): Promise<News> {
    const url = `${this.newsUrl}/${news._id}/`;
    let formData: FormData = new FormData();
    if(files)
      formData.append("thumbnail", files[0], files[0].name);

    for (var property in news) {
      if (news.hasOwnProperty(property)) {
        if(typeof news[property] == 'object')
          formData.append(property, news[property]._id);
        else
          formData.append(property, news[property]);
      }
    }

    return this.http
      .putWithFile(url, formData)
      .toPromise()
      .then(response => response as News)
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}