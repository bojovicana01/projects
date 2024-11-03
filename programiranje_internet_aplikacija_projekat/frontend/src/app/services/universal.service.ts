import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { Predmet } from '../models/predmet';
import { raceWith } from 'rxjs';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
import { Fajl } from '../models/fajl';
import { Cas } from '../models/cas';
import { Predlog } from '../models/predlog';

@Injectable({
  providedIn: 'root'
})
export class UniversalService {

  constructor(private http : HttpClient) { }

  dohvatiKorisnika(ki : string) {
    return this.http.post<Korisnik>("http://localhost:4000/universal/dohvatiKorisnika", {korIme: ki})
  }

  dohvatiUcenika(ki : string) {
    return this.http.post<Ucenik>("http://localhost:4000/universal/dohvatiUcenika", {korIme: ki})
  }

  dohvatiNastavnika(ki : string) {
    return this.http.post<Nastavnik>("http://localhost:4000/universal/dohvatiNastavnika", {korIme: ki})
  }

  dohvatiCasoveUN(uki : string, nki : string) {
    return this.http.post<Cas[]>("http://localhost:4000/universal/dohvatiCasoveUN", {ucenik: uki, nastavnik: nki})
  }

  dohvatiCasoveNastavnika(nki : string) {
    return this.http.post<Cas[]>("http://localhost:4000/universal/dohvatiCasoveNastavnika", {nastavnik: nki})
  }

  // ----------------------------------------------------------------------------------------------------------

  dohvSveNastavnike() {
    return this.http.get<Nastavnik[]>("http://localhost:4000/universal/dohvSveNastavnike");
  }

  dohvatiSveUcenike() {
    return this.http.get<Ucenik[]>("http://localhost:4000/universal/dohvatiSveUcenike");
  }

  dohvSvePredmete() {
    return this.http.get<Predmet[]>("http://localhost:4000/universal/dohvSvePredmete");
  }

  dohvatiSveCasove() {
    return this.http.get<Cas[]>("http://localhost:4000/universal/dohvatiSveCasove");
  }

  brojNastavnikaNaPredmetu(p: string) {
    return this.http.post<number>("http://localhost:4000/universal/brojNastavnikaNaPredmetu", {naziv: p})
  }

  dohvBrojUcenika() {
    return this.http.get<number>("http://localhost:4000/universal/dohvBrojUcenika");
  }

  dohvatiZahteveNastavnika() {
    return this.http.get<Nastavnik[]>("http://localhost:4000/universal/dohvatiZahteveNastavnika");
  }

  // ----------------------------------------------------------------------------------------------------------LOGIN/REGISTER

  login(ki : string, l : string) {
    return this.http.post<Korisnik>("http://localhost:4000/universal/login", {korIme: ki, lozinka: l})
  }

  registrujUcenika(u : Ucenik) {
    return this.http.post<String>("http://localhost:4000/universal/registrujUcenika", u)
  }

  registrujNastavnika(n : Nastavnik) {
    return this.http.post<String>("http://localhost:4000/universal/registrujNastavnika", n)
  }

  dodajPredlogPredmeta(p: string, ki: string) {
    return this.http.post<string>("http://localhost:4000/universal/dodajPredlogPredmeta", {naziv: p, korIme: ki})
  }

  proveraPostojanjaKorIme(ki : string) {
    return this.http.post<String>("http://localhost:4000/universal/proveraPostojanjaKorIme", {korIme: ki})
  }

  proveraPostojanjaEmail(e : string) {
    return this.http.post<String>("http://localhost:4000/universal/proveraPostojanjaEmail", {email: e})
  }

  //-----------------------------------------------------------------------------------------------------------DODAJ FAJL

  dodajSliku(ki : string, n : string, s : string, flagUN : number) {
    return this.http.post<string>("http://localhost:4000/universal/dodajSliku", {korIme : ki, naziv : n, sadrzaj : s, flagUN : flagUN})
  }

  dodajBiografiju(ki : string, n : string, s : string, flagUN : number) {
    return this.http.post<string>("http://localhost:4000/universal/dodajBiografiju", {korIme: ki, naziv : n, sadrzaj : s, flagUN : flagUN})
  }

