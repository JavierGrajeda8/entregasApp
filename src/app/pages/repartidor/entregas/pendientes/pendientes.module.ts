import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendientesPageRoutingModule } from './pendientes-routing.module';

import { PendientesPage } from './pendientes.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendientesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PendientesPage]
})
export class PendientesPageModule {}
