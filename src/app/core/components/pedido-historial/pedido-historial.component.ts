import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Pedido } from '../../interfaces/Pedido';

@Component({
  selector: 'app-pedido-historial',
  templateUrl: './pedido-historial.component.html',
  styleUrls: ['./pedido-historial.component.scss'],
})
export class PedidoHistorialComponent implements OnInit {
  public pedido: Pedido;
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.navParams.get('pedido'));
    this.pedido = this.navParams.get('pedido');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }


}
