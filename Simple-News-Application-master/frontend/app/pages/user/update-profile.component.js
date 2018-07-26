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
let UpdateProfileComponent = class UpdateProfileComponent {
    constructor(userService, authService, route, router, location, _loadingSvc) {
        this.userService = userService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.location = location;
        this._loadingSvc = _loadingSvc;
        this.isSubmited = false;
    }
    ngOnInit() {
        this.route.params
            .switchMap((params) => this.userService.getUser(this.authService.getUser()._id))
            .subscribe(user => {
            this.user = new raven_index_1.User("", "");
            for (var key in user)
                this.user[key] = user[key];
        });
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.user.isNameValid().stat && this.user.isPhoneNumberValid().stat) {
            let submitUserObj = new raven_index_1.User("", "");
            submitUserObj.name = this.user.name;
            submitUserObj.phone_number = this.user.phone_number;
            delete submitUserObj.password;
            delete submitUserObj.username;
            this._loadingSvc.setValue(true);
            this.userService.updateProfile(submitUserObj).then((res) => {
                localStorage.setItem("user_info", JSON.stringify(res));
                this.authService.setUser(res);
                raven_index_1.Notification.notySuccessMessage("Successfully updated your profile.");
                this._loadingSvc.setValue(false);
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("Your profile could not be updated with received data.");
            });
        }
    }
    goBack() {
        this.location.back();
    }
};
UpdateProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-update-profile',
        templateUrl: './update-profile.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.UserService,
        raven_index_1.AuthService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location,
        raven_index_1.LoadingIndicatorService])
], UpdateProfileComponent);
exports.UpdateProfileComponent = UpdateProfileComponent;
//# sourceMappingURL=update-profile.component.js.map