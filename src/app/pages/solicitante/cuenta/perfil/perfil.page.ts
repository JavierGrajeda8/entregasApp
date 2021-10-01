import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Solicitante } from 'src/app/core/interfaces/Solicitante';
import { SolicitanteService } from 'src/app/core/services/solicitante/solicitante.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

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
    editando: false,
  };
  solicitante: Solicitante;
  constructor(
    private storage: StorageService,
    private nav: NavController,
    private solicitanteService: SolicitanteService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.storage
      .get(ConstStrings.str.storage.solicitante)
      .then((solicitante: string) => {
        this.solicitante = JSON.parse(solicitante) as Solicitante;
        this.data.nombre = this.solicitante.nombre;
        this.data.telefono = this.solicitante.telefono;
        this.data.correo = this.solicitante.correo;
      });
  }

  cancelar() {
    this.data.editando = false;
  }
  regresar() {
    this.nav.pop();
  }
  guardar() {
    this.solicitante.nombre = this.data.nombre;
    this.solicitante.telefono = this.data.telefono;

    this.solicitanteService.guardarPerfil(this.solicitante).then(async ()=> {
      const toast = await this.toastController.create({
        header: 'Perfil guardado exitosamente',
        animated: true,
        position: 'bottom',
        color: 'success',
        duration: 5000,
      });
      toast.present();
    });
  }
}
