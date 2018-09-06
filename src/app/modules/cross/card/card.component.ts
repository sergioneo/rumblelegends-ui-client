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
	private eth: string = '-';
	private usd: string = '-';

	constructor(private cardsProvider: CardsProvider) {}
	public ngOnInit() {
		this.callPricing();
	}

	public callPricing() {
		this.cardsProvider.getPricing(this.card.pricing).subscribe(
			(data) => {
				this.eth = data.eth;
				this.usd = data.usd;
			},
			(err) => {}
		);
	}
}
