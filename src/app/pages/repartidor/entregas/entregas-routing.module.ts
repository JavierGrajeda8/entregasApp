import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then(m => m.HistoricoPageModule)
  },
  {
    path: 'pendientes',
    loadChildren: () => import('./pendientes/pendientes.module').then(m => m.PendientesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregasPageRoutingModule {}
