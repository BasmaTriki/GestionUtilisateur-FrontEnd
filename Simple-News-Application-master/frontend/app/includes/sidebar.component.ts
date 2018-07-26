import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MonarchUI, AuthService } 		from 'raven.index';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, AfterViewInit {
	constructor(
		private monarchUI: MonarchUI,
		private authService: AuthService
	) {}

	ngOnInit() {
		
	}

	ngAfterViewInit(){
		this.monarchUI.sidebarMenu();
	}
}