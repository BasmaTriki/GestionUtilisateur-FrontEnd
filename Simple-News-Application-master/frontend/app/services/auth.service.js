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
const http_1 = require("@angular/http");
const core_1 = require("@angular/core");
const raven_index_1 = require("raven.index");
require("rxjs/add/operator/toPromise");
const raven_index_2 = require("raven.index");
let AuthService = AuthService_1 = class AuthService {
    constructor(http) {
        this.http = http;
        this.username = "";
        this.authToken = "";
        this.authUrl = raven_index_1.Config.ApiUrl + "authenticate";
        if (localStorage.getItem("user_info") != null) {
            AuthService_1.userInfo = JSON.parse(localStorage.getItem("user_info"));
        }
    }
    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    login(username, password) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new http_1.RequestOptions({ headers: headers });
        let urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        let body = urlSearchParams.toString();
        return this.http.post(this.authUrl, urlSearchParams, options)
            .toPromise()
            .then((response) => {
            var body = response.json();
            if (response.status == raven_index_2.StatusCode.Success && body.token != null && body.user_info != null) {
                body.user_info.expired = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                AuthService_1.userInfo = body.user_info;
                localStorage.setItem("user_info", JSON.stringify(AuthService_1.userInfo));
                localStorage.setItem("auth_token", body.token);
            }
            return body;
        })
            .catch(this.handleError);
    }
    isLoggedIn() {
        return AuthService_1.userInfo != null &&
            (new Date().getTime() < new Date(AuthService_1.userInfo.expired).getTime());
    }
    getUser() {
        return AuthService_1.userInfo;
    }
    setUser(user) {
        AuthService_1.userInfo = user;
    }
    getToken() {
        return "Token " + AuthService_1.userInfo.token;
    }
    logout() {
        localStorage.removeItem("user_info");
        localStorage.removeItem("auth_token");
        AuthService_1.userInfo = null;
    }
    handleError(error) {
        console.log(error);
        return Promise.reject(error.message || error);
    }
};
AuthService = AuthService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
var AuthService_1;
//# sourceMappingURL=auth.service.js.map