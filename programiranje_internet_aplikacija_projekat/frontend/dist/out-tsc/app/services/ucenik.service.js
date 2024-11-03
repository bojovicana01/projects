import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UcenikService = class UcenikService {
    constructor(http) {
        this.http = http;
    }
    dohvatiUcenika(k) {
        return this.http.post("http://localhost:4000/ucenik/dohvatiUcenika", { korIme: k.korIme, lozinka: k.lozinka });
    }
    dohvatiObavestenjaZaUcenika(ki) {
        return this.http.post("http://localhost:4000/ucenik/dohvatiObavestenjaZaUcenika", { korIme: ki });
    }
    dohvUcenikCasovi(ki) {
        return this.http.post("http://localhost:4000/ucenik/dohvUcenikCasovi", { korIme: ki });
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------
    promeniStatusObavestenjaUBazi(o) {
        return this.http.post("http://localhost:4000/ucenik/promeniStatusObavestenjaUBazi", o);
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------
    izmeniIme(ki, ui) {
        return this.http.post("http://localhost:4000/ucenik/izmeniIme", { korIme: ki, novoIme: ui });
    }
    izmeniPrezime(ki, up) {
        return this.http.post("http://localhost:4000/ucenik/izmeniPrezime", { korIme: ki, novoPrezime: up });
    }
    izmeniAdresu(ki, ua) {
        return this.http.post("http://localhost:4000/ucenik/izmeniAdresu", { korIme: ki, novaAdresa: ua });
    }
    izmeniTelefon(ki, ut) {
        return this.http.post("http://localhost:4000/ucenik/izmeniTelefon", { korIme: ki, novTelefon: ut });
    }
    izmeniEmail(ki, ue) {
        return this.http.post("http://localhost:4000/ucenik/izmeniEmail", { korIme: ki, novEmail: ue });
    }
    izmeniSliku(ki, us) {
        return this.http.post("http://localhost:4000/ucenik/izmeniSliku", { korIme: ki, novaSlika: us });
    }
    izmeniTipSkole(ki, uts) {
        return this.http.post("http://localhost:4000/ucenik/izmeniTipSkole", { korIme: ki, noviTipSkole: uts });
    }
    izmeniRazred(ki, ur) {
        return this.http.post("http://localhost:4000/ucenik/izmeniRazred", { korIme: ki, noviRazred: ur });
    }
};
UcenikService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UcenikService);
export { UcenikService };
//# sourceMappingURL=ucenik.service.js.map