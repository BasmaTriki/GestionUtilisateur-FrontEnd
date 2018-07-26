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
const raven_index_1 = require("./raven.index");
const router_1 = require("@angular/router");
let RavenComponent = class RavenComponent {
    constructor(monarchUI, zone, router, windowRef) {
        this.monarchUI = monarchUI;
        this.zone = zone;
        this.router = router;
        this.windowRef = windowRef;
        this.currentComponent = "";
        windowRef.nativeWindow.angularComponentRef = {
            zone: this.zone,
            componentFn: (value) => this.routeLink(value),
            component: this
        };
    }
    ngOnInit() {
        if (localStorage.getItem("page-header") != null) {
            this.monarchUI.setHeaderStyle(localStorage.getItem("page-header"));
        }
        if (localStorage.getItem("page-sidebar") != null) {
            this.monarchUI.setSidebarStyle(localStorage.getItem("page-sidebar"));
        }
    }
    ngAfterViewInit() {
        this.monarchUI.onLoad();
    }
    onResize(event) {
        this.monarchUI.onSizer();
    }
    routeLink(url) {
        this.router.navigate([url]);
    }
};
RavenComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'body',
        templateUrl: './raven.component.html',
        host: {
            '(window:resize)': 'onResize($event)'
        },
    }),
    __metadata("design:paramtypes", [raven_index_1.MonarchUI,
        core_1.NgZone,
        router_1.Router,
        raven_index_1.WindowRef])
], RavenComponent);
exports.RavenComponent = RavenComponent;
//# sourceMappingURL=raven.component.js.map