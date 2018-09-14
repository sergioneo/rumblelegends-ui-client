import { Injectable } from '@angular/core';
import { ELEMENTS } from './constants';
import { ElementsInterface } from './elements.interface';

@Injectable()
export class ElementsProvider {
	constructor() {}

	public getElements(idElement): ElementsInterface {
		return ELEMENTS.get(idElement);
	}
}
