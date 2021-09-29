import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { now } from 'moment';
import { MapaComponent } from 'src/app/core/components/mapa/mapa.component';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { Direccion } from 'src/app/core/interfaces/Direccion';
import { Pedido } from 'src/app/core/interfaces/Pedido';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
})
export class CrearPage implements OnInit {
  public availableDateMin;
  public availableDateMax;
  public data = {
    direccion: null,
    direccionDetalle: '',
    destino: null,
    fechaEntrega: '',
    descripcion: '',
    costo: null,
    distancia: null,
    comentarios: '',
    repartidor: '',
    detalle: [
      { detalle: 'Caja de zapatos', cantidad: '1', id: '1632378600000' },
    ],
  };

  private direcciones: Direccion[] = [];
  private costoPorKilometro = 10.0;

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.setDates();
    this.cargarDirecciones();
  }

  async agregarDetalle() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar detalle',
      message:
        'Por favor ingresa una breve descripción del artículo y la cantidad a continuación:',
      inputs: [
        {
          name: 'detalle',
          type: 'textarea',
          placeholder: 'Agrega una breve descripción',
          attributes: {
            maxlength: 50,
          },
        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: '¿Cuántos llevaremos?',
          min: 1,
          max: 10,
          attributes: {
            max: 10,
          },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Agregar',
          handler: (data) => {
            console.log('Confirm Ok', data);
            this.data.detalle.push({
              detalle: data.detalle,
              cantidad: data.cantidad,
              id: now().toString(),
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarDetalle(detalle) {
    const alert = await this.alertController.create({
      header: 'Eliminar detalle',
      message:
        '¿Estás seguro que deseas eliminar <strong>' +
        detalle.cantidad +
        ' ' +
        detalle.detalle +
        '</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.data.detalle.splice(
              this.data.detalle.indexOf(
                this.data.detalle.find((r) => r.id === detalle.id)
              ),
              1
            );
            console.log('Confirm Okay', detalle.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async elegirDestino() {
    let lat = 0.0;
    let lng = 0.0;
    if (this.data.destino) {
      lat = parseFloat(this.data.destino.split(',')[0]);
      lng = parseFloat(this.data.destino.split(',')[1]);
    }
    const mapaModal = await this.modalCtrl.create({
      component: MapaComponent,
      componentProps: { lat, lng },
    });
    mapaModal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log(data);
        this.data.destino =
          parseFloat(data.data.latitud).toFixed(6).toString() +
          ', ' +
          parseFloat(data.data.longitud).toFixed(6).toString();
        this.calcularCosto();
      }
    });
    mapaModal.present();
  }

  private cargarDirecciones() {
    /*
      PRUEBAS ELIMINAR
    */
    this.direcciones.push({
      idDireccion: 1,
      idSolicitante: null,
      latitud: 14.586966584775903,
      longitud: -90.50186538045654,
      direccion: '6a calle 9-61',
      nombre: 'Casa Principal',
      tipo: null,
      idEstado: null,
    });

    /*
      PRUEBAS ELIMINAR
    */
  }

  private guardarPedido() {
    console.log(this.data);

    const pedido: Pedido = {
      idPedido: now(),
      idRepartidor: parseInt(this.data.repartidor, 10),
      idSolicitante: 0,
      direccionDetalle: this.data.direccionDetalle,
      descripcion: this.data.descripcion,
      comentarios: this.data.comentarios,
      costo: this.data.costo,
      latitud: parseFloat(this.data.destino.split(',')[0]),
      longitud: parseFloat(this.data.destino.split(',')[1]),
      idEstado: ConstStatus.pedidoRealizado,
      pedidoDetalle: [],
    };

    this.data.detalle.forEach((d) => {
      pedido.pedidoDetalle.push({
        idPedidoDetalle: parseInt(d.id, 10),
        idPedido: pedido.idPedido,
        detalle: d.detalle,
        cantidad: d.cantidad,
        idEstado: ConstStatus.activo,
      });
    });
    console.log('Información a grabar', pedido);
  }

  private calcularCosto() {
    if (this.data.direccion && this.data.destino) {
      const direccionOrigen = this.direcciones.find(
        (d) => (d.idDireccion = parseInt(this.data.direccion, 10))
      );
      if (direccionOrigen) {
        console.log('direccionOrigen', direccionOrigen);
        const direccionDestino = {
          latitud: parseFloat(this.data.destino.split(',')[0]),
          longitud: parseFloat(this.data.destino.split(',')[1]),
        };
        const distancia = this.distanceInKmBetweenEarthCoordinates(
          direccionOrigen.latitud,
          direccionOrigen.longitud,
          direccionDestino.latitud,
          direccionDestino.longitud
        );
        console.log('distancia', distancia);
        this.data.distancia = distancia.toFixed(2);
        this.data.costo = (distancia * this.costoPorKilometro).toFixed(2);

        return this.data.costo;
      } else {
        return (0.0).toFixed(2);
      }
    } else {
      return (0.0).toFixed(2);
    }
  }

  private degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  private distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  private cancelar() {
    this.navCtrl.pop();
  }

  private setDates() {
    let fechaAux = new Date();
    fechaAux = new Date(
      fechaAux.getFullYear(),
      fechaAux.getMonth(),
      fechaAux.getDate()
    );
    const fechaMax = new Date();
    //Se agregan 180 días como fecha máxima
    fechaMax.setDate(fechaAux.getDate() + 180);
    fechaAux = new Date();
    //Se agregan 30 minutos a la hora mínima de entrega
    fechaAux = new Date(fechaAux.getTime() + 1800000);
    if (fechaAux.getMinutes() >= 45) {
      fechaAux = new Date(fechaAux.getTime() + 2100000);
    }
    const fechaMin = fechaAux;
    this.availableDateMin =
      fechaMin.getFullYear().toString() +
      '-' +
      ((fechaMin.getMonth() + 1).toString().length === 1 ? '0' : '') +
      (fechaMin.getMonth() + 1).toString() +
      '-' +
      (fechaMin.getDate().toString().length === 1 ? '0' : '') +
      fechaMin.getDate().toString() +
      'T' +
      (fechaMin.getHours().toString().length === 1 ? '0' : '') +
      fechaMin.getHours().toString() +
      ':' +
      (fechaMin.getMinutes().toString().length === 1 ? '0' : '') +
      fechaMin.getMinutes().toString();
    console.log('availableDateMin', this.availableDateMin);
    this.availableDateMax =
      fechaMax.getFullYear().toString() +
      '-' +
      ((fechaMax.getMonth() + 1).toString().length === 1 ? '0' : '') +
      (fechaMax.getMonth() + 1).toString() +
      '-' +
      (fechaMax.getDate().toString().length === 1 ? '0' : '') +
      fechaMax.getDate().toString();
    console.log('availableDateMax', this.availableDateMax);
  }
}
