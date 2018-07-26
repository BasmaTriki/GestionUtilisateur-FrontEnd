import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { LoadingIndicatorService } from 'raven.index';

@Component({
	selector: 'loading-indicator',
	templateUrl: './loading-indicator.component.html',
	styleUrls: ['./loading-indicator.component.css'],
	animations: [
		trigger('loadingState', [
			state( 'inactive', style({
				opacity: 0,
				display: 'none'
			})),
			state('active',   style({
				opacity: 1,
			})),
			transition('active => inactive', animate('200ms ease-out')),
			transition('inactive => active', animate('0ms ease-in'))
		])
	]
})
export class LoadingIndicatorComponent implements OnInit {

	loadingState: string = 'inactive';

	constructor(private _loadingSvc: LoadingIndicatorService) {}

	ngOnInit(): void {
		this._loadingSvc.getValue().subscribe( (status: boolean) => {
			this.loadingState = status ? 'active' : 'inactive';
		});
	}
}