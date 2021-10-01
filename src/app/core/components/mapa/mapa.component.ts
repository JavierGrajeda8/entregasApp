import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavParams,
} from '@ionic/angular';
import { ConnectivityServiceProvider } from '../../services/connectivity-service/connectivity-service';

declare let google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @ViewChild('map', { static: false }) private mapElement: ElementRef;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private apiKey: string = 'AIzaSyCeAsioPlmyJiQET51YaBa4OGg1YXQPjIA';
  private myCoordinates: any;
  private position: any;
  private map: any;
  private markers: any = [];
  private script: any;
  private mapInitialised = false;
  private lat = 0.0;
  private lng = 0.0;
  private lat0 = 0.0;
  private lng0 = 0.0;
  private seguimiento = false;
  private solicitante = true;
  private loading: any;

  constructor(
    private geolocation: Geolocation,
    public connectivityService: ConnectivityServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    console.log('navparams', this.navParams);
    this.lat = parseFloat(this.navParams.get('lat'));
    this.lng = parseFloat(this.navParams.get('lng'));
    this.lat0 = parseFloat(this.navParams.get('lat0'));
    this.lng0 = parseFloat(this.navParams.get('lng0'));
    this.seguimiento = this.navParams.get('seguimiento');
    this.solicitante = this.navParams.get('solicitante');
    console.log('lat', this.lat);
    console.log('lng', this.lng);
    console.log('lat0', this.lat0);
    console.log('lng0', this.lng0);
    console.log('seguimiento', this.seguimiento);
    console.log('solicitante', this.solicitante);
    this.loadGoogleMaps();
  }

  async loadGoogleMaps() {
    console.log('loadGoogleMaps');
    this.addConnectivityListeners();
    if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
      this.disableMap();
      if (this.connectivityService.isOnline()) {
        this.loaderSimple();
        //Load the SDK
        // eslint-disable-next-line @typescript-eslint/dot-notation
        window['mapInit'] = () => {
          this.initMap();
        };
        this.script.id = 'googleMaps';
        if (this.apiKey) {
          this.script.src =
            'https://maps.google.com/maps/api/js?key=' +
            this.apiKey +
            '&callback=mapInit';
        } else {
          this.script.src =
            'https://maps.google.com/maps/api/js?callback=mapInit';
        }
        document.body.appendChild(this.script);
      }
    } else {
      if (this.connectivityService.isOnline()) {
        this.initMap();
      } else {
        this.dismissLoader();
        this.disableMap();
      }
    }
  }

  async dismissLoader() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  async showMessage(
    message: string,
    title?: string,
    action?: any,
    showInput?: boolean
  ) {
    if (!title) {
      title = '';
    }
    let input: any;
    if (showInput) {
      input = [
        {
          name: 'telefono',
        },
      ];
    }
    let buttons: any;
    if (action) {
      buttons = [
        {
          text: 'Entendido',
          handler: action,
        },
      ];
    } else {
      buttons = [{ text: 'Entendido' }];
    }
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons,
      inputs: input,
      cssClass: 'alertDanger',
      mode: 'md',
    });
    await alert.present();
  }

  async loaderCon(mensaje: string) {
    this.loading = await this.loadingCtrl.create({
      message: mensaje,
      spinner: 'circles',
    });
    await this.loading.onDidDismiss(() => {
      this.loading = null;
    });
    await this.loading.present();
  }

  private disableMap() {}

  private initMap() {
    console.log('initMap');
    this.mapInitialised = true;
    if (this.seguimiento && this.solicitante) {
      setTimeout(() => {
        this.seguimientoPedido();
      }, 1500);
    } else {
      this.myGeolocation();
    }
  }

  private seguimientoPedido() {
    console.log('mapElement', this.mapElement);
    this.myCoordinates = new google.maps.LatLng(
      (this.lat + this.lat0) / 2,
      (this.lng + this.lng0) / 2
    );
    const distance = this.distanceInKmBetweenEarthCoordinates(
      this.lat,
      this.lng,
      this.lat0,
      this.lng0
    );
    console.log('distanceInKmBetweenEarthCoordinates', distance);

    const zoom0 = (15.1764 - 1.2109 * Math.log(distance)).toFixed(1);
    console.log('zoom', zoom0);

    const mapOptions = {
      center: this.myCoordinates,
      zoom: parseFloat(zoom0),
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log('this.map center lat', this.map.center.lat());
    console.log('this.map center lng', this.map.center.lng());
    this.myCoordinates = new google.maps.LatLng(this.lat, this.lng);
    this.addMarker(this.myCoordinates, '', true, false);
    this.myCoordinates = new google.maps.LatLng(this.lat0, this.lng0);
    this.addMarker(this.myCoordinates, '', true, false);

    this.dismissLoader();
  }

  private addConnectivityListeners() {
    const onOnline = () => {
      setTimeout(() => {
        if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }
        }
      }, 2000);
    };
    const onOffline = () => {
      this.disableMap();
    };
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
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

  private setGeoPoints() {
    const mapOptions = {
      center: this.myCoordinates,
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log('this.map', this.map.center.lat());
    google.maps.event.addListener(this.map, 'drag', () => {
      this.myCoordinates = new google.maps.LatLng(
        this.map.center.lat(),
        this.map.center.lng()
      );
      this.markers[0].setPosition(this.myCoordinates);
      console.log('draging');
    });

    this.addMarker(this.myCoordinates, '', true, false);
    this.dismissLoader();
  }

  private myGeolocation() {
    const GPS_OPTIONS = { timeout: 10000 };
    this.geolocation.getCurrentPosition(GPS_OPTIONS).then(
      (position) => {
        this.position = position;
        console.log('lat', this.lat);
        console.log('lng', this.lng);
        if (this.lat !== 0 && this.lng !== 0) {
          console.log('1');
          this.myCoordinates = new google.maps.LatLng(this.lat, this.lng);
        } else {
          console.log('0');
          this.myCoordinates = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
        }
        this.setGeoPoints();
      },
      (error) => {
        if (this.lat > 0 && this.lng > 0) {
          this.myCoordinates = new google.maps.LatLng(this.lat, this.lng);
        } else {
          this.myCoordinates = new google.maps.LatLng(14.5973312, -90.5246463);
        }
        this.setGeoPoints();
        this.showMessage(
          'Señal de GPS baja, verifica si tienes encendido tu GPS.',
          'Aviso'
        );
      }
    );
  }

  private addMarker(
    latLng: any,
    item: any,
    soyYo: boolean,
    isTomaTurno?: boolean
  ) {
    const image = {
      url: 'assets/img/ubicaciones/ubicacion1.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(31, 40),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32),
    };
    const image2 = {
      url: 'assets/img/ubicaciones/ubicacion2.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(33, 43),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32),
    };

    const marker = new google.maps.Marker({
      map: this.map,
      position: latLng,
      icon: '',
      me: soyYo,
    });

    if (soyYo) {
      /*let circle = new google.maps.Circle({
       map: this.map,
       radius: 500,
       strokeColor: '#90caf9',
       strokeOpacity: 0.4,
       strokeWeight: 2,
       fillColor: '#bbdefb',
       fillOpacity: 0.35
       });
       circle.bindTo('center', marker, 'position');*/
      // marker.icon = 'assets/img/hola.png'
    } else {
      marker.icon = isTomaTurno ? image2 : image;
    }

    this.markers.push(marker);
    // this.addInfoWindow(marker, item);
  }

  private loaderSimple() {
    this.loaderCon('');
  }

  private cancelar() {
    this.modalCtrl.dismiss();
  }

  private elegir() {
    this.modalCtrl.dismiss({
      latitud: this.map.center.lat(),
      longitud: this.map.center.lng(),
    });
  }
}
