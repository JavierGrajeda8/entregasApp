import { Component, OnInit } from '@angular/core';
import { RepartidorResena } from 'src/app/core/interfaces/RepartidorResena';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
})
export class ResenasPage implements OnInit {
  private resenas: RepartidorResena[] = [];

  constructor() { }

  ngOnInit() {
  }

}
