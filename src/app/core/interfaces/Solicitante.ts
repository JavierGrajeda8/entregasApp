import { Direccion } from './Direccion';

export interface Solicitante {
    idSolicitante: number;
    nombre: string;
    telefono: number;
    correo: string;
    idEstado: number;
    direccion?: Direccion[];
    password?: string;
}
