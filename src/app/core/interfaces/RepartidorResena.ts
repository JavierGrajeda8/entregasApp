import { Repartidor } from './Repartidor';

export interface RepartidorResena {
    idRepartidorResena: number;
    idRepartidor: number;
    valoracion: number;
    comentario: string;
    fechaHora: number;
    idEstado: number;
    repartidor?: Repartidor;
}