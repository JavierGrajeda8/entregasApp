import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Direccion } from 'src/app/core/interfaces/Direccion';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public direcciones: Direccion[] = [];
  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  crear(){
    this.nav.navigateForward('solicitante/direccion/gestionar');
  }
}
