import { Component, OnInit } from '@angular/core';
import { UcenikService } from '../services/ucenik.service';
import { Router } from '@angular/router';
import { Nastavnik } from '../models/nastavnik';
import { Predmet } from '../models/predmet';
import { UniversalService } from '../services/universal.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-nastavnik-detalji',
  templateUrl: './nastavnik-detalji.component.html',
  styleUrls: ['./nastavnik-detalji.component.css']
})
export class NastavnikDetaljiComponent implements OnInit {

  constructor(private ucenikService : UcenikService, private universalService : UniversalService , private router : Router) {}

  nastavnik : Nastavnik = new Nastavnik()

  predmet : string = ""
  opisTemeCasa : string = ""
  datumVreme : Date = new Date()
  datumVremeInput : any
  dupliCas : boolean = false

  flagMozeSeZakazati : boolean = false
  flagProfZauzet : boolean = false
  flagProfNedostupan : boolean = false

  ucenikKojiJeLogovan : Korisnik = new Korisnik()

  message : string = ""

  ngOnInit(): void {
    let n = localStorage.getItem("nastavnikDetalji")
    let k = localStorage.getItem("logovaniKorisnik")
    if (n != null && k != null) {
      this.ucenikKojiJeLogovan = JSON.parse(k)
      this.nastavnik = JSON.parse(n)
      this.predmet = this.nastavnik.predmeti[0].naziv
    }
  }

  zakaziCas() {

    this.flagProfZauzet = false;
    this.flagProfNedostupan = false;

    this.flagMozeSeZakazati = false
    this.datumVreme = new Date(this.datumVremeInput)

    if (this.datumVreme < new Date()) {
      alert("Niste izabrali validan datum i vreme. ")
      return
    }

    // provera da li je u skolpu radnog vremena izabrano vreme
    let dvPlusProvera = new Date(this.datumVremeInput)
    if (this.dupliCas == true) dvPlusProvera.setMinutes(dvPlusProvera.getMinutes() + 90)
    else dvPlusProvera.setMinutes(dvPlusProvera.getMinutes() + 45)

    if ((this.datumVreme.getHours() < 10 || dvPlusProvera.getHours() > 18) || (this.datumVreme.getDay() == 6 || this.datumVreme.getDay() == 0)) {
      alert("Vreme koje ste izabrali nije radno vreme nastavnika. ")
      return
    }

    // provera da li postoji zakazan cas u to vreme
    this.universalService.proveraPostojiCas(this.datumVreme, this.datumVremeInput, this.nastavnik.korIme, this.dupliCas).subscribe(
      data => {
        if (data != null) {
          this.flagProfZauzet = data
          if (this.flagProfZauzet) this.message = "Nastavnik je zauzet u tom terminu zbog drugih casova. "

          // provera da li je nastavnik nedostupan u to vreme
          this.universalService.proveraProfNedostupan(this.datumVreme, this.datumVremeInput, this.nastavnik.korIme, this.dupliCas).subscribe(
          data => {
              if (data != null) {

                this.flagProfNedostupan = data
                if (this.flagProfNedostupan) this.message = "Nastavnik nije dostupan tada. "

                if (!this.flagProfZauzet && !this.flagProfNedostupan) {
                  this.flagMozeSeZakazati = true
                  this.message = "Vas cas je zakazan. "
                }

                //this.validacijaMogucnostiOdrzavanjaCasa()

                if (this.flagMozeSeZakazati == true) {
                  this.universalService.zakaziCas(this.nastavnik.korIme, this.ucenikKojiJeLogovan.korIme, 
                    this.predmet, this.opisTemeCasa, this.datumVreme, this.datumVremeInput, this.dupliCas).subscribe(
                      data => {
                        if (data != null) {
                          alert(this.message)
                        }
                        else {
                          console.log("Greska. ")
                        }
                      }
                    )
                }
                else {
                  alert(this.message)
                }

              }
              else {
                console.log("Greska. ")
              }
            }
          )
        }
        else {
          console.log("Greska. ")
        }
      }
    )

  }

  profZauzetProvera() {
    this.universalService.proveraPostojiCas(this.datumVreme, this.datumVremeInput, this.nastavnik.korIme, this.dupliCas).subscribe(
      data => {
        if (data != null) {
          this.flagProfZauzet = data
        }
        else {
          console.log("Greska. ")
        }
      }
    )

  }

  profNedostupanProvera() {
    this.universalService.proveraProfNedostupan(this.datumVreme, this.datumVremeInput, this.nastavnik.korIme, this.dupliCas).subscribe(
      data => {
        if (data != null) {
          this.flagProfNedostupan = data
        }
        else {
          console.log("Greska. ")
        }
      }
    )
  }

  nazad(event : Event) {
    event.preventDefault()
    localStorage.removeItem("nastavnikDetalji")
    this.router.navigate(['ucenikNastavnici'])
  }


}
