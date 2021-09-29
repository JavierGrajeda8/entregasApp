import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ResenaComponent } from 'src/app/core/components/resena/resena.component';
import { Pedido } from 'src/app/core/interfaces/Pedido';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  private pedidos: Pedido[] = [];
  constructor(private modalCtrl: ModalController, private nav: NavController) {}

  ngOnInit() {}

  async test() {
    const resenaModal = await this.modalCtrl.create({
      component: ResenaComponent,
      componentProps: { editando: true },
    });
    resenaModal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log(data);
      }
    });
    resenaModal.present();
  }

  private crear() {
    this.nav.navigateForward('solicitante/pedidos/crear');
  }
}
