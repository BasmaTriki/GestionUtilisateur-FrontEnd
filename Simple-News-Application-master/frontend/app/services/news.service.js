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
let NewsService = class NewsService {
    constructor(http) {
        this.http = http;
        this.newsUrl = raven_index_1.Config.ApiUrl + 'news';
    }
    getAllNews() {
        return this.http.get(this.newsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getNews(id) {
        const url = `${this.newsUrl}/${id}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    delete(id) {
        const url = `${this.newsUrl}/${id}/`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(news, files) {
        let formData = new FormData();
        formData.append("thumbnail", files[0], files[0].name);
        for (var property in news) {
            if (news.hasOwnProperty(property)) {
                if (typeof news[property] == 'object')
                    formData.append(property, news[property]._id);
                else
                    formData.append(property, news[property]);
            }
        }
        return this.http
            .postWithFile(this.newsUrl + "/", formData)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }
    update(news, files) {
        const url = `${this.newsUrl}/${news._id}/`;
        let formData = new FormData();
        if (files)
            formData.append("thumbnail", files[0], files[0].name);
        for (var property in news) {
            if (news.hasOwnProperty(property)) {
                if (typeof news[property] == 'object')
                    formData.append(property, news[property]._id);
                else
                    formData.append(property, news[property]);
            }
        }
        return this.http
            .putWithFile(url, formData)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }
    handleError(error) {
        return Promise.reject(error.message || error);
    }
};
NewsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [raven_index_1.HttpClient])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map