import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Pedido } from 'src/app/core/interfaces/Pedido';
import { Repartidor } from 'src/app/core/interfaces/Repartidor';
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
    private alertCtrl: AlertController
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
      console.log(pedidos);
      this.pedidos = pedidos as Pedido[];
    });
  }

  async mostrarDetalle(pedido: Pedido) {
    const detalle = await this.modalCtrl.create({
      component: PedidoDetalleComponent,
      componentProps: { pedido, solicitante: false },
    });

    detalle.present();
  }

  async confirmar() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar pedido',
      message: '¿Estás seguro que deseas CONFIRMAR este pedido',
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
          text: 'cONFIRMAR',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Okay');
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
