import { RouterModule } from '@angular/router';
import { MyItemsComponent } from './my-items.component';

export const MyItemsRouter = RouterModule.forChild([
	{
		path: '',
		component: MyItemsComponent,
	},
]);
