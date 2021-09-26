import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/core/interfaces/Pedido';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  private pedidos: Pedido[] = [];

  constructor() { }

  ngOnInit() {
  }

}
