import { Repartidor } from './Repartidor';

export interface Direccion {
  idDireccion: number;
  idSolicitante: number;
  latitud: number;
  longitud: number;
  direccion: string;
  nombre: string;
  tipo?: number;
  idEstado: number;
  repartidor?: Repartidor;
}
