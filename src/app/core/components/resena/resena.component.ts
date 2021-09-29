import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.scss'],
})
export class ResenaComponent implements OnInit {
  public data = {
    valor: 5,
    comentarios: '',
  };
  private editando = false;

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
    if (this.navParams.get('editando')) {
      this.editando = this.navParams.get('editando');
    }
  }

  ngOnInit() {}

  private valorar(valor) {
    if (this.editando) {
      this.data.valor = valor;
    }
  }

  private guardar() {
    this.modalCtrl.dismiss({ valoracion: this.data.valor, comentarios: this.data.comentarios });
  }

  private cancelar() {
    this.modalCtrl.dismiss();
  }
}
