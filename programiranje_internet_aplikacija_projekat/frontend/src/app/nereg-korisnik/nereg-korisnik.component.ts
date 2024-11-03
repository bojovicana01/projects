import { Component, OnInit } from '@angular/core';
import { UniversalService } from '../services/universal.service';
import { Nastavnik } from '../models/nastavnik';
import { Predmet } from '../models/predmet';
import { Ucenik } from '../models/ucenik';
import { Router } from '@angular/router';
import { Cas } from '../models/cas';

@Component({
  selector: 'app-nereg-korisnik',
  templateUrl: './nereg-korisnik.component.html',
  styleUrls: ['./nereg-korisnik.component.css']
})
export class NeregKorisnikComponent implements OnInit {

  constructor(private universalService : UniversalService, private router : Router) {}

  brojUcenika : number = 0
  brojAktivnihNastavnika : number = 0
  brojCasovaPoslNedelja : number = 0
  brojCasovaPoslMesec : number = 0

  sviPredmeti : Predmet[] = []
  sviNastavnici : Nastavnik[] = []
  sviUcenici : Ucenik[] = []
  sviCasovi : Cas[] = []

  casoviOdrzaniPoslNedelja : Cas[] = []
  casoviOdrzaniPoslMesec : Cas[] = []

  nastavniciPretraga : Nastavnik[] = []

  poRedovima : Predmet[][] = []

  pretragaIme : string = ""
  pretragaPrezime : string = ""
  pretragaPredmet : string = ""

  sortIme : string = ""
  sortPrezime : string = ""
  sortPredmet : string = ""

  errMsg : string = ""

  ngOnInit(): void {
    this.inicijalizujStranicu();
  }

  inicijalizujStranicu() {
    this.dohvSvePredmete();
    this.dohvBrojUcenika();
    this.dohvatiSveCasove()
    this.dohvSveNastavnike();
    this.izracunajBrojAktivnihNastavnika();
  }

  izdeliNiz(array: any[], size: number): any[] {
    const isecenNiz = [];
    for (let i = 0; i < array.length; i += size) {
      isecenNiz.push(array.slice(i, i + size));
    }
    return isecenNiz;
  }

  dohvSveNastavnike() {
    this.universalService.dohvSveNastavnike().subscribe(
      data => {
        if (data != null) {
          this.sviNastavnici = data;

          this.brojAktivnihNastavnika = 0
          for (let i = 0; i < this.sviNastavnici.length; i++) {
            if (this.sviNastavnici[i].flagAktivan == 1) this.brojAktivnihNastavnika = this.brojAktivnihNastavnika + 1
          }
        }
      }
    )
  }

  dohvatiSveCasove() {
    this.universalService.dohvatiSveCasove().subscribe(
      data => {
        if (data != null) {
          this.sviCasovi = data

          let danasnjiDatum = new Date()

          this.casoviOdrzaniPoslNedelja = []
          this.casoviOdrzaniPoslMesec = []

          for (let i = 0; i < this.sviCasovi.length; i++) {

            let nedelju = new Date(this.sviCasovi[i].datumVremeInput)
            nedelju.setDate(nedelju.getDate() + 7)

            let mesec = new Date(this.sviCasovi[i].datumVremeInput)
            mesec.setDate(mesec.getDate() + 30)

            if (this.sviCasovi[i].flagOdrzan == true && (nedelju >= danasnjiDatum)) {
              this.casoviOdrzaniPoslNedelja.push(this.sviCasovi[i])
            }

            if (this.sviCasovi[i].flagOdrzan == true && (mesec >= danasnjiDatum)) {
              this.casoviOdrzaniPoslMesec.push(this.sviCasovi[i])
            }

          }

          this.brojCasovaPoslNedelja = this.casoviOdrzaniPoslNedelja.length
          this.brojCasovaPoslMesec = this.casoviOdrzaniPoslMesec.length
        }
        else {
          this.errMsg = "Greska";
        }
      }
    )
  }

  dohvSvePredmete() {
    this.universalService.dohvSvePredmete().subscribe(
      data => {
        if (data != null) {
          this.errMsg = "";
          this.sviPredmeti = data;
          this.poRedovima = this.izdeliNiz(this.sviPredmeti, 4);
        }
        else {
          this.errMsg = "Greska";
        }
      }
    )
  }

  dohvBrojUcenika() {
    this.universalService.dohvBrojUcenika().subscribe(
      data => {
        if (data != null) {
          this.errMsg = "";
          this.brojUcenika = data;
          localStorage.setItem("brojUcenika", JSON.stringify(data))
        }
        else {
          this.errMsg = "Greska";
        }
      }
    )
  }

  izracunajBrojAktivnihNastavnika() {
    this.brojAktivnihNastavnika = 0
    console.log(this.sviNastavnici)
    for (let i = 0; i < this.sviNastavnici.length; i++) {
      if (this.sviNastavnici[i].flagAktivan == 1) this.brojAktivnihNastavnika = this.brojAktivnihNastavnika + 1
    }

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


  sortirajIme() {
    if (this.sortIme == "opadajuce") {
      this.sviNastavnici.sort((a, b) => (a.ime < b.ime) ? 1 : -1)
    }
    else if (this.sortIme == "rastuce") {
      this.sviNastavnici.sort((a, b) => (a.ime < b.ime) ? -1 : 1)
    }
  }

  sortirajPrezime() {
    if (this.sortPrezime == "opadajuce") {
      this.sviNastavnici.sort((a, b) => (a.prezime < b.prezime) ? 1 : -1)
    }
    else if (this.sortPrezime == "rastuce") {
      this.sviNastavnici.sort((a, b) => (a.prezime < b.prezime) ? -1 : 1)
    }
  }

  sortirajPredmet() {
    if (this.sortPredmet == "opadajuce") {
      for (let i = 0; i < this.sviNastavnici.length; i++) {
        this.sviNastavnici[i].predmeti.sort((a, b) => (a.naziv < b.naziv) ? 1 : -1)
      }
    }
    else if (this.sortPredmet == "rastuce") {
      for (let i = 0; i < this.sviNastavnici.length; i++) {
        this.sviNastavnici[i].predmeti.sort((a, b) => (a.naziv < b.naziv) ? -1 : 1)
      }
    }
  }

  loginStr(event : Event) {
    event.preventDefault()
    this.router.navigate(['login'])
  }

  registerStr(event : Event) {
    event.preventDefault()
    this.router.navigate(['register'])
  }

  promenaLozinkeStr(event : Event) {
    event.preventDefault()
    this.router.navigate(['promenaLozinke'])
  }

}


