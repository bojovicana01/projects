import { Component, OnInit } from '@angular/core';
import { NastavnikService } from '../services/nastavnik.service';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';
import { Ucenik } from '../models/ucenik';
import { Korisnik } from '../models/korisnik';
import { Nastavnik } from '../models/nastavnik';
import { Cas } from '../models/cas';

@Component({
  selector: 'app-moj-ucenik-detalji',
  templateUrl: './moj-ucenik-detalji.component.html',
  styleUrls: ['./moj-ucenik-detalji.component.css']
})
export class MojUcenikDetaljiComponent implements OnInit {

  constructor(private nastavnikService : NastavnikService, private universalService : UniversalService, private router : Router) {}

  uKI : string = ""
  ucenik : Ucenik = new Ucenik()

  korisnik : Korisnik = new Korisnik()
  nastavnik : Nastavnik = new Nastavnik()

  casovi : Cas[] = []
  casoviOdrzani : Cas[] = []

  ngOnInit(): void {
    let u = localStorage.getItem("mojUcenikDetalji")
    let k = localStorage.getItem("logovaniKorisnik")
    if (u != null && k!= null) {
      this.uKI = u
      this.dohvatiUcenika
      this.korisnik = JSON.parse(k)
      this.dohvatiNastavnika()
      this.dohvatiCasove()
    }
  }


  dohvatiCasove() {
    this.universalService.dohvatiCasoveUN(this.uKI, this.korisnik.korIme).subscribe(
      data => {
        if (data != null) {
          this.casovi = data
          this.casoviOdrzani = this.casovi.filter(el => el.flagOdrzan == true)

          this.casoviOdrzani = this.casoviOdrzani.map(el => {

            let dvPlus = new Date(el.datumVremeInput)
            dvPlus.setMinutes(dvPlus.getMinutes() + ((el.dupliCas == true) ? 90 : 45 ))
            return {
              nastavnik : el.nastavnik, 
              ucenik : el.ucenik, 
              predmet : el.predmet, 
              opisTemeCasa : el.opisTemeCasa, 
              datumVreme : new Date(el.datumVremeInput), 
              datumVremePlus : dvPlus, 
              datumVremeInput : el.datumVremeInput, 
              dupliCas : el.dupliCas, 
              flagPotvrda : el.flagPotvrda, 
              obrazlozenjeOdbijen : el.obrazlozenjeOdbijen, 
              flagOdrzan : el.flagOdrzan, 
              flagOtkazan : el.flagOtkazan, 
              obrazlozenjeOtkazan : el.obrazlozenjeOtkazan, 
              komentarNastavnika : el.komentarNastavnika, 
              komentarUcenika : el.komentarUcenika, 
              ocenaZaUcenika : el.ocenaZaUcenika, 
              ocenaZaNastavnika : el.ocenaZaNastavnika
            }
          })
        }
        else {
          console.log("Greska. ")
        }
      }
    )
  }


  dohvatiUcenika() {
    this.universalService.dohvatiUcenika(this.uKI).subscribe(
      data => {
        if (data != null) {
          this.ucenik = data
        }
        else {
          console.log("Greska. ")
        }
      }
    )
  }
  dohvatiNastavnika() {
    this.universalService.dohvatiNastavnika(this.korisnik.korIme).subscribe(
      data => {
        if (data != null) {
          this.nastavnik = data
        }
        else {
          console.log("Greska. ")
        }
      }
    )
  }



  nazad(event : Event) {
    event.preventDefault()
    localStorage.removeItem("mojUcenikDetalji")
    this.router.navigate(['nastavnikMojiUcenici'])
  }

}
