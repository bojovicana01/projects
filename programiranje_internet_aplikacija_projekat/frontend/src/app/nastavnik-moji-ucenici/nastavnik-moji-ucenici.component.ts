import { Component } from '@angular/core';
import { NastavnikService } from '../services/nastavnik.service';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Nastavnik } from '../models/nastavnik';
import { Ucenik } from '../models/ucenik';

@Component({
  selector: 'app-nastavnik-moji-ucenici',
  templateUrl: './nastavnik-moji-ucenici.component.html',
  styleUrls: ['./nastavnik-moji-ucenici.component.css']
})
export class NastavnikMojiUceniciComponent {

  constructor(private nastavnikService : NastavnikService, private universalService : UniversalService, private router : Router) {}

  korisnik : Korisnik = new Korisnik()
  nastavnik : Nastavnik = new Nastavnik()

  uceniciOdrzanCas : string[] = []
  uceniciOdrzanCasObjekti : Ucenik[] = []

  ngOnInit(): void {
    let logovani = localStorage.getItem("logovaniKorisnik")
    if (logovani != null) {
      this.korisnik = JSON.parse(logovani);
      this.dohvatiNastavnika(this.korisnik);
      this.dohvUcenikeOdrzanCas();
    }
  }

  odjava(event: Event) {
    event.preventDefault();
    localStorage.removeItem("logovaniKorisnik");
    this.router.navigate(['']);
  }

  dohvatiNastavnika(k : Korisnik) {
    this.universalService.dohvatiNastavnika(k.korIme).subscribe(
      data => {
        if (data != null) {
          this.nastavnik = data;
        }
      }
    )
  }

  dohvUcenikeOdrzanCas() {
    this.nastavnikService.dohvUcenikeOdrzanCas(this.korisnik.korIme).subscribe(
      data => {
        if (data != null) {
          console.log(this.uceniciOdrzanCas)
          this.uceniciOdrzanCas = data

          for (let i = 0; i < this.uceniciOdrzanCas.length; i++) {
            this.uceniciOdrzanCasObjekti[i] = new Ucenik()
            this.universalService.dohvatiUcenika(this.uceniciOdrzanCas[i]).subscribe(
              data => {
                if (data != null) {
                  this.uceniciOdrzanCasObjekti[i] = data
                }
                else {
                  console.log("Greska. ")
                }
              }
            )
          }
        }
        else {
          console.log("Greska. ")
        }
      }
    )
  }

  mojUcenikDetalji(u: string, event: Event) {
    event.preventDefault()
    let ucenik = new Ucenik()
    this.universalService.dohvatiUcenika(u).subscribe(
      data => {
        if (data != null) {
          ucenik = data
          localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
          localStorage.setItem("mojUcenikDetalji", u)
          this.router.navigate(['mojUcenikDetalji'])
        }
        else {
          console.log("Greska. ")
        }
      }
    )
  }

  profilStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['nastavnikProfil'])
  }

  casoviStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['nastavnikCasovi'])
  }

  mojiUceniciStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['nastavnikMojiUcenici'])
  }

}
