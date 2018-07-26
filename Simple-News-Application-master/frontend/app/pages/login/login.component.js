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
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const raven_index_1 = require("raven.index");
let LoginComponent = class LoginComponent {
    constructor(authService, location, router, _loadingSvc) {
        this.authService = authService;
        this.location = location;
        this.router = router;
        this._loadingSvc = _loadingSvc;
        this.model = new raven_index_1.User("", "");
    }
    ngOnInit() {
        this._loadingSvc.setValue(true);
    }
    onSubmit() {
        this._loadingSvc.setValue(true);
        this.authService.login(this.model.username, this.model.password)
            .then(() => {
            this.router.navigate(['/']);
        })
            .catch(() => {
            this.errorMessage = "Login information incorrect. Try again";
        })
            .then(() => {
            this._loadingSvc.setValue(false);
        });
    }
    onClose() {
        this.location.back();
    }
};
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-login',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [raven_index_1.AuthService,
        common_1.Location,
        router_1.Router,
        raven_index_1.LoadingIndicatorService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map