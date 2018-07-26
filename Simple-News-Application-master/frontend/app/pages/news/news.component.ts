import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef, Notification, LoadingIndicatorService, NewsService, Config } from 'raven.index';

@Component({
  selector: 'raven-news',
  templateUrl: './news.component.html'
})
export class NewsComponent implements OnInit {
  datatableInstance: any;

  constructor(
    private zone: NgZone,
    private router: Router,
    private windowRef: WindowRef,
    private _loadingSvc: LoadingIndicatorService,
    private newsService: NewsService
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
        { "data": "thumbnail" },
        { "data": "title" },
        { "data": "category.name" },
        { "data": "author.name" },
        { "data": "created_date" },
        { "data": "_id" },
      ],
      "aoColumnDefs": [
        {
          "render": function(row: any, type: any, val: any, meta: any) {
            return `<a onclick="routeLink('news/${val._id}');">
              <button class="btn btn-primary">Update</button>
            </a> 
            <a onclick="removeItem('${val._id}');">
              <button class="btn btn-danger">Delete</button>
            </a>`;
          },
          "targets": 5,
          "orderable": false,
        },
        {
          "render": function(row: any, type: any, val: any, meta: any) {
            return `<img src="${Config.UploadUrl}/${val.thumbnail}" style="width: 80px; height: 50px" />`;
          },
          "targets": 0,
          "orderable": false,
          "bVisible": false,
        },
        {
          "render": function(row: any, type: any, val: any, meta: any) {
            var d = new Date(val.created_date);
            return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
          },
          "targets": 4
        }
      ],
      "ajax": {
        "url": Config.ApiUrl + 'news/data_table',
        "data": function ( d:any ) {
            d["x-access-token"] = localStorage.getItem("auth_token");
        }
      }
    });
    $('.dataTables_filter input').attr("placeholder", "Search...");
  }

  removeItem(id: string) {
    Notification.notyConfirmMessage("Are you sure you want to delete this news ?", () => {
      this._loadingSvc.setValue(true);
      this.newsService.delete(id).then(() => {

        Notification.notySuccessMessage("Successfully deleted news with ID: " + id);
        this._loadingSvc.setValue(false);
        this.router.navigateByUrl('/news');
        this.datatableInstance.fnDraw();
      }).catch(() => {

        this._loadingSvc.setValue(false);
        Notification.notyErrorMessage("This news could not deleted.");

      });

    });
  }
}