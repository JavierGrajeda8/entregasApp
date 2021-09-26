import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-repartidor',
  templateUrl: './login-repartidor.page.html',
  styleUrls: ['./login-repartidor.page.scss'],
})
export class LoginRepartidorPage implements OnInit {
  public data = {
    correo: '',
    password: '',
  };
  mensaje = null;
  constructor(private nav: NavController) {}

  ngOnInit() {}

  ingresar() {}
  registro() {
    this.nav.navigateRoot('login/registroRepartidor');
  }
  loginSolicitante() {
    this.nav.navigateRoot('login');
  }
}
