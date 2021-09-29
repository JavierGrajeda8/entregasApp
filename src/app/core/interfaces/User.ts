import { Solicitante } from './Solicitante';
import { Repartidor } from './Repartidor';

export interface User {
  uid: string;
  email: string;
  name?: string;
  phone?: number;
  phoneCountryCode?: number;
  type?: string;
  administrator?: Solicitante;
  guard?: Repartidor;
  logginType?: string;
  password?: string;
}
