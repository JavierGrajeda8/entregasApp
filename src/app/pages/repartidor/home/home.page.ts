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

  irEntregas() {
    this.nav.navigateForward('repartidor/entregas');
  }
  irCuenta() {
    this.nav.navigateForward('repartidor/perfil');

  }
  irResenas() {
    this.nav.navigateForward('repartidor/resenas');

  }
}
