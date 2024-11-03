import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Ucenik } from '../models/ucenik';
import { Obavestenje } from '../models/obavestenje';
import { Cas } from '../models/cas';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  constructor(private http : HttpClient) { }

  dohvatiUcenika(k : Korisnik) {
    return this.http.post<Ucenik>("http://localhost:4000/ucenik/dohvatiUcenika", {korIme: k.korIme, lozinka: k.lozinka})
  }

  dohvatiObavestenjaZaUcenika(ki : string) {
    return this.http.post<Obavestenje[]>("http://localhost:4000/ucenik/dohvatiObavestenjaZaUcenika", {korIme : ki})
  }

  dohvUcenikCasovi(ki : string) {
    return this.http.post<Cas[]>("http://localhost:4000/ucenik/dohvUcenikCasovi", {korIme : ki})
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------

  promeniStatusObavestenjaUBazi(o : Obavestenje) {
    return this.http.post<string>("http://localhost:4000/ucenik/promeniStatusObavestenjaUBazi", o)
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------

  izmeniIme(ki : string, ui : string) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniIme", {korIme: ki, novoIme: ui})
  }

  izmeniPrezime(ki : string, up : string) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniPrezime", {korIme: ki, novoPrezime : up})
  }

  izmeniAdresu(ki : string, ua : string) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniAdresu", {korIme: ki, novaAdresa : ua})
  }

  izmeniTelefon(ki : string, ut : string) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniTelefon", {korIme: ki, novTelefon : ut})
  }

  izmeniEmail(ki : string, ue : string) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniEmail", {korIme: ki, novEmail : ue})
  }

  izmeniSliku(ki : string, us : string) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniSliku", {korIme: ki, novaSlika : us})
  }

  izmeniTipSkole(ki : string, uts : string) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniTipSkole", {korIme: ki, noviTipSkole : uts})
  }

  izmeniRazred(ki : string, ur : number) {
    return this.http.post<string>("http://localhost:4000/ucenik/izmeniRazred", {korIme: ki, noviRazred : ur})
  }

}
