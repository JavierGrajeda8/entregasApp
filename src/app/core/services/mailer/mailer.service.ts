import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Mail } from '../../interfaces/mail';
import { User } from '../../interfaces/user';
import { Pedido } from '../../interfaces/Pedido';
import { Repartidor } from '../../interfaces/Repartidor';
import { Solicitante } from '../../interfaces/Solicitante';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class MailerService {
  constructor(protected http: HttpClient, private common: CommonService) {}

  public test() {
    const mail: Mail = {
      to: 'javiergrajeda8@gmail.com',
      subject: 'test',
      body: 'TEST TEST'
    }
    console.log('mail', mail);
    this.http.post(environment.mailerURL, mail).subscribe((resp) => {
      console.log(resp);
    });
  }

  public nuevoPedido(
    pedido: Pedido,
    repartidor: Repartidor,
    solicitante: Solicitante
  ) {
    const mail: Mail = {
      to:
        repartidor.correo + ';' + solicitante.correo + ';sergio1643@gmail.com',
      subject: `${solicitante.nombre} te ha asignado el pedido número ${pedido.idPedido}`,
      body: `
      ${repartidor.nombre}:

      ${solicitante.nombre} ha creado y te ha asignado el siguiente pedido ${pedido.idPedido} con las siguientes observaciones:

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

  public pedidoEntregado(
    pedido: Pedido,
    solicitante: Solicitante
  ) {
    const mail: Mail = {
      to: solicitante.correo + ';sergio1643@gmail.com',
      subject: `Pedido número ${pedido.idPedido} ENTREGADO`,
      body: `
      ${solicitante.nombre}:

      Tu pedido número ${pedido.idPedido} ha sido entregado satisfactoriamente.:

      - Desde: ${pedido.direccion.direccion} 
      - Hacia: ${pedido.direccionDetalle}
      - Descripción del pedido: ${pedido.descripcion}
      - Comentarios al repartidor: ${pedido.comentarios}`,
    };
    let historia = '';
    pedido.historico.forEach((h) => {
      const d = new Date(h.fechaHora);
      historia += `
      ${this.common.getActionExplicit(h.idEstado)} - ${d.toLocaleString()}`;
    });
    mail.body = ` ${mail.body}
    
      Historial:
      ${historia}
      
      Saludos!`;
    console.log('mail', mail);
    this.http.post(environment.mailerURL, mail).subscribe((resp) => {
      console.log(resp);
    });
  }
}
