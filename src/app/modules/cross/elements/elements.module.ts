// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementsComponent } from './elements.component';
import { ElementsProvider } from './elements.providers';

@NgModule({
	imports: [CommonModule],
	declarations: [ElementsComponent],
	exports: [ElementsComponent],
	providers: [ElementsProvider],
})
export class ElementsModule {}
