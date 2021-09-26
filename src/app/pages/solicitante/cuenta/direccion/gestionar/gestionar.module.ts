import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavParams } from '@ionic/angular';

import { GestionarPageRoutingModule } from './gestionar-routing.module';

import { GestionarPage } from './gestionar.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { MapaComponent } from 'src/app/core/components/mapa/mapa.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GestionarPageRoutingModule, ComponentsModule],
  declarations: [GestionarPage],
  entryComponents: [MapaComponent],
  providers: [NavParams, Geolocation]
})
export class GestionarPageModule {}
