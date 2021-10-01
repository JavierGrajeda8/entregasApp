import { Pipe, PipeTransform } from '@angular/core';
import { ConstStatus } from 'src/app/core/constants/constStatus';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: number, solicitante: boolean = true): string {
    let respuesta = '';
    switch (value) {
      case ConstStatus.pedidoRealizado:
        respuesta = solicitante ? 'Pedido realizado' : 'Pedido realizado';
        break;
      case ConstStatus.pedidoConfirmado:
        respuesta = solicitante
          ? 'El repartidor ha confirmado tu pedido'
          : 'Haz confirmado este pedido';
        break;
      case ConstStatus.pedidoPorRecoger:
        respuesta = solicitante
          ? 'El repartidor se dirige a recoger el pedido'
          : 'Te diriges a recoger el pedido';
        break;
      case ConstStatus.pedidoEsperando:
        respuesta = solicitante
          ? 'El repartidor se encuentra en en lugar para recoger el pedido'
          : 'Te encuentras en el lugar para recoger el pedido';
        break;
      case ConstStatus.pedidoEnTransito:
        respuesta = solicitante
          ? 'El repartidor va en camino a entregar tu pedido'
          : 'Te encuentras en camino a entregar el pedido';
        break;
      case ConstStatus.pedidoEntregado:
        respuesta = solicitante
          ? 'Pedido entregado'
          : 'Pedido entregado';
        break;
      default:
        respuesta = 'Pedido realizado';

        break;
    }
    return respuesta;
  }
}
