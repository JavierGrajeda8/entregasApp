import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { ResenaComponent } from './resena/resena.component';
import { FormsModule } from '@angular/forms';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { HeaderComponent } from './common/header/header.component';
import { StatusComponent } from './common/status/status.component';
import { StatusPipe } from 'src/app/shared/pipes/status/status.pipe';
import { NextStepPipe } from 'src/app/shared/pipes/next-step/next-step.pipe';
import { PedidoHistorialComponent } from './pedido-historial/pedido-historial.component';

@NgModule({
  declarations: [
    MapaComponent,
    ResenaComponent,
    PedidoDetalleComponent,
    PedidoHistorialComponent,
    HeaderComponent,
    StatusComponent,
    StatusPipe,
    NextStepPipe,
  ],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [
    MapaComponent,
    ResenaComponent,
    PedidoDetalleComponent,
    HeaderComponent,
    StatusComponent,
    StatusPipe,
    NextStepPipe,
  ],
})
export class ComponentsModule {}
