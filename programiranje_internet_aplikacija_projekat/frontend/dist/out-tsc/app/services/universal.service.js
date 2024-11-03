import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UniversalService = class UniversalService {
    constructor(http) {
        this.http = http;
    }
    dohvatiKorisnika(ki) {
        return this.http.post("http://localhost:4000/universal/dohvatiKorisnika", { korIme: ki });
    }
    dohvatiUcenika(ki) {
        return this.http.post("http://localhost:4000/universal/dohvatiUcenika", { korIme: ki });
    }
    dohvatiNastavnika(ki) {
        return this.http.post("http://localhost:4000/universal/dohvatiNastavnika", { korIme: ki });
    }
    dohvatiCasoveUN(uki, nki) {
        return this.http.post("http://localhost:4000/universal/dohvatiCasoveUN", { ucenik: uki, nastavnik: nki });
    }
    dohvatiCasoveNastavnika(nki) {
        return this.http.post("http://localhost:4000/universal/dohvatiCasoveNastavnika", { nastavnik: nki });
    }
    // ----------------------------------------------------------------------------------------------------------
    dohvSveNastavnike() {
        return this.http.get("http://localhost:4000/universal/dohvSveNastavnike");
    }
    dohvatiSveUcenike() {
        return this.http.get("http://localhost:4000/universal/dohvatiSveUcenike");
    }
    dohvSvePredmete() {
        return this.http.get("http://localhost:4000/universal/dohvSvePredmete");
    }
    dohvatiSveCasove() {
        return this.http.get("http://localhost:4000/universal/dohvatiSveCasove");
    }
    brojNastavnikaNaPredmetu(p) {
        return this.http.post("http://localhost:4000/universal/brojNastavnikaNaPredmetu", { naziv: p });
    }
    dohvBrojUcenika() {
        return this.http.get("http://localhost:4000/universal/dohvBrojUcenika");
    }
    dohvatiZahteveNastavnika() {
        return this.http.get("http://localhost:4000/universal/dohvatiZahteveNastavnika");
    }
    // ----------------------------------------------------------------------------------------------------------LOGIN/REGISTER
    login(ki, l) {
        return this.http.post("http://localhost:4000/universal/login", { korIme: ki, lozinka: l });
    }
    registrujUcenika(u) {
        return this.http.post("http://localhost:4000/universal/registrujUcenika", u);
    }
    registrujNastavnika(n) {
        return this.http.post("http://localhost:4000/universal/registrujNastavnika", n);
    }
    dodajPredlogPredmeta(p, ki) {
        return this.http.post("http://localhost:4000/universal/dodajPredlogPredmeta", { naziv: p, korIme: ki });
    }
    proveraPostojanjaKorIme(ki) {
        return this.http.post("http://localhost:4000/universal/proveraPostojanjaKorIme", { korIme: ki });
    }
    proveraPostojanjaEmail(e) {
        return this.http.post("http://localhost:4000/universal/proveraPostojanjaEmail", { email: e });
    }
    //-----------------------------------------------------------------------------------------------------------DODAJ FAJL
    dodajSliku(ki, n, s, flagUN) {
        return this.http.post("http://localhost:4000/universal/dodajSliku", { korIme: ki, naziv: n, sadrzaj: s, flagUN: flagUN });
    }
    dodajBiografiju(ki, n, s, flagUN) {
        return this.http.post("http://localhost:4000/universal/dodajBiografiju", { korIme: ki, naziv: n, sadrzaj: s, flagUN: flagUN });
    }
    dohvFajl(id, flagUN) {
        return this.http.post("http://localhost:4000/universal/dohvFajl", { id: id, flagUN: flagUN });
    }
    //-----------------------------------------------------------------------------------------------------------PROMENA LOZINKE
    promeniLozinku(ki, nl, flagTip) {
        return this.http.post("http://localhost:4000/universal/promeniLozinku", { korIme: ki, novaLozinka: nl, flagTip: flagTip });
    }
    promeniLozinkuKorisnikM(ki, nl) {
        return this.http.post("http://localhost:4000/universal/promeniLozinkuKorisnikM", { korIme: ki, novaLozinka: nl });
    }
    //-----------------------------------------------------------------------------------------------------------CASOVI
    proveraPostojiCas(d, di, ki, dc) {
        return this.http.post("http://localhost:4000/universal/proveraPostojiCas", { datumVreme: d, datumVremeInput: di, korIme: ki, dupliCas: dc });
    }
    proveraProfNedostupan(d, di, ki, dc) {
        return this.http.post("http://localhost:4000/universal/proveraProfNedostupan", { datumVreme: d, datumVremeInput: di, korIme: ki, dupliCas: dc });
    }
    zakaziCas(n, u, p, t, dv, dvi, dc) {
        return this.http.post("http://localhost:4000/universal/zakaziCas", {
            nastavnik: n,
            ucenik: u,
            predmet: p,
            opisTemeCasa: t,
            datumVreme: dv,
            datumVremeInput: dvi,
            dupliCas: dc
        });
    }
    otkaziCas(c) {
        return this.http.post("http://localhost:4000/universal/otkaziCas", c);
    }
    prihvatiCas(c) {
        return this.http.post("http://localhost:4000/universal/prihvatiCas", c);
    }
    odbijCas(c) {
        return this.http.post("http://localhost:4000/universal/odbijCas", c);
    }
    definisiNedostupnost(n, odD, doD, odI, doI) {
        return this.http.post("http://localhost:4000/universal/definisiNedostupnost", {
            nastavnik: n,
            odDatumVreme: odD,
            doDatumVreme: doD,
            odDatumVremeInput: odI,
            doDatumVremeInput: doI
        });
    }
    //----------------------------------------------------------------------------------------------------------------------ADMIN
    prihvatiZahtev(n) {
        return this.http.post("http://localhost:4000/universal/prihvatiZahtev", n);
    }
    odbijZahtev(n) {
        return this.http.post("http://localhost:4000/universal/odbijZahtev", n);
    }
    dodajPredmetAdmin(n, i) {
        return this.http.post("http://localhost:4000/universal/dodajPredmetAdmin", { naziv: n, index: i });
    }
    dohvatiSvePredloge() {
        return this.http.get("http://localhost:4000/universal/dohvatiSvePredloge");
    }
    prihvatiPredlog(p, np) {
        return this.http.post("http://localhost:4000/universal/prihvatiPredlog", { predlog: p, noviPredmet: np });
    }
    odbijPredlog(p) {
        return this.http.post("http://localhost:4000/universal/odbijPredlog", p);
    }
    deaktivirajNastavnika(ki) {
        return this.http.post("http://localhost:4000/universal/deaktivirajNastavnika", { korIme: ki });
    }
    //--------------------------------------------------------------------------------------------------------------------
    brojCasovaNastavnika2023(ki) {
        return this.http.post("http://localhost:4000/universal/brojCasovaNastavnika2023", { korIme: ki });
    }
};
UniversalService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UniversalService);
export { UniversalService };
//# sourceMappingURL=universal.service.js.map