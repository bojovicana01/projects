import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
let UcenikCasoviComponent = class UcenikCasoviComponent {
    constructor(ucenikService, universalService, router) {
        this.ucenikService = ucenikService;
        this.universalService = universalService;
        this.router = router;
        this.korisnik = new Korisnik();
        this.ucenik = new Ucenik();
        this.casoviUcenik = [];
        this.casoviUcenikOdrzani = [];
        this.casoviUcenikPredstojeci = [];
    }
    ngOnInit() {
        let logovani = localStorage.getItem("logovaniKorisnik");
        if (logovani != null) {
            this.korisnik = JSON.parse(logovani);
            this.dohvatiUcenika(this.korisnik);
        }
    }
    odjava(event) {
        event.preventDefault();
        localStorage.removeItem("logovaniKorisnik");
        this.router.navigate(['']);
    }
    oceniCas(cas) {
        localStorage.setItem("ocenjivanjeNastavnikaOdStraneUcenika", JSON.stringify(cas));
        this.router.navigate(['ocenjivanjeNastavnika']);
    }
    dohvatiUcenika(k) {
        this.universalService.dohvatiUcenika(k.korIme).subscribe(data => {
            if (data != null) {
                this.ucenik = data;
                this.dohvUcenikCasovi();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiNastavnika(kin) {
        this.universalService.dohvatiNastavnika(kin).subscribe(data => {
            if (data != null) {
                return (data.ime + " " + data.prezime);
            }
            else {
                console.log("Greska. ");
                return "";
            }
        });
        return "1";
    }
    dohvUcenikCasovi() {
        this.ucenikService.dohvUcenikCasovi(this.ucenik.korIme).subscribe(data => {
            if (data != null) {
                this.casoviUcenik = data;
                this.casoviUcenikOdrzani = this.casoviUcenik.filter(el => el.flagOdrzan == true && el.flagPotvrda == 1 && el.flagOtkazan == false);
                this.casoviUcenikPredstojeci = this.casoviUcenik.filter(el => el.flagOdrzan == false && el.flagPotvrda == 1 && el.flagOtkazan == false);
                this.casoviUcenikOdrzani = this.casoviUcenikOdrzani.map(el => {
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
                this.casoviUcenikPredstojeci = this.casoviUcenikPredstojeci.map(el => {
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
                this.casoviUcenikOdrzani = this.casoviUcenikOdrzani.filter(el => new Date() > el.datumVreme);
                this.casoviUcenikPredstojeci = this.casoviUcenikPredstojeci.filter(el => new Date() < el.datumVreme);
                this.casoviUcenikOdrzani.sort((a, b) => (new Date(a.datumVremeInput) < new Date(b.datumVremeInput)) ? 1 : -1);
                this.casoviUcenikPredstojeci.sort((a, b) => (new Date(a.datumVremeInput) < new Date(b.datumVremeInput)) ? -1 : 1);
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    profilStr(event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        this.router.navigate(['ucenikProfil']);
    }
    nastavniciStr(event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        this.router.navigate(['ucenikNastavnici']);
    }
    casoviStr(event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        this.router.navigate(['ucenikCasovi']);
    }
    obavestenjaStr(event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        this.router.navigate(['ucenikObavestenja']);
    }
};
UcenikCasoviComponent = __decorate([
    Component({
        selector: 'app-ucenik-casovi',
        templateUrl: './ucenik-casovi.component.html',
        styleUrls: ['./ucenik-casovi.component.css']
    })
], UcenikCasoviComponent);
export { UcenikCasoviComponent };
//# sourceMappingURL=ucenik-casovi.component.js.map