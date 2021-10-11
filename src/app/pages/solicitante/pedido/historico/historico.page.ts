import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PedidoDetalleComponent } from 'src/app/core/components/pedido-detalle/pedido-detalle.component';
import { ResenaComponent } from 'src/app/core/components/resena/resena.component';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Pedido } from 'src/app/core/interfaces/Pedido';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { RepartidorService } from 'src/app/core/services/registro/registro.service';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  public cargando = true;
  private solicitante: Solicitante;
  private pedidos: Pedido[] = [];
  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private repartidoService: RepartidorService,
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

  async resena(pedido: Pedido) {
    const detalle = await this.modalCtrl.create({
      component: ResenaComponent,
      componentProps: {editando: true}
    });

    detalle.onDidDismiss().then((data) => {
      if (data.data) {
        console.log(data);
        pedido.resena = {
          idPedido: pedido.idPedido,
          idRepartidorResena: Date.now(),
          idRepartidor: pedido.idRepartidor,
          valoracion: data.data.valoracion,
          comentario: data.data.comentarios,
          fechaHora: Date.now(),
          idEstado: ConstStatus.activo,
        };

        this.repartidoService.resena(pedido);
      }
    });

    detalle.present();
  }

  getPedidosPendientes() {
    const subscription = this.solicitanteService.getpedidosHistorico(
      this.solicitante.idSolicitante
    );
    subscription.subscribe((pedidos) => {
      this.cargando = false;
      console.log(pedidos);
      this.pedidos = pedidos as Pedido[];
      this.pedidos = this.pedidos.sort((a, b) =>
        b.fechaEntrega < a.fechaEntrega ? 1 : -1
      );
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
}
