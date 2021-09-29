import { Injectable } from '@angular/core';
import { Solicitante } from '../../interfaces/Solicitante';
import { AuthService } from '../auth/auth.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ConstStrings } from '../../constants/constStrings';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Direccion } from '../../interfaces/Direccion';

@Injectable({
  providedIn: 'root',
})
export class SolicitanteService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService,
    private storage: StorageService
  ) {}

  login(correo, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .loginWithEmailPassword(correo, password)
        .then((data) => {
          this.get(correo)
            .then((user: any) => {
              this.storage.set(
                ConstStrings.str.storage.solicitante,
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

  private get(correo) {
    return new Promise((resolve, reject) => {
      this.firestore
        .collection('solicitante')
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
          .get().toPromise()
      );
    });
  }
}
