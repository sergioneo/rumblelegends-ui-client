// Angular dependencies
import { Component, OnInit, Input } from '@angular/core';
import { ElementsProvider } from './elements.providers';
import { ElementsInterface } from './elements.interface';

@Component({
	selector: 'elements-component',
	styleUrls: ['./elements.component.scss'],
	templateUrl: './elements.component.html',
})
export class ElementsComponent implements OnInit {
	@Input()
	private idElement: string;
	private elem: ElementsInterface;

	constructor(private elementsProvider: ElementsProvider) {}
	public ngOnInit() {
		this.elem = this.elementsProvider.getElements(this.idElement);
	}
}
