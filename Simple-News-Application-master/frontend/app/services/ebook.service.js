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
let EbookService = class EbookService {
    constructor(http) {
        this.http = http;
        this.ebookUrl = 'api/ebook';
    }
    getEbooks() {
        return this.http.get(this.ebookUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getEbook(id) {
        const url = `${this.ebookUrl}/${id}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    delete(id) {
        const url = `${this.ebookUrl}/${id}/`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(ebook, files) {
        let formData = new FormData();
        formData.append("ebook", files[0], files[0].name);
        for (var property in ebook) {
            if (ebook.hasOwnProperty(property)) {
                formData.append(property, ebook[property]);
            }
        }
        return this.http
            .postWithFile(this.ebookUrl + "/", formData)
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }
    update(ebook) {
        const url = `${this.ebookUrl}/${ebook.id}/`;
        return this.http
            .put(url, ebook)
            .toPromise()
            .then(() => ebook)
            .catch(this.handleError);
    }
    patch(ebook, files) {
        const url = `${this.ebookUrl}/${ebook.id}/`;
        let formData = new FormData();
        if (files) {
            formData.append("ebook", files[0], files[0].name);
        }
        else {
            delete ebook.ebook;
        }
        for (var property in ebook) {
            if (ebook.hasOwnProperty(property)) {
                formData.append(property, ebook[property]);
            }
        }
        return this.http
            .patchWithFile(url, formData)
            .toPromise()
            .then(() => ebook)
            .catch(this.handleError);
    }
    handleError(error) {
        console.log(error);
        return Promise.reject(error.message || error);
    }
};
EbookService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [raven_index_1.HttpClient])
], EbookService);
exports.EbookService = EbookService;
//# sourceMappingURL=ebook.service.js.map