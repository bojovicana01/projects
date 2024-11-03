import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
let UcenikObavestenjaComponent = class UcenikObavestenjaComponent {
    constructor(ucenikService, universalService, router) {
        this.ucenikService = ucenikService;
        this.universalService = universalService;
        this.router = router;
        this.korisnik = new Korisnik();
        this.ucenik = new Ucenik();
        this.ucenikObavestenja = [];
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
    dohvatiUcenika(k) {
        this.ucenikService.dohvatiUcenika(k).subscribe(data => {
            if (data != null) {
                this.ucenik = data;
                this.dohvatiObavestenjaZaUcenika();
            }
        });
    }
    dohvatiObavestenjaZaUcenika() {
        this.ucenikService.dohvatiObavestenjaZaUcenika(this.ucenik.korIme).subscribe(data => {
            if (data != null) {
                this.ucenikObavestenja = data;
            }
        });
    }
    promeniStatusObavestenjaUBazi(o) {
        this.ucenikService.promeniStatusObavestenjaUBazi(o).subscribe(data => {
            if (data != null) {
                console.log("Izmenjen status obavestenja. ");
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
UcenikObavestenjaComponent = __decorate([
    Component({
        selector: 'app-ucenik-obavestenja',
        templateUrl: './ucenik-obavestenja.component.html',
        styleUrls: ['./ucenik-obavestenja.component.css']
    })
], UcenikObavestenjaComponent);
export { UcenikObavestenjaComponent };
//# sourceMappingURL=ucenik-obavestenja.component.js.map