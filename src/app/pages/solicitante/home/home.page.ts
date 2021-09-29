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

  private irPedidos() {
    this.nav.navigateForward('solicitante/pedidos');
  }
  private irCuenta() {
    this.nav.navigateForward('solicitante/perfil');
  }
  private irDirecciones() {
    this.nav.navigateForward('solicitante/direccion');
  }
}
