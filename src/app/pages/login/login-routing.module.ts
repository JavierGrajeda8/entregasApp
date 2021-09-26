import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./registro/registro.module').then((m) => m.RegistroPageModule),
  },
  {
    path: 'loginRepartidor',
    loadChildren: () =>
      import('./login-repartidor/login-repartidor.module').then(
        (m) => m.LoginRepartidorPageModule
      ),
  },
  {
    path: 'registroRepartidor',
    loadChildren: () =>
      import('./registro-repartidor/registro-repartidor.module').then(
        (m) => m.RegistroRepartidorPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
