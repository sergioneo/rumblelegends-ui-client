// Modules
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { HeadertModule, TabsModule, CardModule, FooterModule } from '../../../cross';

// Components
import { MarketComponent } from './market.component';
import { MarketRouter } from './market.router';
import { AppModuleProviders } from '../../providers/providers.module';

@NgModule({
	declarations: [MarketComponent],
	imports: [CommonModule, MarketRouter, HeadertModule, TabsModule, CardModule, AppModuleProviders, FooterModule],
})
export class MarketModule {}
