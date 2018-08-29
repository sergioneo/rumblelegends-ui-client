// Angular dependencies
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
	{
		path: '',
		loadChildren: './pages/home/home.module#HomeModule',
		data: { preload: true },
	},
	{
		path: 'market',
		loadChildren: './pages/market/market.module#MarketModule',
		data: { preload: true },
	},
];

export const LegendsRouter = RouterModule.forChild(ROUTES);
