import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  taxista: Taxista[] = [];
  lat: number;
  lng: number;

  init = false;

  seguiendoA: string = null;
  nombreTaxista: string = null;

  iconMap = {
    iconUrl: '../assets/imgs/taxi.png',
    iconHeigh: 10
  };

  constructor(private afDB: AngularFirestore) {

    this.afDB.collection('taxistas').valueChanges()
    .subscribe((data: Taxista[]) => {
      this.taxista = data;

      if (!this.init) {
        this.lat = data[0].lat;
        this.lng = data[0].lng;
        this.init = true;
      }
      if (this.seguiendoA) {
        data.forEach(taxista => {
          if (taxista.clave === taxista.nombre) {
            this.lat = taxista.lat;
            this.lng = taxista.lng;
          }
        });
      }
    });
  }

  seguirTaxista(tax: Taxista) {
    this.seguiendoA = tax.clave;
    this.nombreTaxista = tax.nombre;

    this.lat = tax.lat;
    this.lng = tax.lng;
  }

  dejarDeSeguir() {
    this.seguiendoA = null;
    this.nombreTaxista = null;
  }
}

interface Taxista {
  nombre: string;
  clave: string;
  lng: number;
  lat: number;
}