  dohvFajl(id : string, flagUN : number) {
    return this.http.post<string>("http://localhost:4000/universal/dohvFajl", {id : id, flagUN : flagUN})
  }

  //-----------------------------------------------------------------------------------------------------------PROMENA LOZINKE

  promeniLozinku(ki : string, nl : string, flagTip : number) {
    return this.http.post<string>("http://localhost:4000/universal/promeniLozinku", {korIme : ki, novaLozinka : nl, flagTip : flagTip})
  }

  promeniLozinkuKorisnikM(ki : string, nl : string) {
    return this.http.post<string>("http://localhost:4000/universal/promeniLozinkuKorisnikM", {korIme : ki, novaLozinka : nl})
  }

  //-----------------------------------------------------------------------------------------------------------CASOVI

  proveraPostojiCas(d : Date, di : string, ki : string, dc : boolean) {
    return this.http.post<boolean>("http://localhost:4000/universal/proveraPostojiCas", 
    {datumVreme : d, datumVremeInput: di, korIme : ki, dupliCas : dc})
  }

  proveraProfNedostupan(d : Date, di : string, ki : string, dc : boolean) {
    return this.http.post<boolean>("http://localhost:4000/universal/proveraProfNedostupan", 
    {datumVreme : d, datumVremeInput : di, korIme : ki, dupliCas : dc})
  }

  zakaziCas(n : string, u : string, p : string, t : string, dv: Date, dvi : string, dc : boolean) {
    return this.http.post<boolean>("http://localhost:4000/universal/zakaziCas", {
      nastavnik : n, 
      ucenik : u, 
      predmet : p, 
      opisTemeCasa : t, 
      datumVreme : dv, 
      datumVremeInput : dvi, 
      dupliCas : dc
    })
  }

  otkaziCas(c: Cas) {
    return this.http.post<string>("http://localhost:4000/universal/otkaziCas", c)
  }

  prihvatiCas(c: Cas) {
    return this.http.post<string>("http://localhost:4000/universal/prihvatiCas", c)
  }

  odbijCas(c: Cas) {
    return this.http.post<string>("http://localhost:4000/universal/odbijCas", c)
  }

  definisiNedostupnost(n: string, odD: Date, doD: Date, odI: string, doI: string) {
    return this.http.post<string>("http://localhost:4000/universal/definisiNedostupnost", 
    {
      nastavnik : n, 
      odDatumVreme : odD, 
      doDatumVreme : doD, 
      odDatumVremeInput : odI, 
      doDatumVremeInput : doI
    })
  }

  //----------------------------------------------------------------------------------------------------------------------ADMIN

  prihvatiZahtev(n: Nastavnik) {
    return this.http.post<string>("http://localhost:4000/universal/prihvatiZahtev", n)
  }

  odbijZahtev(n: Nastavnik) {
    return this.http.post<string>("http://localhost:4000/universal/odbijZahtev", n)
  }

  dodajPredmetAdmin(n: string, i: number) {
    return this.http.post<string>("http://localhost:4000/universal/dodajPredmetAdmin", {naziv: n, index: i})
  }

  dohvatiSvePredloge() {
    return this.http.get<Predlog[]>("http://localhost:4000/universal/dohvatiSvePredloge");
  }

  prihvatiPredlog(p: Predlog, np: Predmet) {
    return this.http.post<string>("http://localhost:4000/universal/prihvatiPredlog", {predlog: p, noviPredmet: np})
  }

  odbijPredlog(p: Predlog) {
    return this.http.post<string>("http://localhost:4000/universal/odbijPredlog", p)
  }

  deaktivirajNastavnika(ki: string) {
    return this.http.post<string>("http://localhost:4000/universal/deaktivirajNastavnika", {korIme: ki})
  }

  //--------------------------------------------------------------------------------------------------------------------

  brojCasovaNastavnika2023(ki: string) {
    return this.http.post<number[]>("http://localhost:4000/universal/brojCasovaNastavnika2023", {korIme: ki})
  }

}
