import { Component,AfterViewInit, OnInit, animate, AnimationEntryMetadata, state, style, transition, trigger, NgZone } from '@angular/core';
import { MonarchUI, WindowRef } 		from './raven.index';
import { Router } 					from '@angular/router';

declare var $: JQueryStatic;

@Component({
	selector: 'body',
	templateUrl: './raven.component.html',
	host: {
		'(window:resize)': 'onResize($event)'
	},
})

export class RavenComponent implements AfterViewInit, OnInit {

	currentComponent: string = "";

	constructor(
		private monarchUI: MonarchUI,
		private zone: NgZone,
		private router: Router,
		private windowRef: WindowRef
	) {
		windowRef.nativeWindow.angularComponentRef = {
			zone: this.zone,
			componentFn: (value:any) => this.routeLink(value),
			component: this
		};
	}

	ngOnInit() {
		if (localStorage.getItem("page-header") != null) {
			this.monarchUI.setHeaderStyle(
				localStorage.getItem("page-header")
			);
		}

		if (localStorage.getItem("page-sidebar") != null) {
			this.monarchUI.setSidebarStyle(
				localStorage.getItem("page-sidebar")
			);
		}

	}

	ngAfterViewInit() {
		this.monarchUI.onLoad();
	}

	onResize(event: any) {
		this.monarchUI.onSizer();
	}

	routeLink(url: string){
		this.router.navigate([url]);
	}

}

