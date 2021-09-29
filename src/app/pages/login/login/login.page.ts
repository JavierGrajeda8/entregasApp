import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';

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
  public mensaje = null;
  constructor(
    private nav: NavController,
    private solicianteService: SolicitanteService
  ) {}

  ngOnInit() {}

  private ingresar() {
    this.solicianteService
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
    this.nav.navigateRoot('login/registro');
  }
  private loginRepartidor() {
    this.nav.navigateRoot('login/loginRepartidor');
  }
}
