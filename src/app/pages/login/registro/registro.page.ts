import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';
import { environment } from 'src/environments/environment.prod';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ConstStrings } from 'src/app/core/constants/constStrings';

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
  public mensaje = '';
  constructor(
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private storage: StorageService
  ) {}

  ngOnInit() {}

  private validarCorreo() {
    const regex = new RegExp(environment.ReExMail);
    this.data.correoValido = regex.test(this.data.correo);
  }

  private registrar() {
    this.mensaje = '';
    const solicitante: Solicitante = {
      nombre: this.data.nombre,
      correo: this.data.correo,
      password: this.data.password,
      idEstado: ConstStatus.activo,
      telefono: this.data.telefono,
      idSolicitante: this.data.correo,
    };
    this.solicitanteService
      .registrar(solicitante)
      .then(() => {
        this.nav.navigateRoot('solicitante');
      })
      .catch((error) => {
        this.mensaje = error;
      });
  }
  private login() {
    this.nav.navigateRoot('');
  }
  private registroRepartidor() {
    this.nav.navigateRoot('registroRepartidor');
  }
}
