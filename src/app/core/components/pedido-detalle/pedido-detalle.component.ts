import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedido } from '../../interfaces/Pedido';
import { MapaComponent } from '../mapa/mapa.component';
import { PedidoHistorialComponent } from '../pedido-historial/pedido-historial.component';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss'],
})
export class PedidoDetalleComponent implements OnInit {
  public pedido: Pedido;
  private solicitante = true;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ionViewWillEnter() {
    this.pedido = this.navParams.get('pedido');
    this.solicitante = this.navParams.get('solicitante');
    console.log('solicitante', this.navParams.get('solicitante'));
  }

  ionViewWillLeave() {}

  async verMapa() {
    const mapaModal = await this.modalCtrl.create({
      component: MapaComponent,
      componentProps: {
        lat: this.pedido.direccion.latitud,
        lng: this.pedido.direccion.longitud,
        lat0: this.pedido.latitud,
        lng0: this.pedido.longitud,
        seguimiento: true,
        solicitante: this.solicitante,
        pedido: this.pedido,
      },
    });

    mapaModal.present();
  }

  async verHistorial() {
    const mapaModal = await this.modalCtrl.create({
      component: PedidoHistorialComponent,
      componentProps: {
        pedido: this.pedido,
      },
    });

    mapaModal.present();
  }
}
