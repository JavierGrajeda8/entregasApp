import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public data = {
    nombre: '',
    telefono: null,
    correo: '',
    correoValido: false,
    password: '',
    rePassword: '',
  };
  constructor(private nav: NavController) {}

  ngOnInit() {}

  validarCorreo() {
    const regex = new RegExp(environment.ReExMail);
    this.data.correoValido = regex.test(this.data.correo);
  }

  registrar() {}
  login() {
    this.nav.navigateRoot('login');
  }
  registroRepartidor() {
    this.nav.navigateRoot('login/registroRepartidor');
  }
}
