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
let LoadingIndicatorComponent = class LoadingIndicatorComponent {
    constructor(_loadingSvc) {
        this._loadingSvc = _loadingSvc;
        this.loadingState = 'inactive';
    }
    ngOnInit() {
        this._loadingSvc.getValue().subscribe((status) => {
            this.loadingState = status ? 'active' : 'inactive';
        });
    }
};
LoadingIndicatorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'loading-indicator',
        templateUrl: './loading-indicator.component.html',
        styleUrls: ['./loading-indicator.component.css'],
        animations: [
            core_1.trigger('loadingState', [
                core_1.state('inactive', core_1.style({
                    opacity: 0,
                    display: 'none'
                })),
                core_1.state('active', core_1.style({
                    opacity: 1,
                })),
                core_1.transition('active => inactive', core_1.animate('200ms ease-out')),
                core_1.transition('inactive => active', core_1.animate('0ms ease-in'))
            ])
        ]
    }),
    __metadata("design:paramtypes", [raven_index_1.LoadingIndicatorService])
], LoadingIndicatorComponent);
exports.LoadingIndicatorComponent = LoadingIndicatorComponent;
//# sourceMappingURL=loading-indicator.component.js.map