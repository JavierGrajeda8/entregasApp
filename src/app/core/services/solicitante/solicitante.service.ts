import { Injectable } from '@angular/core';
import { Solicitante } from '../../interfaces/Solicitante';
import { AuthService } from '../auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ConstStrings } from '../../constants/constStrings';
import {
  Action,
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Direccion } from '../../interfaces/Direccion';
import { Pedido } from '../../interfaces/Pedido';
import { ConstStatus } from '../../constants/constStatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private storage: StorageService
  ) {}

  obtenerCostoPorKilometro() {
    return this.firestore
      .collection('parametros')
      .doc('precioPorKilometro')
      .get();
  }

  guardarPerfil(solicitante: Solicitante) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('solicitante')
        .doc(solicitante.correo)
        .set(solicitante)
        .then(() => {
          resolve('');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  login(correo, password) {
    console.log('correo', correo);
    console.log('password', password);
    return new Promise((resolve, reject) => {
      this.auth
        .loginWithEmailPassword(correo, password)
        .then((data) => {
          console.log('data LOGIN', data);
          this.get(correo)
            .then((user: any) => {
              console.log('user', user);
              this.storage.set(
                ConstStrings.str.storage.solicitante,
                JSON.stringify(user.data())
              );
              resolve(user);
            })
            .catch((error) => {
              console.log('error login 1', error);
              reject(error);
            });
        })
        .catch((error) => {
          console.log('error login', error);
          reject(error);
        });
    });
  }

  registrar(solicitante: Solicitante) {
    return new Promise((resolve, reject) => {
      this.auth
        .registerWithEmail(solicitante.correo, solicitante.password)
        .then(() => {
          delete solicitante.password;
          this.firestore
            .collection('solicitante')
            .doc(solicitante.correo)
            .set(solicitante)
            .then(() => {
              this.storage.set(
                ConstStrings.str.storage.solicitante,
                JSON.stringify(solicitante)
              );
              resolve(solicitante);
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

  setDireccion(direccion: Direccion, correo: string) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('solicitante')
        .doc(correo)
        .collection('direccion')
        .doc(direccion.idDireccion.toString())
        .set(direccion)
        .then(() => {
          resolve('');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getDireccion(correo: string) {
    return new Promise((resolve, reject) => {
      resolve(
        this.firestore
          .collection('solicitante')
          .doc(correo)
          .collection('direccion')
          .get()
          .toPromise()
      );
    });
  }

  getpedidosHistorico(idSolicitante) {
    return this.firestore
      .collection('solicitante')
      .doc(idSolicitante)
      .collection(
        'pedido',
        (ref) =>
          ref.where('idEstado', '==', ConstStatus.pedidoEntregado) ||
          ref.where('idEstado', '==', ConstStatus.pedidoCancelado)
      )
      .valueChanges();
  }

  getPedidosPendientes(idSolicitante) {
    return this.firestore
      .collection('solicitante')
      .doc(idSolicitante)
      .collection('pedido', (ref) =>
        ref
          .where('idEstado', '>=', ConstStatus.pedidoRealizado)
          .where('idEstado', '<=', ConstStatus.pedidoEnTransito)
      )
      .valueChanges();
  }

  guardarPedido(pedido: Pedido) {
    this.firestore
      .collection('pedidos')
      .doc(pedido.idPedido.toString())
      .set(pedido);

    return new Promise((resolve, reject) => {
      this.firestore
        .collection('solicitante')
        .doc(pedido.idSolicitante)
        .collection('pedido')
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

  guardarUbicacionRepartidor(idRepartidor, latitud, longitud) {
    return this.firestore
      .collection('repartidor')
      .doc(idRepartidor)
      .update({ latitud, longitud });
  }

  obtenerUbicacionRepartidor(idRepartidor) {
    return this.firestore
      .collection('repartidor')
      .doc(idRepartidor)
      .valueChanges();
  }

  get(correo) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('solicitante')
        .doc(correo)
        .get()
        .toPromise()
        .then((user) => {
          console.log('user get', user);
          if (user.exists) {
            resolve(user);
          } else {
            reject('No se encontró el usuario en firebase');
          }
        })
        .catch((error) => {
          console.log('error get', error);
          reject(error);
        });
    });
  }
}
