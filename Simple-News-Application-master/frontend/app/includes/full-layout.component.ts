import { Component, AfterViewInit, OnInit } from '@angular/core';
import { slideToLeft } 		from 'raven.index';

export function routerTransition() {
	return slideToLeft();
}

@Component({
	selector: 'full-layout',
	templateUrl: './full-layout.component.html',
	animations: [routerTransition()],
	host: {'[@routerTransition]': ''}
})
export class FullLayoutComponent implements OnInit, AfterViewInit {
	constructor() {}

	ngOnInit() {
		
	}

	ngAfterViewInit(){
		
	}
}