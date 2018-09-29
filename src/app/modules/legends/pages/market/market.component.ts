// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { CardsProvider } from '../../providers';
import CONSTANTS from '@legends/constants';
import { TabsInterface } from '../../../cross';

@Component({
	selector: 'market-component',
	styleUrls: ['./market.component.scss'],
	templateUrl: './market.component.html',
})
export class MarketComponent implements OnInit {
	private cardsService: Array<any> = [];
	private totalPagination = Array(0);
	private currentPage = 1;

	configParams: Array<TabsInterface> = [
		{
			name: 'Market',
			active: true,
		},
		{
			name: 'Auction',
			active: false,
		},
	];

	constructor(private cardsProvider: CardsProvider) {}
	public ngOnInit() {
		this.callService();
	}

	public callService() {
		this.cardsProvider.getBeastsMarketPlace(this.currentPage).subscribe(
			(data) => {
				this.cardsService = data.hits;
				this.totalPagination = Array(Math.ceil(data.found / CONSTANTS.COMMON.PAGINATION.TOTAL));
			},
			(err) => {
				console.log(err);
			}
		);
	}
	public setCurrentPage(page) {
		this.currentPage = page;
		this.cardsService = [];
		this.callService();
	}
}
