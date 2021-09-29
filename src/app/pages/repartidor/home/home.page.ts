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

  private irEntregas() {
    this.nav.navigateForward('repartidor/entregas');
  }
  private irCuenta() {
    this.nav.navigateForward('repartidor/perfil');

  }
  private irResenas() {
    this.nav.navigateForward('repartidor/resenas');

  }
}
