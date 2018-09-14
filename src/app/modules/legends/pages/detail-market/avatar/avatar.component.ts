// Angular dependencies
import { Component, OnInit, Input } from '@angular/core';
import { CardsProvider } from '../../../providers';

@Component({
	selector: 'avatar-component',
	styleUrls: ['./avatar.component.scss'],
	templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {
	@Input()
	private id: any = {};
	private detail: Object = {};
	private eth: string = '-';
	private usd: string = '-';

	constructor(private cardsProvider: CardsProvider) {}
	public ngOnInit() {
		this.cardsProvider.getDetailBeastsMarketPlace(this.id).subscribe(
			(data) => {
				this.detail = data;
				this.callPricing(data.pricing);
			},
			(err) => {
				console.log(err);
			}
		);
	}

	public callPricing(pricing) {
		this.cardsProvider.getPricing(pricing).subscribe(
			(data) => {
				this.eth = data.eth;
				this.usd = data.usd;
			},
			(err) => {}
		);
	}
}
