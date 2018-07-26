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
let MonarchUI = class MonarchUI {
    constructor() { }
    onLoad() {
        this.initSetting();
        this.widgetInit();
        this.body_sizer();
        this.sidebarToggle();
        this.pageTransitions();
        this.dropdownSmooth();
        this.settingBar();
        this.swither_resizer();
    }
    onSizer() {
        this.body_sizer();
        this.swither_resizer();
    }
    initSetting() {
        if (localStorage.getItem("body-class") != null) {
            $('body').addClass(localStorage.getItem("body-class"));
        }
        if ($('body').hasClass('closed-sidebar')) {
            $('#closed-sidebar').prop("checked", true);
        }
        if ($('body').hasClass('fixed-sidebar')) {
            $('#fixed-sidebar').prop("checked", true);
        }
        if ($('body').hasClass('fixed-header')) {
            $('#fixed-header').prop("checked", true);
        }
        if ($('body').hasClass('boxed-layout')) {
            $('#boxed-layout').prop("checked", true);
        }
    }
    body_sizer() {
        if ($('body').hasClass('fixed-sidebar')) {
            var windowHeight = $(window).height();
            var headerHeight = $('#page-header').height();
            var contentHeight = windowHeight - headerHeight;
            $('#page-sidebar').css('height', contentHeight);
            $('.scroll-sidebar').css('height', contentHeight);
            $('#page-content').css('min-height', contentHeight);
        }
        else {
            var windowHeight = $(document).height();
            var headerHeight = $('#page-header').height();
            var contentHeight = windowHeight - headerHeight;
            $('#page-sidebar').css('height', contentHeight);
            $('.scroll-sidebar').css('height', contentHeight);
            $('#page-content').css('min-height', contentHeight);
        }
    }
    pageTransitions() {
        var transitions = ['.pt-page-moveFromLeft', 'pt-page-moveFromRight', 'pt-page-moveFromTop', 'pt-page-moveFromBottom', 'pt-page-fade', 'pt-page-moveFromLeftFade', 'pt-page-moveFromRightFade', 'pt-page-moveFromTopFade', 'pt-page-moveFromBottomFade', 'pt-page-scaleUp', 'pt-page-scaleUpCenter', 'pt-page-flipInLeft', 'pt-page-flipInRight', 'pt-page-flipInBottom', 'pt-page-flipInTop', 'pt-page-rotatePullRight', 'pt-page-rotatePullLeft', 'pt-page-rotatePullTop', 'pt-page-rotatePullBottom', 'pt-page-rotateUnfoldLeft', 'pt-page-rotateUnfoldRight', 'pt-page-rotateUnfoldTop', 'pt-page-rotateUnfoldBottom'];
        for (var i in transitions) {
            var transition_name = transitions[i];
            if ($('.add-transition').hasClass(transition_name)) {
                $('.add-transition').addClass(transition_name + '-init page-transition');
                setTimeout(function () {
                    $('.add-transition').removeClass(transition_name + ' ' + transition_name + '-init page-transition');
                }, 1200);
                return;
            }
        }
    }
    sidebarToggle() {
        $("div[id='#fixed-sidebar']").on('click', function () {
            if ($(this).hasClass("switch-on")) {
                var windowHeight = $(window).height();
                var headerHeight = $('#page-header').height();
                var contentHeight = windowHeight - headerHeight;
                $('#page-sidebar').css('height', contentHeight);
                $('.scroll-sidebar').css('height', contentHeight);
                $('.scroll-sidebar').slimscroll({
                    height: '100%',
                    color: 'rgba(155, 164, 169, 0.68)',
                    size: '6px'
                });
                var headerBg = $('#page-header').attr('class');
                $('#header-logo').addClass(headerBg);
            }
            else {
                var windowHeight = $(document).height();
                var headerHeight = $('#page-header').height();
                var contentHeight = windowHeight - headerHeight;
                $('#page-sidebar').css('height', contentHeight);
                $('.scroll-sidebar').css('height', contentHeight);
                $(".scroll-sidebar").slimScroll({
                    destroy: true
                });
                $('#header-logo').removeClass('bg-gradient-9');
            }
        });
    }
    sidebarMenu() {
        $('#sidebar-menu').superclick({
            animation: {
                height: 'show'
            },
            animationOut: {
                height: 'hide'
            }
        });
        var pathArr = window.location.pathname.split('/');
        var path = pathArr[pathArr.length - 1];
        if (path !== undefined) {
            $("#sidebar-menu").find("a[href$='" + path + "']").addClass('sfActive');
            $("#sidebar-menu").find("a[href$='" + path + "']").parents().eq(3).superclick('show');
        }
        $('#close-sidebar').click(function () {
            $('body').toggleClass('closed-sidebar');
            $('.glyph-icon', this).toggleClass('icon-angle-right').toggleClass('icon-angle-left');
        });
    }
    dropdownSmooth() {
        $('.dropdown').on('show.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        });
        $('.dropdown').on('hide.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        });
    }
    settingBar() {
        $(".theme-switcher").click(function () {
            $("#theme-options").toggleClass('active');
        });
        $('#theme-switcher-wrapper .switch-toggle').on('click', this, function () {
            var dataToggle = $(this).prev().attr('data-toggletarget');
            $('body').toggleClass(dataToggle);
            localStorage.setItem("body-class", $('body').attr("class"));
            if (dataToggle = 'closed-sidebar') {
                $('#close-sidebar .glyph-icon').toggleClass('icon-angle-right').toggleClass('icon-angle-left');
            }
        });
        $('.switch-toggle[id="#boxed-layout"]').click(function () {
            if ($('#boxed-layout').attr("checked")) {
                $('.boxed-bg-wrapper').slideDown();
            }
            else {
                $('.boxed-bg-wrapper').slideUp();
            }
            localStorage.setItem("boxed-layout", $('#boxed-layout').attr("checked"));
        });
        $('.scroll-switcher').slimscroll({
            height: '100%',
            color: 'rgba(0,0,0,0.3)',
            size: '10px',
            alwaysVisible: true
        });
        $('.set-adminheader-style').click(function () {
            $('.set-adminheader-style').removeClass('active');
            $(this).addClass('active');
            var newBg = $(this).attr('data-header-bg');
            $("#page-header").removeClass(function (index, css) {
                return (css.match(/(^|\s)bg-\S+/g) || []).join(' ');
            });
            $("#page-header").removeClass(function (index, css) {
                return (css.match(/(^|\s)font-\S+/g) || []).join(' ');
            });
            $('#page-header').addClass(newBg);
            localStorage.setItem("page-header", newBg);
        });
        $('.set-sidebar-style').click(function () {
            $('.set-sidebar-style').removeClass('active');
            $(this).addClass('active');
            var newBg = $(this).attr('data-header-bg');
            $("#page-sidebar").removeClass(function (index, css) {
                return (css.match(/(^|\s)bg-\S+/g) || []).join(' ');
            });
            $("#page-sidebar").removeClass(function (index, css) {
                return (css.match(/(^|\s)font-\S+/g) || []).join(' ');
            });
            $('#page-sidebar').addClass(newBg);
            localStorage.setItem("page-sidebar", newBg);
        });
    }
    setHeaderStyle(newBg) {
        $("#page-header").removeClass(function (index, css) {
            return (css.match(/(^|\s)bg-\S+/g) || []).join(' ');
        });
        $("#page-header").removeClass(function (index, css) {
            return (css.match(/(^|\s)font-\S+/g) || []).join(' ');
        });
        $('#page-header').addClass(newBg);
    }
    setSidebarStyle(newBg) {
        $("#page-sidebar").removeClass(function (index, css) {
            return (css.match(/(^|\s)bg-\S+/g) || []).join(' ');
        });
        $("#page-sidebar").removeClass(function (index, css) {
            return (css.match(/(^|\s)font-\S+/g) || []).join(' ');
        });
        $('#page-sidebar').addClass(newBg);
    }
    swither_resizer() {
        var windowHeight = $(window).height();
        $('#theme-switcher-wrapper').height(windowHeight / 1.4);
    }
    widgetInit() {
        $(function () {
            "use strict";
            $('a[href="#"]').click(function (event) {
                event.preventDefault();
            });
        });
        $(function () {
            "use strict";
            $(".todo-box li input").on('click', function () {
                $(this).parent().toggleClass('todo-done');
            });
        });
        $(function () {
            "use strict";
            var overall_width = 0;
            $('.timeline-scroll .tl-row').each(function (index, elem) {
                var $elem = $(elem);
                overall_width += $elem.outerWidth() + parseInt($elem.css('margin-left'), 10) + parseInt($elem.css('margin-right'), 10);
            });
            $('.timeline-horizontal', this).width(overall_width);
        });
        $(function () {
            "use strict";
            $('.input-switch-alt').simpleCheckbox();
        });
        $(function () {
            "use strict";
            $('.scrollable-slim').slimScroll({
                color: '#8da0aa',
                size: '10px',
                alwaysVisible: true
            });
        });
        $(function () {
            "use strict";
            $('.scrollable-slim-sidebar').slimScroll({
                color: '#8da0aa',
                size: '10px',
                height: '100%',
                alwaysVisible: true
            });
        });
        $(function () {
            "use strict";
            $('.scrollable-slim-box').slimScroll({
                color: '#8da0aa',
                size: '6px',
                alwaysVisible: false
            });
        });
        $(function () {
            "use strict";
            $('.loading-button').click(function () {
                var btn = $(this);
                btn.button('loading');
            });
        });
        $(function () {
            "use strict";
            $('.tooltip-button').tooltip({
                container: 'body'
            });
        });
        $(function () {
            "use strict";
            $('.alert-close-btn').click(function () {
                $(this).parent().addClass('animated fadeOutDown');
            });
        });
        $(function () {
            "use strict";
            $('.popover-button').popover({
                container: 'body',
                html: true,
                animation: true,
                content: function () {
                    var dataID = $(this).attr('data-id');
                    return $(dataID).html();
                }
            }).click(function (evt) {
                evt.preventDefault();
            });
        });
        $(function () {
            "use strict";
            $('.popover-button-default').popover({
                container: 'body',
                html: true,
                animation: true
            }).click(function (evt) {
                evt.preventDefault();
            });
        });
        var mUIColors = {
            'default': '#3498db',
            'gray': '#d6dde2',
            'primary': '#00bca4',
            'success': '#2ecc71',
            'warning': '#e67e22',
            'danger': '#e74c3c',
            'info': '#3498db'
        };
        var getUIColor = function (name) {
            if (mUIColors[name]) {
                return mUIColors[name];
            }
            else {
                return mUIColors['default'];
            }
        };
    }
};
MonarchUI = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], MonarchUI);
exports.MonarchUI = MonarchUI;
//# sourceMappingURL=monarch.module.js.map