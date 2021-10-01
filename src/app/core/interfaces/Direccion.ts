import { Repartidor } from './Repartidor';

export interface Direccion {
  idDireccion: number;
  idSolicitante: string;
  latitud: number;
  longitud: number;
  direccion: string;
  nombre: string;
  tipo?: number;
  idEstado: number;
  repartidor?: Repartidor;
}
