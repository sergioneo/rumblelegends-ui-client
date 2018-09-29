// Modules
import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [TabsComponent],
	exports: [TabsComponent],
	imports: [CommonModule],
})
export class TabsModule {}
