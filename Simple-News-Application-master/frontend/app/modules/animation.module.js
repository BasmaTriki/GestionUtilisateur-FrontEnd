"use strict";
const core_1 = require("@angular/core");
function fadeInOut() {
    return core_1.trigger('routerTransition', [
        core_1.transition(':enter', [
            core_1.style({ opacity: 0 }),
            core_1.animate('2000ms', core_1.style({ opacity: 1 }))
        ]),
        core_1.transition(':leave', [
            core_1.animate('2000ms', core_1.style({ opacity: 0 }))
        ])
    ]);
}
exports.fadeInOut = fadeInOut;
function slideToRight() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '100%' })),
        core_1.state('*', core_1.style({ position: 'fixed', width: '100%' })),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateX(-100%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateX(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(100%)' }))
        ])
    ]);
}
exports.slideToRight = slideToRight;
function slideToLeft() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '100%' })),
        core_1.state('*', core_1.style({})),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateX(100%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateX(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateX(-100%)' }))
        ])
    ]);
}
exports.slideToLeft = slideToLeft;
function slideToBottom() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.state('*', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateY(-100%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateY(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(100%)' }))
        ])
    ]);
}
exports.slideToBottom = slideToBottom;
function slideToTop() {
    return core_1.trigger('routerTransition', [
        core_1.state('void', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.state('*', core_1.style({ position: 'fixed', width: '100%', height: '100%' })),
        core_1.transition(':enter', [
            core_1.style({ transform: 'translateY(100%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(0%)' }))
        ]),
        core_1.transition(':leave', [
            core_1.style({ transform: 'translateY(0%)' }),
            core_1.animate('0.5s ease-in-out', core_1.style({ transform: 'translateY(-100%)' }))
        ])
    ]);
}
exports.slideToTop = slideToTop;
//# sourceMappingURL=animation.module.js.map