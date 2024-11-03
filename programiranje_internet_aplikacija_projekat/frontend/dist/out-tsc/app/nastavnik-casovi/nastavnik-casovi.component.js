import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Nastavnik } from '../models/nastavnik';
import { Ucenik } from '../models/ucenik';
let NastavnikCasoviComponent = class NastavnikCasoviComponent {
    constructor(nastavnikService, universalService, router) {
        this.nastavnikService = nastavnikService;
        this.universalService = universalService;
        this.router = router;
        this.korisnik = new Korisnik();
        this.nastavnik = new Nastavnik();
        this.casovi = [];
        this.casoviNarednaTriDana = [];
        this.uceniciCasoviNarednaTriDanaObjekti = [];
        this.brojPrikazanihCasova = 5;
        this.listaZahtevaCasovi = [];
        this.uceniciListaZahtevaCasoviObjekti = [];
        this.obrazlozenjeOdbijanja = [];
        this.odNedostupanDate = new Date();
        this.doNedostupanDate = new Date();
    }
    definisiNedostupnost() {
        this.odNedostupanDate = new Date(this.odNedostupan);
        this.doNedostupanDate = new Date(this.doNedostupan);
        // provera da li su odabrani datumi pre danasnjeg dana
        if (this.odNedostupanDate < new Date() || this.doNedostupanDate < new Date()) {
            alert("Niste izabrali validan datum i vreme. ");
            return;
        }
        // provera da li postoje casovi koji smo potvrdili u to vreme
        let potvrdjeniCasovi = this.casovi.filter(el => el.flagPotvrda == 1 && el.flagOtkazan == false
            && ((el.datumVreme >= this.odNedostupanDate && el.datumVreme <= this.doNedostupanDate)
                ||
                    (el.datumVremePlus >= this.odNedostupanDate && el.datumVremePlus <= this.doNedostupanDate)));
        if (potvrdjeniCasovi.length > 0) {
            alert("U datom intervalu vec imate zakazane casove. ");
            return;
        }
        else {
            this.universalService.definisiNedostupnost(this.korisnik.korIme, this.odNedostupanDate, this.doNedostupanDate, this.odNedostupan, this.doNedostupan).subscribe(data => {
                if (data != null) {
                    alert("Uspesno ste definisali nedostupnost. ");
                }
                else {
                    console.log("Greska. ");
                }
            });
        }
    }
    //--------------------------------------------------------------------------------------------------KRAJ DEFINISANJA NEDOSTUPNOSTI
    ngOnInit() {
        let logovani = localStorage.getItem("logovaniKorisnik");
        if (logovani != null) {
            this.korisnik = JSON.parse(logovani);
            this.dohvatiNastavnika(this.korisnik);
            this.dohvatiCasoveNastavnika();
        }
    }
    odjava(event) {
        event.preventDefault();
        localStorage.removeItem("logovaniKorisnik");
        this.router.navigate(['']);
    }
    otkaziCas(c) {
        // treba da proverimo da li je trenutni momenat pre od zakazanog minus 4h
        let dvMinus4h = new Date(c.datumVremeInput);
        dvMinus4h.setHours(dvMinus4h.getHours() - 4);
        if (new Date() >= dvMinus4h) {
            alert("Cas uskoro pocinje ne mozete ga otkazati. ");
            return;
        }
        else {
            this.universalService.otkaziCas(c).subscribe(data => {
                if (data != null) {
                    this.dohvatiNastavnika(this.korisnik);
                    this.dohvatiCasoveNastavnika();
                }
                else {
                    console.log("Greska. ");
                }
            });
        }
    }
    prihvatiCas(c) {
        this.universalService.prihvatiCas(c).subscribe(data => {
            if (data != null) {
                this.dohvatiNastavnika(this.korisnik);
                this.dohvatiCasoveNastavnika();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    odbijCas(c, i) {
        console.log(i);
        if (this.obrazlozenjeOdbijanja[i] == "") {
            alert("Morate uneti obrazlozenje. ");
            return;
        }
        else {
            c.obrazlozenjeOdbijen = this.obrazlozenjeOdbijanja[i];
            this.universalService.odbijCas(c).subscribe(data => {
                if (data != null) {
                    this.dohvatiNastavnika(this.korisnik);
                    this.dohvatiCasoveNastavnika();
                }
                else {
                    console.log("Greska. ");
                }
            });
        }
    }
    prikaziPetCasova() {
        this.brojPrikazanihCasova = 5;
    }
    prikaziDesetCasova() {
        this.brojPrikazanihCasova = 10;
    }
    prikaziSveCasove() {
        this.brojPrikazanihCasova = this.casoviNarednaTriDana.length;
    }
    range(length) {
        return Array.from({ length }, (_, index) => index);
    }
    dohvatiCasoveNastavnika() {
        this.universalService.dohvatiCasoveNastavnika(this.korisnik.korIme).subscribe(data => {
            if (data != null) {
                this.casovi = data;
                this.casovi = this.casovi.map(el => {
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
                // lista zahteva za casove
                this.listaZahtevaCasovi = this.casovi.filter(el => el.flagPotvrda == 2);
                for (let i = 0; i < this.listaZahtevaCasovi.length; i++) {
                    this.uceniciListaZahtevaCasoviObjekti[i] = new Ucenik();
                    this.universalService.dohvatiUcenika(this.listaZahtevaCasovi[i].ucenik).subscribe(data => {
                        if (data != null) {
                            this.uceniciListaZahtevaCasoviObjekti[i] = data;
                            this.obrazlozenjeOdbijanja[i] = "";
                        }
                        else {
                            console.log("Greska. ");
                        }
                    });
                }
                // odobreni casovi koji slede u naredna tri dana
                let danasnjiDatum = new Date();
                let triDanaKasnije = new Date();
                triDanaKasnije.setDate(triDanaKasnije.getDate() + 3);
                this.casoviNarednaTriDana = this.casovi.filter(el => el.flagPotvrda == 1 && el.flagOtkazan == false && el.datumVreme >= danasnjiDatum && el.datumVreme <= triDanaKasnije);
                this.casoviNarednaTriDana.sort((a, b) => (a.datumVreme > b.datumVreme) ? 1 : -1);
                for (let i = 0; i < this.casoviNarednaTriDana.length; i++) {
                    this.uceniciCasoviNarednaTriDanaObjekti[i] = new Ucenik();
                    this.universalService.dohvatiUcenika(this.casoviNarednaTriDana[i].ucenik).subscribe(data => {
                        if (data != null) {
                            this.uceniciCasoviNarednaTriDanaObjekti[i] = data;
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
    dohvatiNastavnika(k) {
        this.universalService.dohvatiNastavnika(k.korIme).subscribe(data => {
            if (data != null) {
                this.nastavnik = data;
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
NastavnikCasoviComponent = __decorate([
    Component({
        selector: 'app-nastavnik-casovi',
        templateUrl: './nastavnik-casovi.component.html',
        styleUrls: ['./nastavnik-casovi.component.css']
    })
], NastavnikCasoviComponent);
export { NastavnikCasoviComponent };
//# sourceMappingURL=nastavnik-casovi.component.js.map