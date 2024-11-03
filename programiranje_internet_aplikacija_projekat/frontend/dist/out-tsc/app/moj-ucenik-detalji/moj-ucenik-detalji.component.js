import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Ucenik } from '../models/ucenik';
import { Korisnik } from '../models/korisnik';
import { Nastavnik } from '../models/nastavnik';
let MojUcenikDetaljiComponent = class MojUcenikDetaljiComponent {
    constructor(nastavnikService, universalService, router) {
        this.nastavnikService = nastavnikService;
        this.universalService = universalService;
        this.router = router;
        this.uKI = "";
        this.ucenik = new Ucenik();
        this.korisnik = new Korisnik();
        this.nastavnik = new Nastavnik();
        this.casovi = [];
        this.casoviOdrzani = [];
    }
    ngOnInit() {
        let u = localStorage.getItem("mojUcenikDetalji");
        let k = localStorage.getItem("logovaniKorisnik");
        if (u != null && k != null) {
            this.uKI = u;
            this.dohvatiUcenika;
            this.korisnik = JSON.parse(k);
            this.dohvatiNastavnika();
            this.dohvatiCasove();
        }
    }
    dohvatiCasove() {
        this.universalService.dohvatiCasoveUN(this.uKI, this.korisnik.korIme).subscribe(data => {
            if (data != null) {
                this.casovi = data;
                this.casoviOdrzani = this.casovi.filter(el => el.flagOdrzan == true);
                this.casoviOdrzani = this.casoviOdrzani.map(el => {
                    let dvPlus = new Date(el.datumVremeInput);
                    dvPlus.setMinutes(dvPlus.getMinutes() + ((el.dupliCas == true) ? 90 : 45));
                    return {
                        nastavnik: el.nastavnik,
                        ucenik: el.ucenik,
                        predmet: el.predmet,
                        opisTemeCasa: el.opisTemeCasa,
                        datumVreme: new Date(el.datumVremeInput),
                        datumVremePlus: dvPlus,
                        datumVremeInput: el.datumVremeInput,
                        dupliCas: el.dupliCas,
                        flagPotvrda: el.flagPotvrda,
                        obrazlozenjeOdbijen: el.obrazlozenjeOdbijen,
                        flagOdrzan: el.flagOdrzan,
                        flagOtkazan: el.flagOtkazan,
                        obrazlozenjeOtkazan: el.obrazlozenjeOtkazan,
                        komentarNastavnika: el.komentarNastavnika,
                        komentarUcenika: el.komentarUcenika,
                        ocenaZaUcenika: el.ocenaZaUcenika,
                        ocenaZaNastavnika: el.ocenaZaNastavnika
                    };
                });
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiUcenika() {
        this.universalService.dohvatiUcenika(this.uKI).subscribe(data => {
            if (data != null) {
                this.ucenik = data;
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiNastavnika() {
        this.universalService.dohvatiNastavnika(this.korisnik.korIme).subscribe(data => {
            if (data != null) {
                this.nastavnik = data;
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    nazad(event) {
        event.preventDefault();
        localStorage.removeItem("mojUcenikDetalji");
        this.router.navigate(['nastavnikMojiUcenici']);
    }
};
MojUcenikDetaljiComponent = __decorate([
    Component({
        selector: 'app-moj-ucenik-detalji',
        templateUrl: './moj-ucenik-detalji.component.html',
        styleUrls: ['./moj-ucenik-detalji.component.css']
    })
], MojUcenikDetaljiComponent);
export { MojUcenikDetaljiComponent };
//# sourceMappingURL=moj-ucenik-detalji.component.js.map