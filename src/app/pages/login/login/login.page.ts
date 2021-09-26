import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public data = {
    correo: '',
    password: '',
  };
  mensaje = null;
  constructor(private nav: NavController) {}

  ngOnInit() {}

  ingresar() {
  }
  registro() {
    this.nav.navigateRoot('login/registro');
  }
  loginRepartidor() {
    this.nav.navigateRoot('login/loginRepartidor');

  }
}
