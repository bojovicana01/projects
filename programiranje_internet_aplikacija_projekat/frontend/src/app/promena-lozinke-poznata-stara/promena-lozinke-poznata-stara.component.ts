import { Component } from '@angular/core';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
import { Nastavnik } from '../models/nastavnik';

import { sha512} from 'js-sha512';

@Component({
  selector: 'app-promena-lozinke-poznata-stara',
  templateUrl: './promena-lozinke-poznata-stara.component.html',
  styleUrls: ['./promena-lozinke-poznata-stara.component.css']
})
export class PromenaLozinkePoznataStaraComponent {

  constructor(private universalService : UniversalService, private router : Router) {}

  korIme : string = ""
  staraLozinka : string = ""
  novaLozinka1 : string = ""
  novaLozinka2 : string = ""

  korisnik : Korisnik = new Korisnik()
  ucenik : Ucenik = new Ucenik()
  nastavnik : Nastavnik = new Nastavnik()

  errMsg : string = ""

  promeniLozinku() {

    if (this.korIme == "" || this.staraLozinka == "" || this.novaLozinka1 == "" || this.novaLozinka2 == "") {
      this.errMsg = "Niste uneli sva polja. "
      return
    }

    if (this.novaLozinka1 != this.novaLozinka2) {
      this.errMsg = "Nova lozinka i ponovljena nova lozinka se ne poklapaju. "
      return
    }

    let regex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,10}$/
    if (!regex.test(this.novaLozinka1)) {
      this.errMsg = "Neispravan format lozinke. "
      return
    }

    // provera da li je stara lozinka ispravno uneta i njena promena ako jeste
    this.universalService.dohvatiKorisnika(this.korIme).subscribe(
      data => {
        if (data != null) {
          this.korisnik = data

          if (this.korisnik.flagTip == 0) {
            this.universalService.dohvatiUcenika(this.korIme).subscribe(
              data => {
                if (data != null) {
                  this.ucenik = data

                  if (this.ucenik.lozinka != sha512(this.staraLozinka)) {
                    this.errMsg = "Pogresno uneta stara lozinka. "
                    return
                  }

                  this.promeniLozinkuKorisnikM()
    
                  this.universalService.promeniLozinku(this.korIme, this.novaLozinka1, this.korisnik.flagTip).subscribe(
                    data => {
                      if (data != null) {
                        alert("Lozinka promenjena. ")
                        this.router.navigate([''])
                      }
                      else {
                        console.log("Greska. ")
                      }
                    }
                  )

                }
              }
            )
          }
          else if (this.korisnik.flagTip == 1) {
            this.universalService.dohvatiNastavnika(this.korIme).subscribe(
              data => {
                if (data != null) {
                  this.nastavnik = data

                  if (this.nastavnik.lozinka != sha512(this.staraLozinka)) {
                    this.errMsg = "Pogresno uneta stara lozinka. "
                    return
                  }

                  this.promeniLozinkuKorisnikM()
    
                  this.universalService.promeniLozinku(this.korIme, this.novaLozinka1, this.korisnik.flagTip).subscribe(
                    data => {
                      if (data != null) {
                        alert("Lozinka promenjena. ")
                        this.router.navigate([''])
                      }
                      else {
                        console.log("Greska. ")
                      }
                    }
                  )
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

  promeniLozinkuKorisnikM() {
    this.universalService.promeniLozinkuKorisnikM(this.korIme, this.novaLozinka1).subscribe(
      data => {
        if (data == null) {
          console.log("Greska. ")
        }
      }
    )
  }

  nazad(event : Event) {
    event.preventDefault()
    this.router.navigate([''])
  }

}
