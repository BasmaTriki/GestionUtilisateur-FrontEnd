"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const raven_index_1 = require("raven.index");
let UserComponent = class UserComponent {
    constructor(authService, zone, router, windowRef, _loadingSvc, userService) {
        this.authService = authService;
        this.zone = zone;
        this.router = router;
        this.windowRef = windowRef;
        this._loadingSvc = _loadingSvc;
        this.userService = userService;
        windowRef.nativeWindow.angularComponentRefer = {
            zone: this.zone,
            componentFn: (value) => this.removeItem(value),
            component: this
        };
    }
    removeItem(id) {
        raven_index_1.Notification.notyConfirmMessage("Are you sure you want to delete this user ?", () => {
            this._loadingSvc.setValue(true);
            this.userService.delete(id).then(() => {
                raven_index_1.Notification.notySuccessMessage("Successfully deleted user account with ID: " + id);
                this._loadingSvc.setValue(false);
                this.router.navigateByUrl('/users');
                this.datatableInstance.fnDraw();
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("This user could not deleted.");
            });
        });
    }
    destroyDatatable() {
        $('#datatable-example').dataTable().destroy();
    }
    initDatatable() {
        this.datatableInstance = $('#datatable-example').dataTable({
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
                    "render": function (row, type, val, meta) {
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
                    "targets": [1, 2, 3, 4]
                },
                {
                    "width": "10%",
                    "targets": [5]
                }
            ],
            "ajax": {
                "url": raven_index_1.Config.ApiUrl + 'users',
                "data": function (d) {
                    d["x-access-token"] = localStorage.getItem("auth_token");
                }
            }
        });
        $('.dataTables_filter input').attr("placeholder", "Search...");
    }
    ngOnInit() {
        this.initDatatable();
    }
};
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-user',
        templateUrl: './user.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.AuthService,
        core_1.NgZone,
        router_1.Router,
        raven_index_1.WindowRef,
        raven_index_1.LoadingIndicatorService,
        raven_index_1.UserService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map