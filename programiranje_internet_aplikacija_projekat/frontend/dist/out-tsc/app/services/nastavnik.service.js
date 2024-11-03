import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let NastavnikService = class NastavnikService {
    constructor(http) {
        this.http = http;
    }
    dohvatiNastavnika(k) {
        return this.http.post("http://localhost:4000/nastavnik/dohvatiNastavnika", { korIme: k.korIme, lozinka: k.lozinka });
    }
    dohvUcenikeOdrzanCas(ki) {
        return this.http.post("http://localhost:4000/nastavnik/dohvUcenikeOdrzanCas", { korIme: ki });
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------
    izmeniIme(ki, ni) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniIme", { korIme: ki, novoIme: ni });
    }
    izmeniPrezime(ki, np) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniPrezime", { korIme: ki, novoPrezime: np });
    }
    izmeniAdresu(ki, na) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniAdresu", { korIme: ki, novaAdresa: na });
    }
    izmeniTelefon(ki, nt) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniTelefon", { korIme: ki, novTelefon: nt });
    }
    izmeniEmail(ki, ne) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniEmail", { korIme: ki, novEmail: ne });
    }
    izmeniSliku(ki, ns) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniSliku", { korIme: ki, novaSlika: ns });
    }
    izmeniPredmete(ki, lp) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniPredmete", { korIme: ki, predmeti: lp });
    }
    izmeniUzraste(ki, lu) {
        return this.http.post("http://localhost:4000/nastavnik/izmeniUzraste", { korIme: ki, uzrast: lu });
    }
};
NastavnikService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NastavnikService);
export { NastavnikService };
//# sourceMappingURL=nastavnik.service.js.map