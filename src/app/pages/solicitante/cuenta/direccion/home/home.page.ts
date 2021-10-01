import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Direccion } from 'src/app/core/interfaces/Direccion';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public direcciones: Direccion[] = [];
  private solicitante: Solicitante;
  private cargando = false;
  constructor(
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private storage: StorageService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getDirecciones();
  }

  async borrar(direccion: Direccion) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Borrar',
      message:
        '¿Estás seguro que deseas borrar la dirección: <strong>' +
        direccion.nombre +
        '</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Borrar',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }

  private getDirecciones() {
    this.cargando = true;
    this.direcciones = [];
    this.storage
      .get(ConstStrings.str.storage.solicitante)
      .then((solicitante: string) => {
        this.solicitante = JSON.parse(solicitante) as Solicitante;
        this.solicitanteService
          .getDireccion(this.solicitante.correo)
          .then((direcciones: any) => {
            this.cargando = false;
            if (direcciones.size > 0) {
              direcciones.docs.forEach((direccion) => {
                const dir: Direccion = direccion.data();
                if (dir.idEstado === ConstStatus.activo) {
                  this.direcciones.push(direccion.data());
                }
              });
              console.log('direcciones', this.direcciones);
            }
          })
          .catch((error) => {
            this.cargando = false;
          });
      });
  }

  private crear() {
    this.nav.navigateForward('solicitante/direccion/gestionar', {
      queryParams: { editar: false },
    });
  }

  private editar(direccion: Direccion) {
    this.nav.navigateForward('solicitante/direccion/gestionar', {
      queryParams: {
        editar: true,
        idDireccion: direccion.idDireccion,
        nombre: direccion.nombre,
        direccion: direccion.direccion,
        latitud: direccion.latitud,
        longitud: direccion.longitud,
      },
    });
  }
}
