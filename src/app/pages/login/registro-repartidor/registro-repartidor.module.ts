import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroRepartidorPageRoutingModule } from './registro-repartidor-routing.module';

import { RegistroRepartidorPage } from './registro-repartidor.page';
import { ComponentsModule } from 'src/app/core/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroRepartidorPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RegistroRepartidorPage],
})
export class RegistroRepartidorPageModule {}
