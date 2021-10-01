import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { MapaComponent } from 'src/app/core/components/mapa/mapa.component';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Direccion } from 'src/app/core/interfaces/Direccion';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.page.html',
  styleUrls: ['./gestionar.page.scss'],
})
export class GestionarPage implements OnInit {
  public data = {
    direccion: '',
    latitud: null,
    longitud: null,
    nombre: '',
    origen: null,
    idDireccion: null,
  };

  private solicitante: Solicitante;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private storage: StorageService,
    private solicitanteService: SolicitanteService,
    private route: ActivatedRoute
  ) {
    if (this.navParams.get('IdDireccion')) {
      this.data.idDireccion = this.navParams.get('IdDireccion');
    }
  }

  ngOnInit() {
    this.storage
      .get(ConstStrings.str.storage.solicitante)
      .then((solicitante: string) => {
        this.solicitante = JSON.parse(solicitante) as Solicitante;
      });
    this.route.queryParams.subscribe((params) => {
      console.log('params', params);
      if (params.editar) {
        this.data.direccion = params.direccion;
        this.data.latitud = params.latitud;
        this.data.longitud = params.longitud;
        this.data.nombre = params.nombre;
        this.data.idDireccion = params.idDireccion;
        this.data.origen = this.data.latitud + ',' + this.data.longitud;
      }
    });
  }

  async elegirDestino() {
    let lat = 0.0;
    let lng = 0.0;
    if (this.data.origen) {
      lat = parseFloat(this.data.origen.split(',')[0]);
      lng = parseFloat(this.data.origen.split(',')[1]);
    }
    const mapaModal = await this.modalCtrl.create({
      component: MapaComponent,
      componentProps: { lat, lng, seguimiento: false, solicitante: true },
    });
    mapaModal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log(data);
        this.data.origen = data.data.latitud + ',' + data.data.longitud;
        this.data.latitud = parseFloat(data.data.latitud).toFixed(6).toString();
        this.data.longitud = parseFloat(data.data.longitud)
          .toFixed(6)
          .toString();
      }
    });
    mapaModal.present();
  }

  private guardar() {
    if (!this.data.idDireccion) {
      this.data.idDireccion = Date.now();
    }
    const direccion: Direccion = {
      idDireccion: this.data.idDireccion,
      idSolicitante: this.solicitante.idSolicitante,
      latitud: this.data.latitud,
      longitud: this.data.longitud,
      direccion: this.data.direccion,
      nombre: this.data.nombre,
      tipo: null,
      idEstado: ConstStatus.activo,
    };
    this.solicitanteService
      .setDireccion(direccion, this.solicitante.correo)
      .then(() => {
        this.navCtrl.pop();
      });
  }

  private cancelar() {
    this.navCtrl.pop();
  }
}
