import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Pedido } from 'src/app/core/interfaces/Pedido';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { RepartidorService } from 'src/app/core/services/registro/registro.service';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  public cargando = true;
  private solicitante: Solicitante;
  private pedidos: Pedido[] = [];
  private subscription: Subscription;
  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private repartidorService: RepartidorService,
    private storage: StorageService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.storage
      .get(ConstStrings.str.storage.solicitante)
      .then((solicitante: string) => {
        this.solicitante = JSON.parse(solicitante) as Solicitante;
        this.getPedidosPendientes();
      });
  }

  ionViewWillLeave() {
    console.log('unsubscribe');
    this.subscription.unsubscribe();
  }

  getPedidosPendientes() {
    const subs = this.solicitanteService.getPedidosPendientes(
      this.solicitante.idSolicitante
    );
    this.subscription = subs.subscribe((pedidos) => {
      this.cargando = false;
      console.log(pedidos);
      this.pedidos = pedidos as Pedido[];
      this.pedidos = this.pedidos.sort((a, b) => (b.fechaEntrega < a.fechaEntrega ? 1 : -1));

    });
  }

  async mostrarDetalle(pedido: Pedido) {
    const detalle = await this.modalCtrl.create({
      component: PedidoDetalleComponent,
      componentProps: { pedido, solicitante: true },
    });

    detalle.present();
  }

  private crear() {
    this.nav.navigateForward('solicitante/pedidos/crear');
  }

  private async borrar(pedido: Pedido) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'CANCELAR pedido',
      message:
        '¿Estás seguro que deseas CANCELAR este pedido' + pedido.idPedido + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'CANCELAR',
          cssClass: 'danger',
          handler: () => {
            this.repartidorService.nextStep(pedido, true);
          },
        },
      ],
    });
    await alert.present();
  }
}
