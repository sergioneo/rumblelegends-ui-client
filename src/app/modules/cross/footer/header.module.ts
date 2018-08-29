// Modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer.component';

@NgModule({
	declarations: [FooterComponent],
	exports: [FooterComponent],
	imports: [RouterModule],
})
export class FooterModule {}
