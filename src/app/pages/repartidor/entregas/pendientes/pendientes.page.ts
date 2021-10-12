import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Pedido } from 'src/app/core/interfaces/Pedido';
import { Repartidor } from 'src/app/core/interfaces/Repartidor';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { CommonService } from 'src/app/core/services/common/common.service';
import { MailerService } from 'src/app/core/services/mailer/mailer.service';
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
  private repartidor: Repartidor;
  private pedidos: Pedido[] = [];
  private subscription: Subscription;
  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private repartidorService: RepartidorService,
    private storage: StorageService,
    private alertCtrl: AlertController,
    private commonService: CommonService,
    private mailerService: MailerService
  ) {}

  ngOnInit() {
    this.storage
      .get(ConstStrings.str.storage.repartidor)
      .then((repartidor: string) => {
        this.repartidor = JSON.parse(repartidor) as Repartidor;
        console.log('repartidor', this.repartidor);
        this.getPedidosPendientes();
      });
  }

  ionViewWillLeave() {
    console.log('unsubscribe');
    this.subscription.unsubscribe();
  }

  getPedidosPendientes() {
    const subs = this.repartidorService.getPedidosPendientes(
      this.repartidor.correo
    );
    this.subscription = subs.subscribe((pedidos) => {
      this.cargando = false;
      console.log('pedidos', pedidos);
      this.pedidos = pedidos as Pedido[];
      this.pedidos = this.pedidos.sort((a, b) =>
        b.fechaEntrega < a.fechaEntrega ? 1 : -1
      );
    });
  }

  async mostrarDetalle(pedido: Pedido) {
    const detalle = await this.modalCtrl.create({
      component: PedidoDetalleComponent,
      componentProps: { pedido, solicitante: false },
    });

    detalle.present();
  }

  async cancelar(pedido: Pedido) {
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

  async nextStep(pedido: Pedido) {
    // this.mailerService.pedidoEntregado(pedido);
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header:
        this.commonService.nextStep(pedido.idEstado).toUpperCase() + ' pedido',
      message:
        '¿Estás seguro que deseas ' +
        this.commonService.nextStep(pedido.idEstado).toUpperCase() +
        ' este pedido',
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
          text: this.commonService.nextStep(pedido.idEstado).toUpperCase(),
          cssClass: 'danger',
          handler: () => {
            const estado = this.repartidorService.nextStep(pedido, false);
            if (estado === ConstStatus.pedidoEntregado) {
              this.solicitanteService
                .get(pedido.idSolicitante)
                .then((solicitante: any) => {
                  const soli = solicitante.data() as Solicitante;
                  this.mailerService.pedidoEntregado(pedido, soli);
                });
            }
          },
        },
      ],
    });

    await alert.present();
  }

  private crear() {
    this.nav.navigateForward('solicitante/pedidos/crear');
  }
}
