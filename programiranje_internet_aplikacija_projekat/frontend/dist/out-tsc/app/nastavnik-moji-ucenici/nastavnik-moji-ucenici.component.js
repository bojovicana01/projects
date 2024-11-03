import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Nastavnik } from '../models/nastavnik';
import { Ucenik } from '../models/ucenik';
let NastavnikMojiUceniciComponent = class NastavnikMojiUceniciComponent {
    constructor(nastavnikService, universalService, router) {
        this.nastavnikService = nastavnikService;
        this.universalService = universalService;
        this.router = router;
        this.korisnik = new Korisnik();
        this.nastavnik = new Nastavnik();
        this.uceniciOdrzanCas = [];
        this.uceniciOdrzanCasObjekti = [];
    }
    ngOnInit() {
        let logovani = localStorage.getItem("logovaniKorisnik");
        if (logovani != null) {
            this.korisnik = JSON.parse(logovani);
            this.dohvatiNastavnika(this.korisnik);
            this.dohvUcenikeOdrzanCas();
        }
    }
    odjava(event) {
        event.preventDefault();
        localStorage.removeItem("logovaniKorisnik");
        this.router.navigate(['']);
    }
    dohvatiNastavnika(k) {
        this.universalService.dohvatiNastavnika(k.korIme).subscribe(data => {
            if (data != null) {
                this.nastavnik = data;
            }
        });
    }
    dohvUcenikeOdrzanCas() {
        this.nastavnikService.dohvUcenikeOdrzanCas(this.korisnik.korIme).subscribe(data => {
            if (data != null) {
                console.log(this.uceniciOdrzanCas);
                this.uceniciOdrzanCas = data;
                for (let i = 0; i < this.uceniciOdrzanCas.length; i++) {
                    this.uceniciOdrzanCasObjekti[i] = new Ucenik();
                    this.universalService.dohvatiUcenika(this.uceniciOdrzanCas[i]).subscribe(data => {
                        if (data != null) {
                            this.uceniciOdrzanCasObjekti[i] = data;
                        }
                        else {
                            console.log("Greska. ");
                        }
                    });
                }
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    mojUcenikDetalji(u, event) {
        event.preventDefault();
        let ucenik = new Ucenik();
        this.universalService.dohvatiUcenika(u).subscribe(data => {
            if (data != null) {
                ucenik = data;
                localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
                localStorage.setItem("mojUcenikDetalji", u);
                this.router.navigate(['mojUcenikDetalji']);
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    profilStr(event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        this.router.navigate(['nastavnikProfil']);
    }
    casoviStr(event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        this.router.navigate(['nastavnikCasovi']);
    }
    mojiUceniciStr(event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        this.router.navigate(['nastavnikMojiUcenici']);
    }
};
NastavnikMojiUceniciComponent = __decorate([
    Component({
        selector: 'app-nastavnik-moji-ucenici',
        templateUrl: './nastavnik-moji-ucenici.component.html',
        styleUrls: ['./nastavnik-moji-ucenici.component.css']
    })
], NastavnikMojiUceniciComponent);
export { NastavnikMojiUceniciComponent };
//# sourceMappingURL=nastavnik-moji-ucenici.component.js.map