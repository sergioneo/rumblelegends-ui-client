import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Constants
import CONSTANTS from '@legends/constants';

// Interface
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CardsProvider {
  private cachePage: Array<any> = [];
  constructor(public http: HttpClient) { }

  public getBeastsMarketPlace(page: number): Observable<any> {
    return this.http.get(`${CONSTANTS.ENDPOINT}${CONSTANTS.SERVICE.MARKET_PLACE_BEASTS}?page=${page}`);
  }

  public getDetailBeastsMarketPlace(id): Observable<any> {
    return this.http.get(`${CONSTANTS.ENDPOINT}${CONSTANTS.SERVICE.DETAIL_MARKET_PLACE_BEASTS}/${id}`);
  }

  public getMyItems(address): Observable<any> {
    return this.http.get(`${CONSTANTS.ENDPOINT_WALLET}${CONSTANTS.SERVICE.MY_ITEMS}/?address=${address}`);
  }

  public getPricing(url: string): Observable<any> {
    return this.http.get(url);
  }

  private validCachePage(): boolean {
    let valid;
    this.cachePage.map((value) => {
      valid = true;
    });

    return valid;
  }
}
