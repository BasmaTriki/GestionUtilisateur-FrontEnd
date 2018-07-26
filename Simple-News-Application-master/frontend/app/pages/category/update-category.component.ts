import 'rxjs/add/operator/switchMap';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import {
  CategoryService, Category, LoadingIndicatorService,
  DropdownValue, Notification
} from 'raven.index';

@Component({
  selector: 'raven-update-category',
  templateUrl: './update-category.component.html'
})

export class UpdateCategoryComponent implements OnInit, AfterViewInit {
  category: Category;
  isSubmited: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _loadingSvc: LoadingIndicatorService
  ) { 
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.categoryService.getCategory(params['id']))
      .subscribe(category => {
        this.category = new Category();
        for(var key in category) this.category[key] = category[key];
      });
  }

  ngAfterViewInit(){
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.category.isNameValid().stat) {
      this._loadingSvc.setValue(true);
      this.categoryService.update(this.category).then(() => {
        Notification.notySuccessMessage("Successfully updated category account with category name: " + this.category.name);
        this._loadingSvc.setValue(false);
        this.router.navigate(['/categories']);
      }).catch(() => {
        this._loadingSvc.setValue(false);
        Notification.notyErrorMessage("Category could not be updated with received data.");
        
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}