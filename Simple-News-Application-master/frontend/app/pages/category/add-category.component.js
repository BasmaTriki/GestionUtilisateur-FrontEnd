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
let AddCategoryComponent = class AddCategoryComponent {
    constructor(categoryService, location, _loadingSvc, router) {
        this.categoryService = categoryService;
        this.location = location;
        this._loadingSvc = _loadingSvc;
        this.router = router;
        this.category = new raven_index_1.Category();
        this.isSubmited = false;
    }
    ngOnInit() {
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.category.isValid()) {
            this._loadingSvc.setValue(true);
            this.categoryService.create(this.category).then(() => {
                raven_index_1.Notification.notySuccessMessage("Successfully created category with name: " + this.category.name);
                this._loadingSvc.setValue(false);
                this.router.navigate(['/categories']);
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("Category could not be created with received data.");
            });
        }
    }
    goBack() {
        this.location.back();
    }
};
AddCategoryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-add-category',
        templateUrl: './add-category.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.CategoryService,
        common_1.Location,
        raven_index_1.LoadingIndicatorService,
        router_1.Router])
], AddCategoryComponent);
exports.AddCategoryComponent = AddCategoryComponent;
//# sourceMappingURL=add-category.component.js.map