import { Component } from '@angular/core';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private universalService : UniversalService, private router : Router)  {}

  korIme : string = ""
  lozinka : string = ""

  korisnik : Korisnik = new Korisnik()

  errMsg : string = ""

  login() {
    this.universalService.login(this.korIme, this.lozinka).subscribe(
      data => {
        if (data != null) {
          this.errMsg = ""
          this.korisnik = data
          localStorage.setItem("logovaniKorisnik", JSON.stringify(data))

          if (data.flagTip == 2) {
            this.router.navigate(['admin'])
          }
          else {
            alert("Niste admin. ")
          }
        }
        else {
          this.errMsg = "Nepostojeci korisnik. "
        }
      }
    )
    }

}
