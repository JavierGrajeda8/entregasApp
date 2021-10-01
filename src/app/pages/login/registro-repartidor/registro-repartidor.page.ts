import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Repartidor } from 'src/app/core/interfaces/Repartidor';
import { RepartidorService } from 'src/app/core/services/registro/registro.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-registro-repartidor',
  templateUrl: './registro-repartidor.page.html',
  styleUrls: ['./registro-repartidor.page.scss'],
})
export class RegistroRepartidorPage implements OnInit {
  public data = {
    nombre: '',
    telefono: null,
    correo: '',
    correoValido: false,
    password: '',
    rePassword: '',
  };
  public mensaje = '';
  constructor(
    private nav: NavController,
    private repartidorService: RepartidorService,
    private storage: StorageService
  ) {}

  ngOnInit() {}

  private validarCorreo() {
    const regex = new RegExp(environment.ReExMail);
    this.data.correoValido = regex.test(this.data.correo);
  }

  private registrar() {
    this.mensaje = '';
    const repartidor: Repartidor = {
      nombre: this.data.nombre,
      correo: this.data.correo,
      password: this.data.password,
      idEstado: ConstStatus.activo,
      telefono: this.data.telefono,
      idRepartidor: Date.now(),
    };
    this.repartidorService
      .registrar(repartidor)
      .then(() => {
        this.storage.set(
          ConstStrings.str.storage.repartidor,
          JSON.stringify(repartidor)
        );
        this.nav.navigateRoot('repartidor');
      })
      .catch((error) => {
        this.mensaje = error;
      });
  }

  private login() {
    this.nav.navigateRoot('loginRepartidor');
  }
  private registroSolicitante() {
    this.nav.navigateRoot('registro');
  }
}
