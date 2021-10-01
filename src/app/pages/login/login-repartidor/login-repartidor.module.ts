import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRepartidorPageRoutingModule } from './login-repartidor-routing.module';

import { LoginRepartidorPage } from './login-repartidor.page';
import { ComponentsModule } from 'src/app/core/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRepartidorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LoginRepartidorPage]
})
export class LoginRepartidorPageModule {}
