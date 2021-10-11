import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Mail } from '../../interfaces/mail';
import { User } from '../../interfaces/user';
import { Pedido } from '../../interfaces/Pedido';
import { Repartidor } from '../../interfaces/Repartidor';
import { Solicitante } from '../../interfaces/Solicitante';

@Injectable({
  providedIn: 'root',
})
export class MailerService {
  constructor(protected http: HttpClient) {}

  public nuevoPedido(pedido: Pedido, repartidor: Repartidor, solicitante: Solicitante) {
    const mail: Mail = {
      to: 'sergio1643@gmail.com',
      subject: `${solicitante.nombre} ha creado un nuevo pedido número ${pedido.idPedido}`,
      body: `
      ${repartidor.nombre}:

      ${solicitante.nombre} ha creado el siguiente pedido ${pedido.idPedido} con las siguientes observaciones:

      - Desde: ${pedido.direccion.direccion} 
      - Hacia: ${pedido.direccionDetalle}
      - Descripción del pedido: ${pedido.descripcion}
      - Comentarios al repartidor: ${pedido.comentarios}

      Saludos!
      `,
    };
    console.log('mail', mail);
    this.http.post(environment.mailerURL, mail).subscribe((resp) => {
      console.log(resp);
    });
  }

}
