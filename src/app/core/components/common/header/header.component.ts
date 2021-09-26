import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() backButton = false;

  constructor(private nav: NavController, private alertCtrl: AlertController) {
    console.log('backbutton', this.backButton);
  }

  ngOnInit() {}

  back() {
    this.nav.pop();
  }

  async logOff(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Cerrar sesión',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
