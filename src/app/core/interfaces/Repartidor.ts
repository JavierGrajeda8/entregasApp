import { RepartidorResena } from './RepartidorResena';

export interface Repartidor {
  idRepartidor: number;
  nombre: string;
  correo: string;
  telefono: string;
  idEstado: number;
  password?: string;
  cantidadEntregas?: number;
  reseñas?: RepartidorResena[];
}
