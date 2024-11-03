import { Component } from '@angular/core';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Nastavnik } from '../models/nastavnik';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private universalService : UniversalService, private router : Router)  {}

  korIme : string = ""
  lozinka : string = ""

  korisnik : Korisnik = new Korisnik()

  errMsg : string = ""

  nn: Nastavnik = new Nastavnik()

  login() {
    this.universalService.login(this.korIme, this.lozinka).subscribe(
      data => {
        if (data != null) {
          this.errMsg = ""
          this.korisnik = data
          localStorage.setItem("logovaniKorisnik", JSON.stringify(data))

          if (data.flagTip == 0) {
            this.router.navigate(['ucenikProfil'])
          }
          else if (data.flagTip == 1) {

            this.universalService.dohvatiNastavnika(data.korIme).subscribe(
              data => {
                if (data != null) {

                  this.nn = data
                  if (this.nn.flagAktivan == 1) {
                    this.router.navigate(['nastavnikProfil'])
                  }
                  else {
                    alert("Niste jos verifikovani kao nastavnik. ")
                    localStorage.removeItem("logovaniKorisnik")
                    this.router.navigate([''])
                  }

                }
                else {
                  console.log("Greska. ")
                }
              }
            )

          }
        }
        else {
          this.errMsg = "Nepostojeci korisnik. "
        }
      }
    )
  }

}
