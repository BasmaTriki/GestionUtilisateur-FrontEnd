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
let CategoryComponent = class CategoryComponent {
    constructor(zone, router, windowRef, _loadingSvc, categoryService) {
        this.zone = zone;
        this.router = router;
        this.windowRef = windowRef;
        this._loadingSvc = _loadingSvc;
        this.categoryService = categoryService;
        windowRef.nativeWindow.angularComponentRefer = {
            zone: this.zone,
            componentFn: (value) => this.removeItem(value),
            component: this
        };
    }
    ngOnInit() {
        this.datatableInstance = $('#datatable-example').dataTable({
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
                    "render": function (row, type, val, meta) {
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
                    "render": function (row, type, val, meta) {
                        var d = new Date(val.created_date);
                        return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
                    },
                    "targets": 3
                },
                {
                    "width": "25%",
                    "targets": [1, 2]
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
                "url": raven_index_1.Config.ApiUrl + 'categories/data_table',
                "data": function (d) {
                    d["x-access-token"] = localStorage.getItem("auth_token");
                }
            }
        });
        $('.dataTables_filter input').attr("placeholder", "Search...");
    }
    removeItem(id) {
        raven_index_1.Notification.notyConfirmMessage("Are you sure you want to delete this category ?", () => {
            this._loadingSvc.setValue(true);
            this.categoryService.delete(id).then(() => {
                raven_index_1.Notification.notySuccessMessage("Successfully deleted category with ID: " + id);
                this._loadingSvc.setValue(false);
                this.router.navigateByUrl('/categories');
                this.datatableInstance.fnDraw();
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("This category could not deleted.");
            });
        });
    }
};
CategoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-category',
        templateUrl: './category.component.html'
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        router_1.Router,
        raven_index_1.WindowRef,
        raven_index_1.LoadingIndicatorService,
        raven_index_1.CategoryService])
], CategoryComponent);
exports.CategoryComponent = CategoryComponent;
//# sourceMappingURL=category.component.js.map