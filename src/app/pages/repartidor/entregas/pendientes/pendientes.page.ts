import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { Pedido } from 'src/app/core/interfaces/Pedido';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  private pedidos: Pedido[] = [];

  constructor(private modalCtrl: ModalController, private nav: NavController) { }

  ngOnInit() {
  }
  async mostrarDetalle(pedido: Pedido) {
    const detalle = await this.modalCtrl.create({
      component: PedidoDetalleComponent,
      componentProps: { idPedido: pedido.idPedido },
    });

    detalle.present();
  }

}
