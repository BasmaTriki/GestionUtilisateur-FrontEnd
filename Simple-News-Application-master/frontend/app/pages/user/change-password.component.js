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
let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(authService, userService, route, router, location, _loadingSvc) {
        this.authService = authService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this._loadingSvc = _loadingSvc;
    }
    ngOnInit() {
        this.user = new raven_index_1.User("", "");
        this.user._id = this.authService.getUser()._id;
    }
    isCurrentPasswordValid() {
        var err = [];
        var stat = true;
        if (!this.currentPassword) {
            err.push("Current Password is required");
            stat = false;
            return { stat, err };
        }
        if (this.currentPassword.length < 5) {
            err.push("Current Password Length cannot be less than 5");
            stat = false;
        }
        if (this.currentPassword.length > 30) {
            err.push("Current Password Length cannot be more than 30");
            stat = false;
        }
        var myRe = /^[\d\w_.-]*$/;
        var myArray = myRe.exec(this.currentPassword);
        if (!myArray) {
            err.push("Current Password can only contain Letters, numbers, underscore(_) and hyphen(-).");
            stat = false;
        }
        return { stat, err };
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.user.isPasswordValid().stat && this.user.isrPasswordValid().stat && this.isCurrentPasswordValid().stat) {
            this._loadingSvc.setValue(true);
            let pwObj = {
                "currentPassword": this.currentPassword,
                "newPassword": this.user.password
            };
            this.userService.changePassword(pwObj).then((res) => {
                this._loadingSvc.setValue(false);
                if (res.status && res.status == 'success') {
                    raven_index_1.Notification.notySuccessMessage(res.message);
                    let that = this;
                    setTimeout(function () {
                        that.authService.logout();
                        that.router.navigate(['/login']);
                    }, 3000);
                }
                else if (res.status && res.status == 'error') {
                    raven_index_1.Notification.notyErrorMessage(res.message);
                }
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("Something wrong. Please try again later.");
            });
        }
    }
    goBack() {
        this.location.back();
    }
};
ChangePasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-change-password',
        templateUrl: './change-password.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.AuthService,
        raven_index_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location,
        raven_index_1.LoadingIndicatorService])
], ChangePasswordComponent);
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=change-password.component.js.map