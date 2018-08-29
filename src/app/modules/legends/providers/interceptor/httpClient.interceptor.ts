import { Injectable, Injector } from '@angular/core';
import { finalize, tap, map } from 'rxjs/operators';

import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpHeaders,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { AppsModel } from '../../models';
import { filter } from 'rxjs/operator/filter';
import CONSTANTS from '@bip/constants';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
	constructor(private appsModel: AppsModel) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next
			.handle(req)
			.map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					return event.clone({ body: event.body });
				}

				return event;
			})
			.pipe(
				tap(
					(event: HttpEvent<any>) => {},
					(err: any) => {
						if (err instanceof HttpErrorResponse) {
							throw Observable.throw(err);
						}
					}
				),
				finalize(() => {})
			);
	}
}
