import { RouterModule } from '@angular/router';
import { DetailMarketComponent } from './detail-market.component';

export const DetailMarketRouter = RouterModule.forChild([
	{
		path: '',
		component: DetailMarketComponent,
	},
]);
