import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { ResenaComponent } from 'src/app/core/components/resena/resena.component';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Pedido } from 'src/app/core/interfaces/Pedido';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  private solicitante: Solicitante;
  private pedidos: Pedido[] = [];
  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.storage
      .get(ConstStrings.str.storage.solicitante)
      .then((solicitante: string) => {
        this.solicitante = JSON.parse(solicitante) as Solicitante;
        this.getPedidosPendientes();
      });
  }

  async test() {
    const detalle = await this.modalCtrl.create({
      component: ResenaComponent,
    });

    detalle.present();
  }

  getPedidosPendientes() {
    const subscription = this.solicitanteService.getpedidosHistorico(
      this.solicitante.idSolicitante
    );
    subscription.subscribe((pedidos) => {
      console.log(pedidos);
      this.pedidos = pedidos as Pedido[];
    });
  }

  async mostrarDetalle(pedido: Pedido) {
    const detalle = await this.modalCtrl.create({
      component: PedidoDetalleComponent,
      componentProps: { idPedido: pedido.idPedido },
    });

    detalle.present();
  }

  private crear() {
    this.nav.navigateForward('solicitante/pedidos/crear');
  }
}
