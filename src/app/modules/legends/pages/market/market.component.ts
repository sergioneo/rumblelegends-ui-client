// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { CardsProvider } from '../../providers';

@Component({
	selector: 'market-component',
	styleUrls: ['./market.component.scss'],
	templateUrl: './market.component.html',
})
export class MarketComponent implements OnInit {
	private cardsService: Array<any> = [];
	constructor(private cardsProvider: CardsProvider) {}
	public ngOnInit() {
		this.cardsProvider.getBeastsMarketPlace().subscribe(
			(data) => {
				this.cardsService = data.hits;
				console.log(this.cardsService);
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
