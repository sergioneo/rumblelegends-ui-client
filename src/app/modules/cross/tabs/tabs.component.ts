// Angular dependencies
import { Component, OnInit, Input } from '@angular/core';
import { TabsInterface } from './tabs.interface';

@Component({
	selector: 'tabs-component',
	styleUrls: ['./tabs.component.scss'],
	templateUrl: './tabs.component.html',
})
export class TabsComponent implements OnInit {
	@Input()
	private configParams: Array<TabsInterface>;
	constructor() {}
	public ngOnInit() {
		console.log(this.configParams);
	}
}
