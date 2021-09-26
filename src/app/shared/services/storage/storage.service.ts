import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject, Observable } from 'rxjs';
import { isObject } from 'util';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  // private residence = new Subject<Residence>();

  // getResidence(): Observable<Residence> {
  //   return this.residence.asObservable();
  // }

  // setResidenceAsObservable(key: string, residence: Residence) {
  //   this.storage.set(key, JSON.stringify(residence));
  //   this.residence.next(residence);
  // }

  set(key: string, value: any) {
    return new Promise((resolve, reject) => {
      this.storage
        .set(key, value)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getNP(key: string) {
    const resp = this.storage.get(key);
    return resp;
  }

  get(key: string) {
    return new Promise((resolve, reject): any => {
      this.storage
        .get(key)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  remove(key: string) {
    return new Promise((resolve, reject): any => {
      this.storage
        .remove(key)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
