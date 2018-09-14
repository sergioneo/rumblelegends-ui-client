// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { AppModuleProviders } from '../../legends/providers/providers.module';
import { ElementsModule } from '../elements/elements.module';

@NgModule({
	imports: [CommonModule, AppModuleProviders, RouterModule, ElementsModule],
	declarations: [CardComponent],
	exports: [CardComponent],
})
export class CardModule {}
