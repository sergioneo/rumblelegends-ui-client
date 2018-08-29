// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModuleProviders } from '../../providers/providers.module';

// Components
import { HomeComponent } from './home.component';
import { HomeRouter } from './home.router';
import { FormatAmountPipe } from '../../pipes/formatMonto.pipe';

@NgModule({
	declarations: [HomeComponent, FormatAmountPipe],
	imports: [HomeRouter, CommonModule, AppModuleProviders],
})
export class HomeModule {}
