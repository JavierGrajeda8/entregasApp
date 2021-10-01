import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
    private solicianteService: SolicitanteService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    const GPS_OPTIONS = { timeout: 10000 };
    this.geolocation.getCurrentPosition(GPS_OPTIONS);
  }

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
    this.nav.navigateRoot('registro');
  }
  private loginRepartidor() {
    this.nav.navigateRoot('loginRepartidor');
  }
}
