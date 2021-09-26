import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPageRoutingModule } from './crear-routing.module';

import { CrearPage } from './crear.page';
import { ComponentsModule } from 'src/app/core/components/components.module';
import { MapaComponent } from 'src/app/core/components/mapa/mapa.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CrearPageRoutingModule, ComponentsModule],
  declarations: [CrearPage],
  entryComponents: [MapaComponent],
  providers: [Geolocation]
})

export class CrearPageModule {}
