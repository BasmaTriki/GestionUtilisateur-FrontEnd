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
let AddUserComponent = class AddUserComponent {
    constructor(userService, location, _loadingSvc, router) {
        this.userService = userService;
        this.location = location;
        this._loadingSvc = _loadingSvc;
        this.router = router;
        this.user = new raven_index_1.User("", "");
        this.isSubmited = false;
        this.prevUsername = "";
        this.prevEmail = "";
        this.isExistUsername = false;
        this.isExistEmail = false;
    }
    ngOnInit() {
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.user.isValid() && !this.isExistEmail && !this.isExistUsername) {
            this._loadingSvc.setValue(true);
            this.userService.create(this.user).then(() => {
                raven_index_1.Notification.notySuccessMessage("Successfully created user account with username: " + this.user.username);
                this._loadingSvc.setValue(false);
                this.router.navigate(['/users']);
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("Account could not be created with received data.");
            });
        }
    }
    searchByEmail() {
        if (this.user.email == this.prevEmail) {
            return;
        }
        this.prevEmail = this.user.email;
        this.userService.searchByEmail(this.user.email, false).then(response => {
            this.isExistEmail = response.count > 0;
        }).catch(() => {
            this.isExistEmail = false;
        });
    }
    searchByUsername() {
        if (this.user.username == this.prevUsername) {
            return;
        }
        this.prevUsername = this.user.username;
        this.userService.searchByUsername(this.user.username, false).then(response => {
            this.isExistUsername = response.count > 0;
        }).catch(() => {
            this.isExistUsername = false;
        });
    }
    emailValidation() {
        if (this.isExistEmail == true) {
            return {
                stat: false,
                err: [
                    "This email is already registered please choose another one"
                ]
            };
        }
        return this.user.isEmailValid();
    }
    usernameValidation() {
        if (this.isExistUsername == true) {
            return {
                stat: false,
                err: [
                    "This username is already registered please choose another one"
                ]
            };
        }
        return this.user.isUsernameValid();
    }
    goBack() {
        this.location.back();
    }
};
AddUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-add-user',
        templateUrl: './add-user.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.UserService,
        common_1.Location,
        raven_index_1.LoadingIndicatorService,
        router_1.Router])
], AddUserComponent);
exports.AddUserComponent = AddUserComponent;
//# sourceMappingURL=add-user.component.js.map