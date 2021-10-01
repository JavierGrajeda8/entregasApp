import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Repartidor } from 'src/app/core/interfaces/Repartidor';
import { RepartidorService } from 'src/app/core/services/registro/registro.service';
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
  repartidor: Repartidor;
  constructor(
    private storage: StorageService,
    private nav: NavController,
    private repartidorService: RepartidorService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.storage
      .get(ConstStrings.str.storage.repartidor)
      .then((repartidor: string) => {
        this.repartidor = JSON.parse(repartidor) as Repartidor;
        this.data.nombre = this.repartidor.nombre;
        this.data.telefono = this.repartidor.telefono;
        this.data.correo = this.repartidor.correo;
      });
  }

  cancelar() {
    this.data.editando = false;
  }
  regresar() {
    this.nav.pop();
  }
  guardar() {
    this.repartidor.nombre = this.data.nombre;
    this.repartidor.telefono = this.data.telefono;

    this.repartidorService.guardarPerfil(this.repartidor).then(async () => {
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
