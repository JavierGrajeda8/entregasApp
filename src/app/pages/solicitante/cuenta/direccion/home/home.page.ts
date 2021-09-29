import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor(
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.getDirecciones();
  }

  private getDirecciones() {
    this.direcciones = [];
    this.storage
      .get(ConstStrings.str.storage.solicitante)
      .then((solicitante: string) => {
        this.solicitante = JSON.parse(solicitante) as Solicitante;
        this.solicitanteService
          .getDireccion(this.solicitante.correo)
          .then((direcciones: any) => {
            if (direcciones.size > 0) {
              direcciones.docs.forEach((direccion) => {
                this.direcciones.push(direccion.data());
              });
              console.log('direcciones', this.direcciones);
            }
          });
      });
  }

  private crear() {
    this.nav.navigateForward('solicitante/direccion/gestionar');
  }
}
