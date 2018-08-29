import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Constants
import CONSTANTS from '@legends/constants';

// Interface
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CardsProvider {
	constructor(public http: HttpClient) {}

	public getBeastsMarketPlace(): Observable<any> {
		return this.http.get(`${CONSTANTS.ENDPOINT}${CONSTANTS.SERVICE.MARKET_PLACE_BEASTS}`);
	}

	public getPricing(url: string): Observable<any> {
		return this.http.get(url);
	}
}
