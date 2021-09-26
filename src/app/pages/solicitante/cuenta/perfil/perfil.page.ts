import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public data = {
    nombre: '',
    telefono: null,
    correo: '',
    editando: false
  };
  constructor() { }

  ngOnInit() {
  }

}
