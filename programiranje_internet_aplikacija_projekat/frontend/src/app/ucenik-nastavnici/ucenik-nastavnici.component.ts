import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
import { UcenikService } from '../services/ucenik.service';
import { Router } from '@angular/router';
import { Nastavnik } from '../models/nastavnik';
import { UniversalService } from '../services/universal.service';

@Component({
  selector: 'app-ucenik-nastavnici',
  templateUrl: './ucenik-nastavnici.component.html',
  styleUrls: ['./ucenik-nastavnici.component.css']
})
export class UcenikNastavniciComponent {

  

  constructor(private ucenikService : UcenikService, private universalService : UniversalService, private router : Router) {}

  uIme : string = ""
  uPrezime : string = ""
  uAdresa : string = ""
  uTelefon : string = ""
  uEmail : string = ""
  uSlika : string = "../../assets/defaultProfilePicture2.jpg"
  uSlikaFajl : File | null = null
  uTipSkole : string = ""
  uRazred : number = 0

  korisnik : Korisnik = new Korisnik()
  ucenik : Ucenik = new Ucenik()

  sviNastavnici : Nastavnik[] = []
  nastavniciPretraga : Nastavnik[] = []
  nastavniciTrazeniUzrast : Nastavnik[] = []
  pretragaIme : string = ""
  pretragaPrezime : string = ""
  pretragaPredmet : string = ""

  ngOnInit(): void {
    let logovani = localStorage.getItem("logovaniKorisnik")
    if (logovani != null) {
      this.korisnik = JSON.parse(logovani);
      localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
      this.dohvatiUcenika(this.korisnik)
      this.dohvSveNastavnike()
    }
  }

  odjava(event: Event) {
    event.preventDefault();
    localStorage.removeItem("logovaniKorisnik");
    this.router.navigate(['']);
  }

  dohvatiUcenika(k : Korisnik) {
    this.ucenikService.dohvatiUcenika(k).subscribe(
      data => {
        if (data != null) {
          this.ucenik = data;
          this.uIme = this.ucenik.ime;
          this.uPrezime = this.ucenik.prezime;
          this.uAdresa = this.ucenik.adresa;
          this.uTelefon = this.ucenik.telefon;
          this.uEmail = this.ucenik.email;
          this.uSlika = this.ucenik.slika;
          this.uTipSkole = this.ucenik.tipSkole;
          this.uRazred = this.ucenik.razred;
        }
      }
    )
  }

  dohvSveNastavnike() {
    this.universalService.dohvSveNastavnike().subscribe(
      data => {
        if (data != null) {
          this.sviNastavnici = data;

          // dohvati i sve nastavnike trazenog uzrasta
          this.dohvNastavnikeTrazeniUzrast()
        }
      }
    )
  }

  dohvNastavnikeTrazeniUzrast() {
    this.nastavniciTrazeniUzrast = []

    for (let i = 0; i < this.sviNastavnici.length; i++) {

      let flagJesteTrazeniUzrast = 0

      for (let j = 0; j < this.sviNastavnici[i].uzrast.length; j++) {
        if (this.ucenik.tipSkole != "osnovna" && this.sviNastavnici[i].uzrast[j] == "srednja") { 
          flagJesteTrazeniUzrast = 1;
        }
        else if (this.ucenik.tipSkole == "osnovna" && this.ucenik.razred < 5 && this.sviNastavnici[i].uzrast[j] == "osnovna14") { 
          flagJesteTrazeniUzrast = 1;
        }
        else if (this.ucenik.tipSkole == "osnovna" && this.ucenik.razred > 4 && this.sviNastavnici[i].uzrast[j] == "osnovna58") { 
          flagJesteTrazeniUzrast = 1;
        }
      }

      if (flagJesteTrazeniUzrast == 1) this.nastavniciTrazeniUzrast.push(this.sviNastavnici[i])
    }
  }

  detaljiNastavnika(n : Nastavnik, event : Event) {
    event.preventDefault()
    localStorage.setItem("nastavnikDetalji", JSON.stringify(n))
    this.router.navigate(['nastavnikDetalji'])
  }

  pretraziNastavnike() {
    this.nastavniciPretraga = []

    for (let i = 0; i < this.sviNastavnici.length; i++) {
      if (this.sviNastavnici[i].flagAktivan == 1) {

        let flagPretragaIme = 1
        if (this.pretragaIme != "") {
          if (!this.sviNastavnici[i].ime.includes(this.pretragaIme)) flagPretragaIme = 0
        }

        let flagPretragaPrezime = 1
        if (this.pretragaPrezime != "") {
          if (!this.sviNastavnici[i].prezime.includes(this.pretragaPrezime)) flagPretragaPrezime = 0
        }

        let flagPretragaPredmet = 1
        if (this.pretragaPredmet != "") {
          let flagPredmet = 0
          for(let j = 0; j < this.sviNastavnici[i].predmeti.length; j++) {
            if (this.sviNastavnici[i].predmeti[j].naziv.includes(this.pretragaPredmet)) flagPredmet = 1
          }
          if (flagPredmet == 0) flagPretragaPredmet = 0
        }

        if (flagPretragaIme && flagPretragaPrezime && flagPretragaPredmet) this.nastavniciPretraga.push(this.sviNastavnici[i])

      }
    }

    if (this.pretragaIme == "" && this.pretragaPrezime == "" && this.pretragaPredmet == "") this.nastavniciPretraga = []
  }


  profilStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['ucenikProfil'])
  }

  nastavniciStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['ucenikNastavnici'])
  }

  casoviStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['ucenikCasovi'])
  }

  obavestenjaStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['ucenikObavestenja'])
  }

}
