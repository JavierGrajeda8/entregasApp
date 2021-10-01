import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoPageRoutingModule } from './historico-routing.module';

import { HistoricoPage } from './historico.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HistoricoPage],
  providers: [Geolocation]

})
export class HistoricoPageModule {}
