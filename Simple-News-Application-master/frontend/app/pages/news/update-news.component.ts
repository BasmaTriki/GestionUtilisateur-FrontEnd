import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import {
  NewsService, News, LoadingIndicatorService,
  DropdownValue, Notification, MediaMimeType,
  CategoryService, Category, AuthService, Config
} from 'raven.index';

@Component({
  selector: 'raven-update-news',
  templateUrl: './update-news.component.html'
})
export class UpdateNewsComponent implements OnInit {

  news: News = new News();
  isSubmited: boolean = false;
  fileValidate: Object = { "err": [], stat: false };
  thumbnail: File;
  categories: DropdownValue[] = [];
  uploadUrl: any = Config.UploadUrl;

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private location: Location,
    private route: ActivatedRoute,
    private _loadingSvc: LoadingIndicatorService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.categoryService.getCategories().then((listCategories:Category[]) => {
      let item: any;
      for (item of listCategories) {
        this.categories.push({'value': item._id, 'label': item.name});
      }
    });
    this.route.params
      .switchMap((params: Params) => this.newsService.getNews(params['id']))
      .subscribe(news => {
        this.news = new News();
        for(var key in news) this.news[key] = news[key];
    });
  }

  onSubmit() {
    this.isSubmited = true;
    this.fileValidate = { "err": [], stat: false };

    if (this.thumbnail && this.thumbnail[0].type && typeof MediaMimeType[this.thumbnail[0].type] === 'undefined') {
      this.fileValidate['err'].push("The selected file is not a valid image file");
      this.fileValidate['stat'] = false;
    } else if (this.news.isValid()) {
      this._loadingSvc.setValue(true);
      this.news.author = this.authService.getUser();
      this.newsService.update(this.news, this.thumbnail).then((res) => {
        Notification.notySuccessMessage("Successfully updated news with title: " + this.news.title);
        this._loadingSvc.setValue(false);
        this.router.navigate(['/news']);
      }).catch((res) => {
        this._loadingSvc.setValue(false);
        Notification.notyErrorMessage("News could not be updated with received data.");
      });
    }
  }

  onChange(event: any) {
    this.thumbnail = event.srcElement.files;
  }

  onChangeContent(event: any) {
    this.news.content = event;
  }

  goBack(): void {
    this.location.back();
  }
}