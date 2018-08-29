import { Routes } from '@angular/router';

export const ROUTES: Routes = [
	{
		path: '',
		loadChildren: './modules/legends/app.module#AppModuleBip',
		data: { preload: true },
	},
];
