import { Injectable } from '@angular/core';
import { Solicitante } from '../../interfaces/Solicitante';
import { AuthService } from '../auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ConstStrings } from '../../constants/constStrings';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Repartidor } from '../../interfaces/Repartidor';
import { Pedido } from '../../interfaces/Pedido';
import { ConstStatus } from '../../constants/constStatus';

@Injectable({
  providedIn: 'root',
})
export class RepartidorService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private storage: StorageService
  ) {}

  registrar(repartidor: Repartidor) {
    return new Promise((resolve, reject) => {
      this.auth
        .registerWithEmail(repartidor.correo, repartidor.password)
        .then(() => {
          delete repartidor.password;
          this.firestore
            .collection('repartidor')
            .doc(repartidor.correo)
            .set(repartidor)
            .then(() => {
              this.storage.set(
                ConstStrings.str.storage.repartidor,
                JSON.stringify(repartidor)
              );
              resolve(repartidor);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getPedidosPendientes(idRepartidor) {
    return this.firestore
      .collection('repartidor')
      .doc(idRepartidor)
      .collection('entrega', (ref) =>
        ref
          .where('idEstado', '>=', ConstStatus.pedidoRealizado)
          .where('idEstado', '<=', ConstStatus.pedidoEnTransito)
      )
      .valueChanges();
  }

  guardarEntrega(pedido: Pedido){
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('repartidor')
        .doc(pedido.idRepartidor)
        .collection('entrega')
        .doc(pedido.idPedido.toString())
        .set(pedido)
        .then(() => {
          resolve('');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  login(correo, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .loginWithEmailPassword(correo, password)
        .then((data) => {
          this.get(correo)
            .then((user: any) => {
              this.storage.set(
                ConstStrings.str.storage.repartidor,
                JSON.stringify(user.data())
              );
              resolve(user);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('repartidor')
        .get()
        .toPromise()
        .then((data) => {
          if (data.size > 0) {
            resolve(data.docs);
          } else {
            reject('No existen repartidores aún');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private get(correo) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('repartidor')
        .doc(correo)
        .get()
        .toPromise()
        .then((user) => {
          if (user.exists) {
            resolve(user);
          } else {
            reject('No se encontró el usuario en firebase');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
