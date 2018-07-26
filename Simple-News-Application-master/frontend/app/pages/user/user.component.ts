import { Component, OnInit, NgZone, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, WindowRef, Notification, LoadingIndicatorService, UserService, Config } from 'raven.index';

@Component({
  selector: 'raven-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  datatableInstance: any;

  constructor(
    private authService: AuthService,
    private zone: NgZone,
    private router: Router,
    private windowRef: WindowRef,
    private _loadingSvc: LoadingIndicatorService,
    private userService: UserService
  ) {
    windowRef.nativeWindow.angularComponentRefer = {
      zone: this.zone,
      componentFn: (value: any) => this.removeItem(value),
      component: this
    };
  }

  removeItem(id: string) {
    Notification.notyConfirmMessage("Are you sure you want to delete this user ?", () => {
      this._loadingSvc.setValue(true);
      this.userService.delete(id).then(() => {

        Notification.notySuccessMessage("Successfully deleted user account with ID: " + id);
        this._loadingSvc.setValue(false);
        this.router.navigateByUrl('/users');
        this.datatableInstance.fnDraw();
      }).catch(() => {

        this._loadingSvc.setValue(false);
        Notification.notyErrorMessage("This user could not deleted.");

      });

    });
  }

  destroyDatatable(){
    (<any>$('#datatable-example')).dataTable().destroy();
  }

  initDatatable() {
    this.datatableInstance = (<any>$('#datatable-example')).dataTable({
      "processing": true,
      "serverSide": true,
      "responsive": true,
      "columns": [
        { "data": "_id" },
        { "data": "username" },
        { "data": "name" },
        { "data": "email" },
        { 
          "data": "phone_number",
          "defaultContent": ""
        }
      ],
      "columnDefs": [ 
        {
          "render": function(row: any, type: any, val: any, meta: any) {
            return `<a onclick="routeLink('user/${val._id}');">
              <button class="btn btn-primary">Update</button>
            </a> 
            <a onclick="removeItem('${val._id}');">
              <button class="btn btn-danger">Delete</button>
            </a>`;
          },
          "targets": 5,
          "orderable": false,
          "data": "_id",
        },
        {
          "width": "20%",
          "targets": [1,2,3,4]
        },
        {
          "width": "10%",
          "targets": [5]
        } 
      ],
      "ajax": {
        "url": Config.ApiUrl + 'users',
        "data": function ( d:any ) {
            d["x-access-token"] = localStorage.getItem("auth_token");
        }
      }
    });
    $('.dataTables_filter input').attr("placeholder", "Search...");
  }

  ngOnInit() {
    this.initDatatable();
  }
}