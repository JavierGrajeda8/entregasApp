import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'solicitante',
    loadChildren: () => import('./pages/solicitante/solicitante.module').then(m => m.SolicitantePageModule)
  },
  {
    path: 'repartidor',
    loadChildren: () => import('./pages/repartidor/repartidor.module').then(m => m.RepartidorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
