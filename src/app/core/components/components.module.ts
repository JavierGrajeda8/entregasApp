import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { ResenaComponent } from './resena/resena.component';
import { FormsModule } from '@angular/forms';
import { PedidoDetalleComponent } from './pedido-detalle/pedido-detalle.component';
import { HeaderComponent } from './common/header/header.component';

@NgModule({
  declarations: [MapaComponent, ResenaComponent, PedidoDetalleComponent, HeaderComponent],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [MapaComponent, ResenaComponent, PedidoDetalleComponent,HeaderComponent],
})
export class ComponentsModule {}
