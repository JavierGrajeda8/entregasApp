import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../interfaces/Pedido';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss'],
})
export class PedidoDetalleComponent implements OnInit {
  public pedido: Pedido;
  constructor() {}

  ngOnInit() {
    this.pedido = {
      idPedido: 1,
      idRepartidor: 1,
      idSolicitante: 1,
      direccionDetalle: 'string',
      descripcion: 'string',
      comentarios: 'string',
      costo: 0.0,
      latitud: 0,
      longitud: 0,
      idEstado: 5,
      repartidor: {
        idRepartidor: 0,
        nombre: 'Repartidor 1',
        telefono: '',
        correo: '',
        idEstado: 0,
      },
      direccion: {
        idDireccion: 1,
        idSolicitante: 1,
        nombre: 'Direccion principal',
        direccion: 'Dirección detalle',
        latitud: 0,
        longitud: 0,
        idEstado: 0,
      },
      pedidoDetalle: [
        {
          idPedido: 1,
          idPedidoDetalle: 1,
          detalle: 'Detalle 1',
          cantidad: '1',
          idEstado: 1,
        },
        {
          idPedido: 1,
          idPedidoDetalle: 1,
          detalle: 'Detalle 2',
          cantidad: '2',
          idEstado: 1,
        },
        {
          idPedido: 1,
          idPedidoDetalle: 1,
          detalle: 'Detalle 3',
          cantidad: '3',
          idEstado: 1,
        },
        {
          idPedido: 1,
          idPedidoDetalle: 1,
          detalle: 'Detalle 3',
          cantidad: '3',
          idEstado: 1,
        },
        {
          idPedido: 1,
          idPedidoDetalle: 1,
          detalle: 'Detalle 3',
          cantidad: '3',
          idEstado: 1,
        },
      ],
    };
  }
}
