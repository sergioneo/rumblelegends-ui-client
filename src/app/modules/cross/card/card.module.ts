// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../legends/providers';
import { AppModuleProviders } from '../../legends/providers/providers.module';

@NgModule({
	imports: [CommonModule, AppModuleProviders, RouterModule],
	declarations: [CardComponent, SafeHtmlPipe],
	exports: [CardComponent],
})
export class CardModule {}
