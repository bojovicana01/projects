import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nastavnik } from '../models/nastavnik';
import { Korisnik } from '../models/korisnik';
import { Predmet } from '../models/predmet';
import { Ucenik } from '../models/ucenik';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {

  constructor(private http : HttpClient) { }

  dohvatiNastavnika(k : Korisnik) {
    return this.http.post<Nastavnik>("http://localhost:4000/nastavnik/dohvatiNastavnika", {korIme: k.korIme, lozinka: k.lozinka})
  }

  dohvUcenikeOdrzanCas(ki: string) {
    return this.http.post<string[]>("http://localhost:4000/nastavnik/dohvUcenikeOdrzanCas", {korIme: ki})
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------

  izmeniIme(ki : string, ni : string) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniIme", {korIme: ki, novoIme: ni})
  }

  izmeniPrezime(ki : string, np : string) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniPrezime", {korIme: ki, novoPrezime : np})
  }

  izmeniAdresu(ki : string, na : string) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniAdresu", {korIme: ki, novaAdresa : na})
  }

  izmeniTelefon(ki : string, nt : string) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniTelefon", {korIme: ki, novTelefon : nt})
  }

  izmeniEmail(ki : string, ne : string) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniEmail", {korIme: ki, novEmail : ne})
  }

  izmeniSliku(ki : string, ns : string) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniSliku", {korIme: ki, novaSlika : ns})
  }

  izmeniPredmete(ki : string, lp : Predmet[]) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniPredmete", {korIme: ki, predmeti: lp})
  }

  izmeniUzraste(ki : string, lu : string[]) {
    return this.http.post<string>("http://localhost:4000/nastavnik/izmeniUzraste", {korIme: ki, uzrast: lu})
  }

}
