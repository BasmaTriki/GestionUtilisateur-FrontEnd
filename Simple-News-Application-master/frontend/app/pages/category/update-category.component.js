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
require("rxjs/add/operator/switchMap");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const raven_index_1 = require("raven.index");
let UpdateCategoryComponent = class UpdateCategoryComponent {
    constructor(categoryService, route, router, location, _loadingSvc) {
        this.categoryService = categoryService;
        this.route = route;
        this.router = router;
        this.location = location;
        this._loadingSvc = _loadingSvc;
        this.isSubmited = false;
    }
    ngOnInit() {
        this.route.params
            .switchMap((params) => this.categoryService.getCategory(params['id']))
            .subscribe(category => {
            this.category = new raven_index_1.Category();
            for (var key in category)
                this.category[key] = category[key];
        });
    }
    ngAfterViewInit() {
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.category.isNameValid().stat) {
            this._loadingSvc.setValue(true);
            this.categoryService.update(this.category).then(() => {
                raven_index_1.Notification.notySuccessMessage("Successfully updated category account with category name: " + this.category.name);
                this._loadingSvc.setValue(false);
                this.router.navigate(['/categories']);
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("Category could not be updated with received data.");
            });
        }
    }
    goBack() {
        this.location.back();
    }
};
UpdateCategoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-update-category',
        templateUrl: './update-category.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.CategoryService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location,
        raven_index_1.LoadingIndicatorService])
], UpdateCategoryComponent);
exports.UpdateCategoryComponent = UpdateCategoryComponent;
//# sourceMappingURL=update-category.component.js.map