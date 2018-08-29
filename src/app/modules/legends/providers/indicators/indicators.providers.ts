import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Constants
import CONSTANTS from '@legends/constants';

// Interface
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IndicatorsProvider {
	constructor(public http: HttpClient) {}

	public getIndicatorsEtherCLP(): Observable<any> {
		return this.http.get(`${CONSTANTS.SERVICE.ETHER_CLP_DOLAR}`);
	}
}
