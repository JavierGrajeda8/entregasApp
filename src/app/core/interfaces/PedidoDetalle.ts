import { Pedido } from './Pedido';

export interface PedidoDetalle {
  idPedidoDetalle: number;
  idPedido: number;
  detalle: string;
  cantidad: string;
  idEstado: number;
  pedido?: Pedido;
}
