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
let Notification = class Notification {
    constructor() { }
    static notySuccessMessage(message) {
        noty({
            text: message,
            type: 'success',
            dismissQueue: true,
            theme: 'agileUI',
            layout: 'top',
            timeout: 4000
        });
    }
    static notyErrorMessage(message) {
        noty({
            text: message,
            type: 'error',
            dismissQueue: true,
            theme: 'agileUI',
            layout: 'top',
            timeout: 4000
        });
    }
    static notyConfirmMessage(message, callback) {
        noty({
            text: message,
            type: 'information',
            layout: 'center',
            theme: 'agileUI',
            buttons: [
                {
                    addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                        $noty.close();
                        callback();
                    }
                },
                {
                    addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                        $noty.close();
                    }
                }
            ]
        });
    }
    static toastSuccessMessage(message) {
        $.jGrowl(message, {
            sticky: false,
            position: 'bottom-right',
            theme: 'bg-green'
        });
    }
    static toastErrorMessage(message) {
        $.jGrowl(message, {
            sticky: false,
            position: 'bottom-right',
            theme: 'bg-red'
        });
    }
};
Notification = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.module.js.map