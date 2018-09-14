// Modules
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { HeadertModule, TabsModule, CardModule, FooterModule, ElementsModule } from '../../../cross';

// Components
import { DetailMarketComponent } from './detail-market.component';
import { DetailMarketRouter } from './detail-market.router';
import { AppModuleProviders } from '../../providers/providers.module';
import { AvatarComponent } from './avatar/avatar.component';

@NgModule({
	declarations: [DetailMarketComponent, AvatarComponent],
	imports: [
		CommonModule,
		DetailMarketRouter,
		HeadertModule,
		TabsModule,
		CardModule,
		AppModuleProviders,
		FooterModule,
		ElementsModule,
	],
})
export class DetailMarketModule {}
