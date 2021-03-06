import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}

  private crear() {
    this.nav.navigateForward('solicitante/pedidos/crear');
  }
  private pedidosPendientes() {
    this.nav.navigateForward('solicitante/pedidos/pendientes');
  }
  private pedidosHistoricos() {
    this.nav.navigateForward('solicitante/pedidos/historico');
  }
}
