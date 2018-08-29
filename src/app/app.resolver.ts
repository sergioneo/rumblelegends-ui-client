import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs/observable/of';

@Injectable()
export class DataResolver implements Resolve<any> {
	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return of({ res: 'I am data' });
	}
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [DataResolver];
