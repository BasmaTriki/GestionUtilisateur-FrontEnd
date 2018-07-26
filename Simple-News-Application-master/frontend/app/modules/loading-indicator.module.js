"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const loading_indicator_service_1 = require("services/loading-indicator.service");
const loading_indicator_component_1 = require("includes/loading-indicator.component");
var loading_indicator_service_2 = require("services/loading-indicator.service");
exports.LoadingIndicatorService = loading_indicator_service_2.LoadingIndicatorService;
let LoadingIndicatorModule = LoadingIndicatorModule_1 = class LoadingIndicatorModule {
    static forRoot() {
        return {
            ngModule: LoadingIndicatorModule_1,
            providers: [loading_indicator_service_1.LoadingIndicatorService]
        };
    }
};
LoadingIndicatorModule = LoadingIndicatorModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            loading_indicator_component_1.LoadingIndicatorComponent
        ],
        imports: [common_1.CommonModule],
        exports: [loading_indicator_component_1.LoadingIndicatorComponent],
        providers: [loading_indicator_service_1.LoadingIndicatorService]
    })
], LoadingIndicatorModule);
exports.LoadingIndicatorModule = LoadingIndicatorModule;
var LoadingIndicatorModule_1;
//# sourceMappingURL=loading-indicator.module.js.map