import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  private pedidosPendientes() {
    this.nav.navigateForward('repartidor/entregas/pendientes');
  }
  private pedidosHistoricos() {
    this.nav.navigateForward('repartidor/entregas/historico');
  }
}
