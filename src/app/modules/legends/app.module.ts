// Angular dependencies
import { NgModule, InjectionToken } from '@angular/core';

// Routes
import { LegendsRouter } from './app.routes';

// State
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { LegendsModelModule } from './models/model.module';

import { AppModuleWebKit } from '../web-kit/keb-kit.module';
const APP_PROVIDERS = [...APP_RESOLVER_PROVIDERS];

require('web3');

@NgModule({
  imports: [LegendsRouter, LegendsModelModule, AppModuleWebKit],
  declarations: [],
  providers: [APP_PROVIDERS],
})
export class AppModuleBip { }
