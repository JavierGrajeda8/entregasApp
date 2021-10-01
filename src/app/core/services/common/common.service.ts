import { Injectable } from '@angular/core';
import { ConstStatus } from '../../constants/constStatus';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  public getAction(idEstado) {
    let respuesta = '';
    switch (idEstado) {
      case ConstStatus.pedidoRealizado:
        respuesta = ConstStatus.pedidoConfirmadoStr;
        break;
      case ConstStatus.pedidoConfirmado:
        respuesta = ConstStatus.pedidoPorRecogerStr;
        break;
      case ConstStatus.pedidoPorRecoger:
        respuesta = ConstStatus.pedidoEsperandoStr;
        break;
      case ConstStatus.pedidoEsperando:
        respuesta = ConstStatus.pedidoEnTransitoStr;
        break;
      case ConstStatus.pedidoEnTransito:
        respuesta = ConstStatus.pedidoEntregadoStr;
        break;
      case ConstStatus.pedidoEntregado:
        respuesta = '';
        break;
      default:
        respuesta = '';
        break;
    }
    return respuesta;
  }

  public nextStepInt(idEstado) {
    let respuesta = 3;
    switch (idEstado) {
      case ConstStatus.pedidoRealizado:
        respuesta = 4;
        break;
      case ConstStatus.pedidoConfirmado:
        respuesta = 5;
        break;
      case ConstStatus.pedidoPorRecoger:
        respuesta = 6;
        break;
      case ConstStatus.pedidoEsperando:
        respuesta = 7;
        break;
      case ConstStatus.pedidoEnTransito:
        respuesta = 8;
        break;
      case ConstStatus.pedidoEntregado:
        respuesta = 9;
        break;
      default:
        respuesta = 3;
        break;
    }
    console.log('respuesta', respuesta);
    return respuesta;
  }
  public nextStep(idEstado) {
    console.log('idEstado0', idEstado);
    let respuesta = '';
    respuesta = this.getAction(idEstado);
    return respuesta;
  }
}
