import { Pedido } from './Pedido';

export interface Historico {
  idHistorico: number;
  idPedido: number;
  fechaHora: number;
  idEstado: number;
  comentarios: string;
  pedido?: Pedido;
}
