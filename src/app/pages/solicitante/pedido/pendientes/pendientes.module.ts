import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendientesPageRoutingModule } from './pendientes-routing.module';

import { PendientesPage } from './pendientes.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendientesPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PendientesPage],
  entryComponents: [PedidoDetalleComponent],
  providers: [Geolocation]
})
export class PendientesPageModule {}
