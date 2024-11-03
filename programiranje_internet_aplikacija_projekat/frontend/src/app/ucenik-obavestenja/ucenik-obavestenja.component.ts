import { Component, OnInit } from '@angular/core';
import { UcenikService } from '../services/ucenik.service';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
import { Obavestenje } from '../models/obavestenje';

@Component({
  selector: 'app-ucenik-obavestenja',
  templateUrl: './ucenik-obavestenja.component.html',
  styleUrls: ['./ucenik-obavestenja.component.css']
})
export class UcenikObavestenjaComponent implements OnInit {

  constructor(private ucenikService : UcenikService, private universalService : UniversalService, private router : Router) {}

  korisnik : Korisnik = new Korisnik()
  ucenik : Ucenik = new Ucenik()

  ucenikObavestenja : Obavestenje[] =[]

  ngOnInit(): void {
    let logovani = localStorage.getItem("logovaniKorisnik")
    if (logovani != null) {
      this.korisnik = JSON.parse(logovani);
      this.dohvatiUcenika(this.korisnik)
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
          this.dohvatiObavestenjaZaUcenika();
        }
      }
    )
  }

  dohvatiObavestenjaZaUcenika() {
    this.ucenikService.dohvatiObavestenjaZaUcenika(this.ucenik.korIme).subscribe(
      data => {
        if (data != null) {
          this.ucenikObavestenja = data
        }
      }
    )
  }

  promeniStatusObavestenjaUBazi(o : Obavestenje) {
    this.ucenikService.promeniStatusObavestenjaUBazi(o).subscribe(
      data => {
        if (data != null) {
          console.log("Izmenjen status obavestenja. ")
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
