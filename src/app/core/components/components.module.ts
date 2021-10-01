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

@NgModule({
  declarations: [
    MapaComponent,
    ResenaComponent,
    PedidoDetalleComponent,
    HeaderComponent,
    StatusComponent,
    StatusPipe,
  ],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [
    MapaComponent,
    ResenaComponent,
    PedidoDetalleComponent,
    HeaderComponent,
    StatusComponent,
    StatusPipe,
  ],
})
export class ComponentsModule {}
