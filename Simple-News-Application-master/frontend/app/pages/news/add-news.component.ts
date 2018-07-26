import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {
  NewsService, News, LoadingIndicatorService,
  DropdownValue, Notification, MediaMimeType,
  CategoryService, Category, AuthService
} from 'raven.index';

@Component({
  selector: 'raven-add-news',
  templateUrl: './add-news.component.html'
})
export class AddNewsComponent implements OnInit {

  news: News = new News();
  isSubmited: boolean = false;
  fileValidate: Object = { "err": [], stat: false };
  thumbnail: File;
  categories: DropdownValue[] = [];

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private location: Location,
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
  }

  onSubmit() {
    this.isSubmited = true;
    this.fileValidate = { "err": [], stat: false };

    if (!this.thumbnail) {
      this.fileValidate['err'].push("Thumbnail is required");
      this.fileValidate['stat'] = false;
    }
    else if (this.thumbnail[0].type && typeof MediaMimeType[this.thumbnail[0].type] === 'undefined') {
      this.fileValidate['err'].push("The selected file is not a valid image file");
      this.fileValidate['stat'] = false;
    } else if (this.news.isValid()) {
      this._loadingSvc.setValue(true);
      this.news.author = this.authService.getUser();
      this.newsService.create(this.news, this.thumbnail).then((res) => {
        Notification.notySuccessMessage("Successfully created news with title: " + this.news.title);
        this._loadingSvc.setValue(false);
        this.router.navigate(['/news']);
      }).catch((res) => {
        this._loadingSvc.setValue(false);
        Notification.notyErrorMessage("News could not be created with received data.");
      });
    }
  }

  onChange(event: any) {
    this.thumbnail = event.srcElement.files;
  }

  goBack(): void {
    this.location.back();
  }
}