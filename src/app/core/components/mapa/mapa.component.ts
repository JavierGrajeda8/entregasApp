import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { ConnectivityServiceProvider } from '../../services/connectivity-service/connectivity-service';

declare let google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  apiKey: string = 'AIzaSyCCtejiJvqg3n0Xf76CDhJQ7lCoOLz1iY0';
  myCoordinates: any;
  position: any;
  map: any;
  markers: any = [];
  script: any;
  mapInitialised = false;
  lat = 0.0;
  lng = 0.0;

  loading: any;

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
          this.script.src = 'https://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          this.script.src = 'https://maps.google.com/maps/api/js?callback=mapInit';
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

  disableMap() {}

  initMap() {
    console.log('initMap');
    this.mapInitialised = true;
    this.myGeolocation();
  }

  addConnectivityListeners() {
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

  myGeolocation() {
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

          this.myCoordinates = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        }
        const mapOptions = {
          center: this.myCoordinates,
          zoom: 15,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        console.log('this.map', this.map.center.lat());
        google.maps.event.addListener(this.map, 'drag', () => {
          this.myCoordinates = new google.maps.LatLng(this.map.center.lat(), this.map.center.lng());
          this.markers[0].setPosition(this.myCoordinates);
          console.log('draging');
        });

        this.addMarker(this.myCoordinates, '', true, false);
        this.dismissLoader();
        //this.obtenerSucursales();
      },
      (error) => {
        if (this.lat > 0 && this.lng > 0) {
          this.myCoordinates = new google.maps.LatLng(this.lat, this.lng);
        } else {
          this.myCoordinates = new google.maps.LatLng(14.5973312, -90.5246463);
        }
        const mapOptions = {
          center: this.myCoordinates,
          zoom: 15,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        console.log('this.map', this.map.center.lat());
        google.maps.event.addListener(this.map, 'drag', () => {
          this.myCoordinates = new google.maps.LatLng(this.map.center.lat(), this.map.center.lng());
          this.markers[0].setPosition(this.myCoordinates);
          console.log('draging');
        });
        google.maps.event.addListener(this.map, 'dragend', () => {
          this.markers[0].setMap(null);
          this.markers = [];
          this.myCoordinates = new google.maps.LatLng(this.map.center.lat(), this.map.center.lng());
          console.log('map dragged', this.map);

          this.addMarker(this.myCoordinates, '', true, false);
        });
        this.dismissLoader();
        //this.obtenerSucursales();
        this.showMessage('Señal de GPS baja, verifica si tienes encendido tu GPS.', 'Aviso');
      }
    );
  }

  addMarker(latLng: any, item: any, soyYo: boolean, isTomaTurno?: boolean) {
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

  async showMessage(message: string, title?: string, action?: any, showInput?: boolean) {
    if (!title) {title = '';}
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

  loaderSimple() {
    this.loaderCon('');
  }

  async dismissLoader() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  elegir() {
    this.modalCtrl.dismiss({ latitud: this.map.center.lat(), longitud: this.map.center.lng() });
  }
}
