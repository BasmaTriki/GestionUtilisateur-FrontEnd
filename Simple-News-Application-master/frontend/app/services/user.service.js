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
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.userUrl = raven_index_1.Config.ApiUrl + 'user';
    }
    getUsers() {
        return this.http.get(this.userUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getUser(id) {
        const url = `${this.userUrl}/${id}/`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    delete(id) {
        const url = `${this.userUrl}/${id}/`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    create(user) {
        return this.http
            .post(this.userUrl + "s/", user)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    update(user) {
        const url = `${this.userUrl}/${user._id}/`;
        return this.http
            .put(url, user)
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }
    updateProfile(user) {
        const url = `${this.userUrl}/update_profile/`;
        return this.http
            .put(url, user)
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }
    changePassword(data) {
        return this.http.post(`${this.userUrl}/change_password/`, data)
            .toPromise()
            .then((response) => {
            return response.json();
        })
            .catch(this.handleError);
    }
    patch(user) {
        const url = `${this.userUrl}/${user._id}/`;
        return this.http
            .patch(url, user)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    searchByEmail(term, exclude) {
        return this.http.get(this.userUrl + '/count_by_email/?email=' + term + '&exclude=' + exclude)
            .toPromise()
            .then((response) => {
            return response.json();
        })
            .catch(this.handleError);
    }
    searchByUsername(term, exclude) {
        return this.http.get(this.userUrl + '/count_by_username/?username=' + term + '&exclude=' + exclude)
            .toPromise()
            .then((response) => {
            return response.json();
        })
            .catch(this.handleError);
    }
    handleError(error) {
        return Promise.reject(error.message || error);
    }
};
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [raven_index_1.HttpClient])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map