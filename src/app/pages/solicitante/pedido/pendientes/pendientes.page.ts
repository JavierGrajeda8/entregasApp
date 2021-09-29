import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { ResenaComponent } from 'src/app/core/components/resena/resena.component';
import { Pedido } from 'src/app/core/interfaces/Pedido';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  private pedidos: Pedido[] = [];
  constructor(private modalCtrl: ModalController, private nav: NavController) {}

  ngOnInit() {
    this.pedidos.push({
      idPedido: 1,
      idRepartidor: 1,
      idSolicitante: 1,
      direccionDetalle: 'string',
      descripcion: 'string',
      comentarios: 'string',
      costo: 0.0,
      latitud: 0,
      longitud: 0,
      idEstado: 1,
    });
  }

  async mostrarDetalle(pedido: Pedido) {
    const detalle = await this.modalCtrl.create({
      component: PedidoDetalleComponent,
      componentProps: { idPedido: pedido.idPedido },
    });

    detalle.present();
  }

  private crear() {
    this.nav.navigateForward('solicitante/pedidos/crear');
  }
}
