import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatAmount',
})
export class FormatAmountPipe implements PipeTransform {
	transform(value: string): any {
		if (value != undefined) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		}

		return '';
	}
}
