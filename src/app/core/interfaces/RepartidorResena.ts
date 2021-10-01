import { Repartidor } from './Repartidor';

export interface RepartidorResena {
    idRepartidorResena: number;
    idRepartidor: string;
    idPedido: number;
    valoracion: number;
    comentario: string;
    fechaHora: number;
    idEstado: number;
    repartidor?: Repartidor;
}