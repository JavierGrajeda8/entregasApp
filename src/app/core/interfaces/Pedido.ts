import { Direccion } from './Direccion';
import { Historico } from './Historico';
import { PedidoDetalle } from './PedidoDetalle';
import { Repartidor } from './Repartidor';
import { RepartidorResena } from './RepartidorResena';
import { Solicitante } from './Solicitante';

export interface Pedido {
  idPedido: number;
  idRepartidor: string;
  idSolicitante: string;
  direccionDetalle: string;
  descripcion: string;
  comentarios: string;
  costo: number;
  latitud: number;
  longitud: number;
  fechaEntrega: number;
  idEstado: number;
  repartidor?: Repartidor;
  solicitante?: Solicitante;
  direccion?: Direccion;
  pedidoDetalle?: PedidoDetalle[];
  historico?: Historico[];
  resena?: RepartidorResena;
}
