// Modules
import { NgModule } from '@angular/core';

// Providers
import { ContractsProviders, IndicatorsProvider } from './';
import { HttpClientInterceptor } from './interceptor/httpClient.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CardsProvider } from './cards/cards.providers';

@NgModule({
	imports: [HttpClientModule],
	providers: [
		ContractsProviders,
		IndicatorsProvider,
		CardsProvider,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpClientInterceptor,
			multi: true,
		},
	],
})
export class AppModuleProviders {}
