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
const common_1 = require("@angular/common");
const raven_index_1 = require("raven.index");
let UpdateNewsComponent = class UpdateNewsComponent {
    constructor(newsService, categoryService, authService, location, route, _loadingSvc, router) {
        this.newsService = newsService;
        this.categoryService = categoryService;
        this.authService = authService;
        this.location = location;
        this.route = route;
        this._loadingSvc = _loadingSvc;
        this.router = router;
        this.news = new raven_index_1.News();
        this.isSubmited = false;
        this.fileValidate = { "err": [], stat: false };
        this.categories = [];
        this.uploadUrl = raven_index_1.Config.UploadUrl;
    }
    ngOnInit() {
        this.categoryService.getCategories().then((listCategories) => {
            let item;
            for (item of listCategories) {
                this.categories.push({ 'value': item._id, 'label': item.name });
            }
        });
        this.route.params
            .switchMap((params) => this.newsService.getNews(params['id']))
            .subscribe(news => {
            this.news = new raven_index_1.News();
            for (var key in news)
                this.news[key] = news[key];
        });
    }
    onSubmit() {
        this.isSubmited = true;
        this.fileValidate = { "err": [], stat: false };
        if (this.thumbnail && this.thumbnail[0].type && typeof raven_index_1.MediaMimeType[this.thumbnail[0].type] === 'undefined') {
            this.fileValidate['err'].push("The selected file is not a valid image file");
            this.fileValidate['stat'] = false;
        }
        else if (this.news.isValid()) {
            this._loadingSvc.setValue(true);
            this.news.author = this.authService.getUser();
            this.newsService.update(this.news, this.thumbnail).then((res) => {
                raven_index_1.Notification.notySuccessMessage("Successfully updated news with title: " + this.news.title);
                this._loadingSvc.setValue(false);
                this.router.navigate(['/news']);
            }).catch((res) => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("News could not be updated with received data.");
            });
        }
    }
    onChange(event) {
        this.thumbnail = event.srcElement.files;
    }
    onChangeContent(event) {
        this.news.content = event;
    }
    goBack() {
        this.location.back();
    }
};
UpdateNewsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-update-news',
        templateUrl: './update-news.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.NewsService,
        raven_index_1.CategoryService,
        raven_index_1.AuthService,
        common_1.Location,
        router_1.ActivatedRoute,
        raven_index_1.LoadingIndicatorService,
        router_1.Router])
], UpdateNewsComponent);
exports.UpdateNewsComponent = UpdateNewsComponent;
//# sourceMappingURL=update-news.component.js.map