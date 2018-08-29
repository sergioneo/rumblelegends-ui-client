// Angular dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppCustomPreloader } from './app.outing.loader';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Components
import { AppRootComponent } from './app.component';

// Principal routes
import { ROUTES } from './app.routes';

const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS, AppState];

type StoreType = {
	state: InternalStateType;
	restoreInputValues: () => void;
	disposeOldHosts: () => void;
};

@NgModule({
	bootstrap: [AppRootComponent],
	declarations: [AppRootComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(ROUTES, {
			useHash: Boolean(history.pushState) === false,
			preloadingStrategy: AppCustomPreloader,
		}),
	],
	providers: [APP_PROVIDERS, AppCustomPreloader],
})
export class AppModule {}
