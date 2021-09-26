import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'entregas',
    loadChildren: () => import('./entregas/entregas.module').then((m) => m.EntregasPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./cuenta/Perfil/perfil.module').then((m) => m.PerfilPageModule),
  },
  {
    path: 'resenas',
    loadChildren: () => import('./cuenta/resenas/resenas.module').then((m) => m.ResenasPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartidorPageRoutingModule {}
