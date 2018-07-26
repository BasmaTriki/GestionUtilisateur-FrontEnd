import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {
  CategoryService, Category, LoadingIndicatorService,
  DropdownValue, Notification
} from 'raven.index';

@Component({
  selector: 'raven-add-category',
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();
  isSubmited: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private location: Location,
    private _loadingSvc: LoadingIndicatorService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmited = true;

    if (this.category.isValid()) {
      this._loadingSvc.setValue(true);
      this.categoryService.create(this.category).then(() => {

        Notification.notySuccessMessage("Successfully created category with name: " + this.category.name);
        this._loadingSvc.setValue(false);
        this.router.navigate(['/categories']);

      }).catch(() => {

        this._loadingSvc.setValue(false);
        Notification.notyErrorMessage("Category could not be created with received data.");
        
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}