// Angular dependencies
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
	{
		path: 'market',
		loadChildren: './pages/market/market.module#MarketModule',
		data: { preload: true },
	},
	{
		path: 'detail-market/:id',
		loadChildren: './pages/detail-market/detail-market.module#DetailMarketModule',
		data: { preload: true },
	},
	{
		path: '',
		loadChildren: './pages/market/market.module#MarketModule',
		data: { preload: true },
	},
];

export const LegendsRouter = RouterModule.forChild(ROUTES);
