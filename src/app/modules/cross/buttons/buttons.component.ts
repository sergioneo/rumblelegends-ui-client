// Angular dependencies
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'buttons-component',
	styleUrls: ['./buttons.component.scss'],
	templateUrl: './buttons.component.html',
})
export class ButtonsComponent implements OnInit {
	@Input()
	private name: string = '';
	@Input()
	private callback: any;

	constructor() {}
	public ngOnInit() {}

	public runCall() {
		if (typeof this.callback === 'function') {
			this.callback();
		}
	}
}
