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
require("rxjs/add/operator/toPromise");
const raven_index_1 = require("raven.index");
let CategoryService = class CategoryService {
    constructor(http) {
        this.http = http;
        this.categoryUrl = raven_index_1.Config.ApiUrl + 'category';
        this.categoriesUrl = raven_index_1.Config.ApiUrl + 'categories';
    }
    getCategories() {
        return this.http.get(this.categoriesUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getCategory(id) {
        const url = `${this.categoryUrl}/${id}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    delete(id) {
        const url = `${this.categoryUrl}/${id}/`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(category) {
        return this.http
            .post(this.categoriesUrl + "/", category)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    update(category) {
        const url = `${this.categoryUrl}/${category._id}/`;
        return this.http
            .put(url, category)
            .toPromise()
            .then(() => category)
            .catch(this.handleError);
    }
    handleError(error) {
        return Promise.reject(error.message || error);
    }
};
CategoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [raven_index_1.HttpClient])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map