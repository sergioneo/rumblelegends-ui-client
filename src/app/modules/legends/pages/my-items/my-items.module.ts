// Modules
import { NgModule } from '@angular/core';

// Modules
import { CommonModule } from '@angular/common';
import { HeadertModule, TabsModule, CardModule, FooterModule, ButtonsModule } from '../../../cross';

// Components

import { AppModuleProviders } from '../../providers/providers.module';
import { MyItemsComponent } from './my-items.component';
import { MyItemsRouter } from './my-items.router';

@NgModule({
  declarations: [MyItemsComponent],
  imports: [CommonModule, HeadertModule, TabsModule, CardModule, AppModuleProviders, FooterModule, MyItemsRouter, ButtonsModule],
})
export class MyItemsModule { }
