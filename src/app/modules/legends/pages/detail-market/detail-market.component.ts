// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'detail-market-component',
	styleUrls: ['./detail-market.component.scss'],
	templateUrl: './detail-market.component.html',
})
export class DetailMarketComponent implements OnInit {
	constructor(private route: ActivatedRoute) {}
	private id: any = null;
	public ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params.id;
		});
	}
}
