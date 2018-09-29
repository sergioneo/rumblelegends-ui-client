// Angular dependencies
import { Component, OnInit, Input } from '@angular/core';
import { CardsProvider } from '../../legends/providers';
import { ElementsProvider } from '../elements/elements.providers';

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
	private nameElement: string = '';

	constructor(private cardsProvider: CardsProvider, private elementsProvider: ElementsProvider) {}
	public ngOnInit() {
		this.callPricing();
	}

	public callPricing() {
		this.nameElement = this.elementsProvider.getElements(this.card.element).NAME;
		this.cardsProvider.getPricing(this.card.pricing).subscribe(
			(data) => {
				this.eth = data.eth;
				this.usd = data.usd;
			},
			(err) => {}
		);
	}
}
