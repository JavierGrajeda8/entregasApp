import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RepartidorService } from 'src/app/core/services/repartidor/repartidor.service';

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
  private mensaje = null;
  constructor(
    private nav: NavController,
    private repartidorService: RepartidorService
  ) {}

  ngOnInit() {}

  private ingresar() {
    this.repartidorService
      .login(this.data.correo, this.data.password)
      .then((usuario: any) => {
        this.nav.navigateRoot('solicitante');
        console.log('usuario', usuario.data());
      })
      .catch((error) => {
        console.log('error', error);
        this.mensaje = 'El nombre de usuario o contraseña no son correctos';
      });
  }
  private registro() {
    this.nav.navigateRoot('login/registroRepartidor');
  }
  private loginSolicitante() {
    this.nav.navigateRoot('login');
  }
}
