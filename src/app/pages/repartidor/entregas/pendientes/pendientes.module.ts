import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendientesPageRoutingModule } from './pendientes-routing.module';

import { PendientesPage } from './pendientes.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { CommonModule } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendientesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PendientesPage],
  providers: [Geolocation]
})
export class PendientesPageModule {}
