import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Nastavnik } from '../models/nastavnik';
let LoginComponent = class LoginComponent {
    constructor(universalService, router) {
        this.universalService = universalService;
        this.router = router;
        this.korIme = "";
        this.lozinka = "";
        this.korisnik = new Korisnik();
        this.errMsg = "";
        this.nn = new Nastavnik();
    }
    login() {
        this.universalService.login(this.korIme, this.lozinka).subscribe(data => {
            if (data != null) {
                this.errMsg = "";
                this.korisnik = data;
                localStorage.setItem("logovaniKorisnik", JSON.stringify(data));
                if (data.flagTip == 0) {
                    this.router.navigate(['ucenikProfil']);
                }
                else if (data.flagTip == 1) {
                    this.universalService.dohvatiNastavnika(data.korIme).subscribe(data => {
                        if (data != null) {
                            this.nn = data;
                            if (this.nn.flagAktivan == 1) {
                                this.router.navigate(['nastavnikProfil']);
                            }
                            else {
                                alert("Niste jos verifikovani kao nastavnik. ");
                                localStorage.removeItem("logovaniKorisnik");
                                this.router.navigate(['']);
                            }
                        }
                        else {
                            console.log("Greska. ");
                        }
                    });
                }
            }
            else {
                this.errMsg = "Nepostojeci korisnik. ";
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map