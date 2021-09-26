import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRepartidorPage } from './login-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRepartidorPageRoutingModule {}
