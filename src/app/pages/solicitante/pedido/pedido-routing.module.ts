import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'crear',
    loadChildren: () => import('./crear/crear.module').then(m => m.CrearPageModule)
  },
  {
    path: 'pendientes',
    loadChildren: () => import('./pendientes/pendientes.module').then(m => m.PendientesPageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then(m => m.HistoricoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPageRoutingModule {}
