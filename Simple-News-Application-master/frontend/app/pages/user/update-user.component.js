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
let UpdateUserComponent = class UpdateUserComponent {
    constructor(userService, route, router, location, _loadingSvc) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this._loadingSvc = _loadingSvc;
        this.isSubmited = false;
    }
    ngOnInit() {
        this.route.params
            .switchMap((params) => this.userService.getUser(params['id']))
            .subscribe(user => {
            this.user = new raven_index_1.User("", "");
            for (var key in user)
                this.user[key] = user[key];
        });
    }
    ngAfterViewInit() {
    }
    onSubmit() {
        this.isSubmited = true;
        if (this.user.isNameValid().stat && this.user.isPhoneNumberValid().stat) {
            this._loadingSvc.setValue(true);
            delete this.user.password;
            this.userService.update(this.user).then(() => {
                raven_index_1.Notification.notySuccessMessage("Successfully updated user account with username: " + this.user.username);
                this._loadingSvc.setValue(false);
                this.router.navigate(['/users']);
            }).catch(() => {
                this._loadingSvc.setValue(false);
                raven_index_1.Notification.notyErrorMessage("Account could not be updated with received data.");
            });
        }
    }
    goBack() {
        this.location.back();
    }
};
UpdateUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'raven-update-user',
        templateUrl: './update-user.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location,
        raven_index_1.LoadingIndicatorService])
], UpdateUserComponent);
exports.UpdateUserComponent = UpdateUserComponent;
//# sourceMappingURL=update-user.component.js.map