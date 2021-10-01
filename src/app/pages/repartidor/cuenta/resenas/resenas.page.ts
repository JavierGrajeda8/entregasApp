import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { Repartidor } from 'src/app/core/interfaces/Repartidor';
import { RepartidorResena } from 'src/app/core/interfaces/RepartidorResena';
import { RepartidorService } from 'src/app/core/services/registro/registro.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
})
export class ResenasPage implements OnInit {
  public repartidor: Repartidor;
  public cargando = true;
  private resenas: RepartidorResena[] = [];
  private subscription: Subscription;
  constructor(
    private storage: StorageService,
    private repartidorService: RepartidorService
  ) {}

  ngOnInit() {
    this.storage
      .get(ConstStrings.str.storage.repartidor)
      .then((repartidor: string) => {
        this.repartidor = JSON.parse(repartidor) as Repartidor;
        console.log('repartidor', this.repartidor);
        this.getResenas();
      });
  }

  getResenas() {
    const subs = this.repartidorService.getResenas(this.repartidor.correo);
    subs.then((resenas) => {
      this.cargando = false;
      console.log('resenas');
      resenas.docs.forEach((resena) => {
        const res: RepartidorResena = resena.data() as RepartidorResena;
        if (res.idEstado === ConstStatus.activo) {
          this.resenas.push(res);
        }
      });
      console.log('resenas', this.resenas);
      // this.resenas = resenas as RepartidorResena[];
      // this.resenas = this.resenas.sort((a, b) =>
      //   b.fechaHora < a.fechaHora ? 1 : -1
      // );
    });
  }
}
