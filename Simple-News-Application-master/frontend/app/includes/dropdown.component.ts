import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

export class DropdownValue {
	value: string;
	label: string;

	constructor(value: string, label: string) {
		this.value = value;
		this.label = label;
	}
}

@Component({
	selector: 'raven-dropdown',
	templateUrl: './dropdown.component.html'
})

export class DropdownComponent {

	@Input()
	values: DropdownValue[];

	@Input()
	value: string[];

	@Output()
	valueChange: EventEmitter<any>;

	constructor(private elementRef: ElementRef) {
		this.valueChange = new EventEmitter();
	}

	select(value: any) {
		this.valueChange.emit(value);
	}
}
