// Modules
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [HeaderComponent],
	exports: [HeaderComponent],
	imports: [RouterModule],
})
export class HeadertModule {}
