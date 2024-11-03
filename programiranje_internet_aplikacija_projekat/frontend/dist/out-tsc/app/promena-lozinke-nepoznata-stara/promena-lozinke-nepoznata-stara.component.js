import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
import { Nastavnik } from '../models/nastavnik';
let PromenaLozinkeNepoznataStaraComponent = class PromenaLozinkeNepoznataStaraComponent {
    constructor(universalService, router) {
        this.universalService = universalService;
        this.router = router;
        this.korIme = "";
        this.bezbedonosiniOdgovor = "";
        this.novaLozinka1 = "";
        this.novaLozinka2 = "";
        this.unetoKorIme = false;
        this.unetBOdgovor = false;
        this.errMsgBOdgovor = "";
        this.errMsg = "";
        this.korisnik = new Korisnik();
        this.ucenik = new Ucenik();
        this.nastavnik = new Nastavnik();
    }
    promeniLozinku() {
        if (this.novaLozinka1 == "" || this.novaLozinka2 == "") {
            this.errMsg = "Nisu uneta sva polja. ";
            return;
        }
        if (this.novaLozinka1 != this.novaLozinka2) {
            this.errMsg = "Nova lozinka i ponovljena nova lozinka se ne poklapaju. ";
            return;
        }
        let regex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,10}$/;
        if (!regex.test(this.novaLozinka1)) {
            this.errMsg = "Neispravan format lozinke. ";
            return;
        }
        this.promeniLozinkuKorisnikM();
        this.universalService.promeniLozinku(this.korIme, this.novaLozinka1, this.korisnik.flagTip).subscribe(data => {
            if (data != null) {
                alert("Lozinka promenjena. ");
                this.router.navigate(['']);
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    promeniLozinkuKorisnikM() {
        this.universalService.promeniLozinkuKorisnikM(this.korIme, this.novaLozinka1).subscribe(data => {
            if (data == null) {
                console.log("Greska. ");
            }
        });
    }
    korImeUneto() {
        this.universalService.dohvatiKorisnika(this.korIme).subscribe(data => {
            if (data != null) {
                this.korisnik = data;
                this.unetoKorIme = true;
                this.dohvatiUN();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    bOdgovorUnet() {
        if (this.korisnik.flagTip == 0) {
            if (this.ucenik.bezbedonosniOdgovor == this.bezbedonosiniOdgovor) {
                this.unetBOdgovor = true;
                this.errMsgBOdgovor = "";
            }
            else {
                this.errMsgBOdgovor = "Netacan bezbedonosni odgovor. ";
            }
        }
    }
    dohvatiUN() {
        if (this.korisnik.flagTip == 0) {
            this.universalService.dohvatiUcenika(this.korisnik.korIme).subscribe(data => {
                if (data != null) {
                    this.ucenik = data;
                }
            });
        }
        else if (this.korisnik.flagTip == 1) {
            this.universalService.dohvatiNastavnika(this.korisnik.korIme).subscribe(data => {
                if (data != null) {
                    this.nastavnik = data;
                }
            });
        }
    }
    nazad(event) {
        event.preventDefault();
        this.router.navigate(['']);
    }
};
PromenaLozinkeNepoznataStaraComponent = __decorate([
    Component({
        selector: 'app-promena-lozinke-nepoznata-stara',
        templateUrl: './promena-lozinke-nepoznata-stara.component.html',
        styleUrls: ['./promena-lozinke-nepoznata-stara.component.css']
    })
], PromenaLozinkeNepoznataStaraComponent);
export { PromenaLozinkeNepoznataStaraComponent };
//# sourceMappingURL=promena-lozinke-nepoznata-stara.component.js.map