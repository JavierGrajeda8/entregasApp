// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ConstStrings {
  export const str = {
    storage: {
      user: 'USUARIO',
      repartidor: 'REPARTIDOR',
      solicitante: 'SOLICITANTE',
    },
    messagesSolicitante: {
      pedidoRealizado: 'Pedido realizado',
      pedidoConfirmado: 'El repartidor ha confirmado tu pedido',
      pedidoPorRecoger: 'El repartidor se dirige a recoger el pedido',
      pedidoEsperando:
        'El repartidor se encuentra en en lugar para recoger el pedido',
      pedidoEnTransito: 'El repartidor va en camino a entregar tu pedido',
      pedidoEntregado: 'Pedido entregado',
      pedidoCancelado: 'Pedido cancelado',
      eliminado: 'Pedido eliminado',
    },
    messagesRepartidor: {
      pedidoRealizado: 'Pedido realizado',
      pedidoConfirmado: 'Haz confirmado este pedido',
      pedidoPorRecoger: 'Te diriges a recoger el pedido',
      pedidoEsperando: 'Te encuentras en el lugar para recoger el pedido',
      pedidoEnTransito: 'Te encuentras en camino a entregar el pedido',
      pedidoEntregado: 'Pedido entregado',
      pedidoCancelado: 'Pedido cancelado',
      eliminado: 'Pedido eliminado',
    },
  };
}
