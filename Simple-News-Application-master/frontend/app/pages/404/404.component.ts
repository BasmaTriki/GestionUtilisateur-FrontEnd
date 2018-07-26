import { Component, OnInit } from '@angular/core';
import { Location }               from '@angular/common';

@Component({
	selector: 'notfound',
	templateUrl: './404.component.html'
})
export class NotFoundComponent implements OnInit {

	constructor(
		private location: Location
	) {}

	ngOnInit() {
	}

	goBack(){
		this.location.back();
	}
}