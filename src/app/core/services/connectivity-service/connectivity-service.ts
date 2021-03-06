import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ConnectivityServiceProvider {
  private onDevice: boolean;

  constructor(public platform: Platform, public network: Network) {
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type !== 'none';
    } else {
      return navigator.onLine;
    }
  }

  private isOffline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type === 'none';
    } else {
      return !navigator.onLine;
    }
  }
}
