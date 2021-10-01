import { Direccion } from './Direccion';

export interface Solicitante {
    idSolicitante: string;
    nombre: string;
    telefono: number;
    correo: string;
    idEstado: number;
    direccion?: Direccion[];
    password?: string;
}
