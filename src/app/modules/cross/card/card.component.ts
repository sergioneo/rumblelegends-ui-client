// Angular dependencies
import { Component, OnInit, Input } from '@angular/core';
import { CardsProvider } from '../../legends/providers';

@Component({
	selector: 'card-component',
	styleUrls: ['./card.component.scss'],
	templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
	@Input()
	private card: any = {};

	constructor(private cardsProvider: CardsProvider) {}
	public ngOnInit() {
		this.callPricing();
	}

	public callPricing() {
		this.cardsProvider.getPricing(this.card.pricing).subscribe(
			(data) => {
				this.innerHtml(`ether-${this.card.id}`, `${data.eth} /`);
				this.innerHtml(`us-${this.card.id}`, `US $${data.usd}`);
			},
			(err) => {}
		);
	}

	innerHtml(value, price) {
		try {
			document.getElementById(value).innerHTML = price;
			document.getElementById(value).innerHTML = price;
		} catch (e) {
			console.log('no encontrò elementeo');
		}
	}
}
