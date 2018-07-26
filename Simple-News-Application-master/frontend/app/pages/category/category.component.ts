import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef, Notification, LoadingIndicatorService, CategoryService, Config } from 'raven.index';

@Component({
  selector: 'raven-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  datatableInstance: any;

  constructor(
    private zone: NgZone,
    private router: Router,
    private windowRef: WindowRef,
    private _loadingSvc: LoadingIndicatorService,
    private categoryService: CategoryService
  ) {
    windowRef.nativeWindow.angularComponentRefer = {
      zone: this.zone,
      componentFn: (value: any) => this.removeItem(value),
      component: this
    };
  }

  ngOnInit() {
    this.datatableInstance = (<any>$('#datatable-example')).dataTable({
      "processing": true,
      "serverSide": true,
      "responsive": true,
      "columns": [
        { "data": "_id" },
        { "data": "name" },
        { 
          "data": "description",
          "defaultContent": ""
        },
        { 
          "data": "created_date"
        },
      ],
      "columnDefs": [ 
        {
          "render": function(row: any, type: any, val: any, meta: any) {
            return `<a onclick="routeLink('category/${val._id}');">
              <button class="btn btn-primary">Update</button>
            </a> 
            <a onclick="removeItem('${val._id}');">
              <button class="btn btn-danger">Delete</button>
            </a>`;
          },
          "targets": 4,
          "orderable": false,
          "data": "_id",
        },
        {
          "render": function(row: any, type: any, val: any, meta: any) {
            var d = new Date(val.created_date);
            return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
          },
          "targets": 3
        },
        {
          "width": "25%",
          "targets": [1,2]
        },
        {
          "width": "20%",
          "targets": [3]
        },
        {
          "width": "10%",
          "targets": [4]
        } 
      ],
      "ajax": {
        "url": Config.ApiUrl + 'categories/data_table',
        "data": function ( d:any ) {
            d["x-access-token"] = localStorage.getItem("auth_token");
        }
      }
    });
    $('.dataTables_filter input').attr("placeholder", "Search...");
  }

  removeItem(id: string) {
    Notification.notyConfirmMessage("Are you sure you want to delete this category ?", () => {
      this._loadingSvc.setValue(true);
      this.categoryService.delete(id).then(() => {

        Notification.notySuccessMessage("Successfully deleted category with ID: " + id);
        this._loadingSvc.setValue(false);
        this.router.navigateByUrl('/categories');
        this.datatableInstance.fnDraw();
      }).catch(() => {

        this._loadingSvc.setValue(false);
        Notification.notyErrorMessage("This category could not deleted.");

      });

    });
  }
}