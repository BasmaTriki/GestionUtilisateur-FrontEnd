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
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
const Rx_1 = require("rxjs/Rx");
let HttpClient = class HttpClient {
    constructor(http) {
        this.http = http;
    }
    createAuthorizationHeader(headers) {
        headers.append('x-access-token', localStorage.getItem("auth_token"));
    }
    get(url) {
        let headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }
    post(url, data) {
        let headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, data, {
            headers: headers
        });
    }
    postWithFile(url, data) {
        return Rx_1.Observable.create((observer) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('x-access-token', localStorage.getItem("auth_token"));
            xhr.send(data);
        });
    }
    put(url, data) {
        let headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        headers.append('Content-Type', 'application/json');
        return this.http.put(url, data, {
            headers: headers
        });
    }
    putWithFile(url, data) {
        return Rx_1.Observable.create((observer) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.open('PUT', url, true);
            xhr.setRequestHeader('x-access-token', localStorage.getItem("auth_token"));
            xhr.send(data);
        });
    }
    patch(url, data) {
        let headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        headers.append('Content-Type', 'application/json');
        return this.http.patch(url, data, {
            headers: headers
        });
    }
    patchWithFile(url, data) {
        return Rx_1.Observable.create((observer) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.open('PATCH', url, true);
            xhr.setRequestHeader('x-access-token', localStorage.getItem("auth_token"));
            xhr.send(data);
        });
    }
    delete(url) {
        let headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }
};
HttpClient = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpClient);
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.service.js.map