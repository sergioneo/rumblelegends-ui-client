// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { TabsInterface } from '../../../cross';

@Component({
	selector: 'my-items-component',
	styleUrls: ['./my-items.component.scss'],
	templateUrl: './my-items.component.html',
})
export class MyItemsComponent implements OnInit {
	configParams: Array<TabsInterface> = [
		{
			name: 'Characters',
			active: true,
		},
		{
			name: 'Eggs',
			active: false,
		},
		{
			name: 'Broxes',
			active: false,
		},
	];
	constructor() {}
	public ngOnInit() {}
}
