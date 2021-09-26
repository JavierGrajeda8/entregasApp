import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { MapaComponent } from 'src/app/core/components/mapa/mapa.component';
import { ConstStatus } from 'src/app/core/constants/constStatus';

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

  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private navParams: NavParams) {
    if (this.navParams.get('IdDireccion')){
      this.data.idDireccion = this.navParams.get('IdDireccion');
    }
  }

  ngOnInit() {}

  async elegirDestino() {
    let lat = 0.0;
    let lng = 0.0;
    if (this.data.origen) {
      lat = parseFloat(this.data.origen.split(',')[0]);
      lng = parseFloat(this.data.origen.split(',')[1]);
    }
    const mapaModal = await this.modalCtrl.create({
      component: MapaComponent,
      componentProps: { lat, lng },
    });
    mapaModal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log(data);
        this.data.latitud = parseFloat(data.data.latitud).toFixed(6).toString();
        this.data.longitud = parseFloat(data.data.longitud).toFixed(6).toString();
      }
    });
    mapaModal.present();
  }

  guardar() {
    if (!this.data.idDireccion){
      this.data.idDireccion = Date.now();
    }
    const pedido = {
      idDireccion: this.data.idDireccion,
      idSolicitante: null,
      latitud: this.data.latitud,
      longitud: this.data.longitud,
      direccion: this.data.direccion,
      nombre: this.data.nombre,
      tipo: null,
      idEstado: ConstStatus.activo,
      repartidor: null,
    };
  }

  cancelar() {
    this.navCtrl.pop();
  }
}
