import { RouterModule } from '@angular/router';
import { MarketComponent } from './market.component';

export const MarketRouter = RouterModule.forChild([
	{
		path: '',
		component: MarketComponent,
	},
]);
