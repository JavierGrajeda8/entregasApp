import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ConstStrings } from './core/constants/constStrings';
import { Repartidor } from './core/interfaces/Repartidor';
import { SolicitanteService } from './core/services/solicitante/solicitante.service';
import { StorageService } from './shared/services/storage/storage.service';
declare let google;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private myCoordinates: any;
  private position: any;
  private repartidor: Repartidor;
  private lat = 0.0;
  private lng = 0.0;
  constructor(
    private geolocation: Geolocation,
    private solicitanteService: SolicitanteService,
    private storageService: StorageService
  ) {
    this.storageService
      .get(ConstStrings.str.storage.repartidor)
      .then((repartidor: string) => {
        console.log('repartidor', repartidor);
        if (repartidor) {
          this.repartidor = JSON.parse(repartidor);
          this.guardarUbicacionRepartidor();
        }
      });
  }

  private guardarUbicacionRepartidor() {
    setInterval(() => {
      const GPS_OPTIONS = { timeout: 10000 };
      this.geolocation.getCurrentPosition(GPS_OPTIONS).then(
        (position) => {
          this.position = position;
          console.log('lat repartidor', this.lat);
          console.log('lng repartidor', this.lng);
          console.log('repartidor', this.repartidor);
          this.solicitanteService.guardarUbicacionRepartidor(
            this.repartidor.correo.toString(),
            this.lat,
            this.lng
          );
        },
        (error) => {
          console.log('error', error);
        }
      );
    }, 10000);
  }
}
