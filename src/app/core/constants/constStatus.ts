// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ConstStatus {
  export const activo = 1;
  export const inactivo = 2;
  export const pedidoRealizado = 3;
  export const pedidoConfirmado = 4;
  export const pedidoPorRecoger = 5;
  export const pedidoEsperando = 6;
  export const pedidoEnTransito = 7;
  export const pedidoEntregado = 8;
  export const pedidoCancelado = 88;
  export const eliminado = 99;
  export const pedidoRealizadoStr = 'Realizado';
  export const pedidoConfirmadoStr = 'Confirmar';
  export const pedidoPorRecogerStr = 'Iniciar';
  export const pedidoEsperandoStr = 'Ya estoy aquí';
  export const pedidoEnTransitoStr = 'En tránsito';
  export const pedidoEntregadoStr = 'Entregado';
}
