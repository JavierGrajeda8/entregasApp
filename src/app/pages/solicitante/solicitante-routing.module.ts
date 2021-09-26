import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./cuenta/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./cuenta/direccion/direccion.module').then(m => m.DireccionPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitantePageRoutingModule {}
