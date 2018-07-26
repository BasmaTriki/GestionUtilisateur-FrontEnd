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
let NewsComponent = class NewsComponent {
    constructor(zone, router, windowRef, _loadingSvc, newsService) {
        this.zone = zone;
        this.router = router;
        this.windowRef = windowRef;
        this._loadingSvc = _loadingSvc;
        this.newsService = newsService;
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
                { "data": "thumbnail" },
                { "data": "title" },
                { "data": "category.name" },
                { "data": "author.name" },
                { "data": "created_date" },
                { "data": "_id" },
            ],
            "aoColumnDefs": [
                {
                    "render": function (row, type, val, meta) {
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
                    "render": function (row, type, val, meta) {
                        return `<img src="${raven_index_1.Config.UploadUrl}/${val.thumbnail}" style="width: 50px; height: 50px" />`;
                    },
                    "targets": 0,
                    "orderable": false,
                    "bVisible": false,
                },
                {
                    "render": function (row, type, val, meta) {
                        var d = new Date(val.created_date);
                        return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes();
                    },
                    "targets": 4
                }
            ],
            "ajax": {
                "url": raven_index_1.Config.ApiUrl + 'news/data_table',
                "data": function (d) {
                    d["x-access-token"] = localStorage.getItem("auth_token");
                }
            }
        });
        $('.dataTables_filter input').attr("placeholder", "Search...");
    }
    removeItem(id) {
        raven_index_1.Notification.notyConfirmMessage("Are you sure you want to delete this news ?", () => {
            this._loadingSvc.setValue(true);
            this.newsService.delete(id).then(() => {
                raven_index_1.Notification.notySuccessMessage("Successfully deleted news with ID: " + id);
                this._loadingSvc.setValue(false);
                this.router.navigateByUrl('/news');
                this.datatableInstance.fnDraw();
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("This news could not deleted.");
            });
        });
    }
};
NewsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-news',
        templateUrl: './news.component.html'
    }),
    __metadata("design:paramtypes", [core_1.NgZone,
        router_1.Router,
        raven_index_1.WindowRef,
        raven_index_1.LoadingIndicatorService,
        raven_index_1.NewsService])
], NewsComponent);
exports.NewsComponent = NewsComponent;
//# sourceMappingURL=news.component.js.map