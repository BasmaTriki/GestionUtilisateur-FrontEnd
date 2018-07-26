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
const raven_index_1 = require("raven.index");
function routerTransition() {
    return raven_index_1.slideToBottom();
}
let SimpleLayoutComponent = class SimpleLayoutComponent {
    constructor() { }
    ngOnInit() {
    }
};
SimpleLayoutComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'simple-layout',
        templateUrl: './simple-layout.component.html',
        styleUrls: ['./simple-layout.component.css'],
        encapsulation: core_1.ViewEncapsulation.None,
        animations: [routerTransition()],
        host: { '[@routerTransition]': '' }
    }),
    __metadata("design:paramtypes", [])
], SimpleLayoutComponent);
exports.SimpleLayoutComponent = SimpleLayoutComponent;
//# sourceMappingURL=simple-layout.component.js.map