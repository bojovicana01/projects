import { Component, OnInit } from '@angular/core';
import { UniversalService } from '../services/universal.service';
import { Router } from '@angular/router';
import { Nastavnik } from '../models/nastavnik';
import { Predmet } from '../models/predmet';

@Component({
  selector: 'app-registracija-nastavnik',
  templateUrl: './registracija-nastavnik.component.html',
  styleUrls: ['./registracija-nastavnik.component.css']
})
export class RegistracijaNastavnikComponent implements OnInit{

  constructor(private universalService : UniversalService, private router : Router) {}

  ngOnInit(): void {
    this.dohvSvePredmete()
  }

  korIme : string = ""
  lozinka : string = ""
  bezbedonosnoPitanje : string = ""
  bezbedonosniOdgovor : string = ""
  ime : string = ""
  prezime : string = ""
  pol : string = ""
  adresa : string = ""
  telefon : string = ""
  email : string = ""
  slika : string = "../../assets/defaultProfilePicture2.jpg"
  biografija : string = ""
  gdeJeCuoZaSajt : string = ""

  uzrastTemp : string[] = ["", "", ""]
  uzrast : string[] = []
  uzrastCheckFlag : boolean[] = [false, false, false]

  sviPredmeti : Predmet[] = []
  predmetiTemp : string[] = []
  predmeti : Predmet[] = []
  predmetiCheckFlag : boolean[] = []

  errKorIme : string = "" //
  errLozinka : string = ""
  errBezbedonosnoPitanje : string = "" //
  errBezbedonosniOdgovor : string = "" //
  errIme : string = "" //
  errPrezime : string = "" //
  errPol : string = "" //
  errAdresa : string = "" //
  errTelefon : string = "" //
  errEmail : string = "" //
  errSlika : string = "" //
  errBiografija : string = ""
  errUzrast : string = ""
  errPredmeti : string = ""
  errGdeJeCuoZaSajt : string = ""

  errMsg : string = ""
  errKorImePostoji : string = ""
  errEmailPostoji : string = ""

  slikaFajl : any
  flagIzabranaSlika : number = 0
  slikaFajlId : string = ""

  bioFajl : any
  flagIzabranBio : number = 0
  bioFajlId : string = ""

  predlogPredmeta : string = ""

  checkUncheckUzrast(index : number, event : any) {

    let val = event.target.value

    if (this.uzrastCheckFlag[index] == true) {
      this.uzrastTemp[index] = val;
    }
    else {
      this.uzrastTemp[index] = ""
    }
      
  }

  checkUncheckPredmet(index : number, event : any) {

    let val = event.target.value

    if (this.predmetiCheckFlag[index] == true) {
      this.predmetiTemp[index] = val;
    }
    else {
      this.predmetiTemp[index] = ""
    }
      
  }

  registrujNastavnika() {

    for (let i = 0; i < this.uzrastTemp.length; i++) {
      if (this.uzrastTemp[i] != "") this.uzrast.push(this.uzrastTemp[i])
    }

    for (let i = 0; i < this.predmetiTemp.length; i++) {
      if (this.predmetiTemp[i] != "") {
        let p = this.dohvPredmetPoNazivu(this.predmetiTemp[i])
        this.predmeti.push(p)
      }
    }

    //----------------------------------------------------------------------------------

    let flagErrValidacija = this.validacija();
    if (flagErrValidacija == 1) {
      this.uzrast = []
      this.predmeti = []
      return;
    }

    console.log(this.korIme)

    this.universalService.proveraPostojanjaKorIme(this.korIme).subscribe(
      data => {
        if (data != null) {
          if (data == 'postoji') {
            console.log('u kor ime postoji')
            this.errKorImePostoji = "Korisnicko ime vec postoji. ";
            this.uzrast = []
            this.predmeti = []
            return;
          }
          else {
            this.errKorImePostoji = "";

            this.universalService.proveraPostojanjaEmail(this.email).subscribe(
              data => {
                if (data != null) {
                  if (data == 'postoji') {
                    this.errEmailPostoji = "E-mail vec postoji. ";
                    this.uzrast = []
                    this.predmeti = []
                    return;
                  }
                  else {
                    this.errEmailPostoji = "";
                    
                    this.dodajPredlogPredmeta()
                    this.dodavanjeNastavnika()
                  }
                }
                else {
                  console.log("Greska. ")
                }
              }
            )

          }
        }
        else {
          console.log("Greska. ")
        }
      }
    )
    
  }

  dodavanjeNastavnika() {
    let nastavnik = new Nastavnik()
    nastavnik.korIme = this.korIme;
    nastavnik.lozinka = this.lozinka;
    nastavnik.bezbedonosnoPitanje = this.bezbedonosnoPitanje;
    nastavnik.bezbedonosniOdgovor = this.bezbedonosniOdgovor;
    nastavnik.ime = this.ime;
    nastavnik.prezime = this.prezime;
    nastavnik.pol = this.pol;
    nastavnik.adresa = this.adresa;
    nastavnik.telefon = this.telefon;
    nastavnik.email = this.email;

    nastavnik.slika = "../../assets/defaultProfilePicture2.jpg";
    nastavnik.slikaId = ""
    nastavnik.biografija = "pocetniTekst"
    nastavnik.biografijaId = ""

    // pokupiti predmete i uzrast koji su tipa niza
    nastavnik.uzrast = this.uzrast
    nastavnik.predmeti = this.predmeti
    nastavnik.gdeJeCuoZaSajt = this.gdeJeCuoZaSajt


    nastavnik.flagAktivan = 2;

    this.universalService.registrujNastavnika(nastavnik).subscribe(
      data => {
        if (data != null) {
          if (this.flagIzabranaSlika) this.dodajSliku()
          this.dodajBiografiju()
          this.router.navigate([''])
        }
        else {
          console.log("Greska. ")
        }
      }
    )
  }

  dodajPredlogPredmeta() {
    if (this.predlogPredmeta != "") {
      this.universalService.dodajPredlogPredmeta(this.predlogPredmeta, this.korIme).subscribe(
        data => {
          if (data == null) {
            console.log("Greska. ")
          }
        }
      )
    }
  }

  izabranaSlika(event : any) {
    this.slikaFajl = event.target.files[0];
    this.flagIzabranaSlika = 1
  }

  izabranaBiografija(event : any) {
    this.bioFajl = event.target.files[0]
    this.flagIzabranBio = 1
  }

  dodajSliku() {
    let slikaFajlName = this.slikaFajl.name

    let fajlCitac = new FileReader()
    fajlCitac.onload = async() => {
      let sadrzaj = fajlCitac.result as string

      let slikaImgObj = await createImageBitmap(this.slikaFajl)

      if (slikaImgObj.width < 100 || slikaImgObj.width > 300 || slikaImgObj.height < 100 || slikaImgObj.height > 300) {
        alert("Slika je neodgovarajucih dimenzija, mora imati sirinu/visinu >100 i <300. ")
        return
      }
      else {
        this.universalService.dodajSliku(this.korIme, slikaFajlName, sadrzaj, 1).subscribe(
          data => {
            this.slikaFajlId = data;
          }
        )
      }
    }

    if (this.slikaFajl) {
      fajlCitac.readAsDataURL(this.slikaFajl)
    }
  }

  dodajBiografiju() {
    let bioFajlName = this.bioFajl.name

    let fajlCitac = new FileReader()
    fajlCitac.onload = async() => {
      let sadrzaj = fajlCitac.result as string
      this.universalService.dodajBiografiju(this.korIme, bioFajlName, sadrzaj, 1).subscribe(
        data => {
          this.bioFajlId = data;
        }
      )
    }

    if (this.bioFajl) {
      fajlCitac.readAsDataURL(this.bioFajl)
    }
  }

  proveraPostojanjaKorIme(ki : string) : boolean {
    this.universalService.proveraPostojanjaKorIme(ki).subscribe(
      data => {
        if (data != null) {
          if (data == 'postoji') return true;
          else return false;
        }
        else {
          return false;
        }
      }
    )
    return false;
  }

  proveraPostojanjaEmail(e : string) : boolean {
    this.universalService.proveraPostojanjaEmail(e).subscribe(
      data => {
        if (data != null) {
          if (data == 'postoji') return true;
          else return false;
        }
        else {
          return false;
        }
      }
    )
    return false;
  }


  validacija() : number {
    let flagErr = 0;

    if (this.korIme == "") {
      this.errKorIme = "Niste uneli korisnicko ime. "
      flagErr = 1
    }
    else {
      this.errKorIme = ""
    }

    if (this.bezbedonosnoPitanje == "") 
    {
      this.errBezbedonosnoPitanje = "Niste uneli bezbedonosno pitanje. "
      flagErr = 1
    }
    else {
      this.errBezbedonosnoPitanje = ""
    }

    if (this.bezbedonosniOdgovor == "") {
      this.errBezbedonosniOdgovor = "Niste uneli bezbedonosni odgovor. "
      flagErr = 1
    }
    else {
      this.errBezbedonosniOdgovor = ""
    }

    if (this.ime == "") {
      this.errIme = "Niste uneli ime. "
      flagErr = 1
    }
    else {
      this.errIme = ""
    }

    if (this.prezime == "") {
      this.errPrezime = "Niste uneli prezime. "
      flagErr = 1
    }
    else{
      this.errPrezime = ""
    }

    if (this.pol == "") {
      this.errPol = "Niste odabrali pol. "
      flagErr = 1
    }
    else {
      this.errPol = ""
    }

    if (this.adresa == "") {
      this.errAdresa = "Niste uneli adresu. "
      flagErr = 1
    }
    else {
      this.errAdresa = ""
    }

    if (this.telefon == "") {
      this.errTelefon = "Niste uneli telefon. "
      flagErr = 1
    }
    else {
      this.errTelefon = ""
    }

    if (this.email == "") {
      this.errEmail = "Niste uneli email. "
      flagErr = 1
    }
    else {
      this.errEmail = ""
    }

    let regex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,10}$/
    if (!regex.test(this.lozinka)) {
      this.errLozinka = "Neispravna lozinka. "
      flagErr = 1
    }
    else {
      this.errLozinka = ""
    }

    if (!this.flagIzabranBio) {
      this.errBiografija = "Morate priloziti biografiju. "
      flagErr = 1
    }
    else {
      this.errBiografija = ""
    }

    if (this.uzrast.length == 0) {
      this.errUzrast = "Niste uneli uzrast. "
      flagErr = 1
    }
    else {
      this.errUzrast = ""
    }

    if (this.predmeti.length == 0) {
      this.errPredmeti = "Niste uneli predmete. "
      flagErr = 1
    }
    else {
      this.errPredmeti = ""
    }


    return flagErr;
  }

  dohvSvePredmete() {
    this.universalService.dohvSvePredmete().subscribe(
      data => {
        if (data != null) {
          this.errMsg = "";
          this.sviPredmeti = data;

          for (let i = 0; i < this.sviPredmeti.length; i++) {
            this.predmetiCheckFlag[i] = false;
            this.predmetiTemp[i] = ""
          }
        }
        else {
          this.errMsg = "Greska";
        }
      }
    )
  }

  dohvPredmetPoNazivu(n : string) : Predmet {
    let p = new Predmet()
    for (let i = 0; i < this.sviPredmeti.length; i++) {
      if (this.sviPredmeti[i].naziv == n) {
        p.naziv = this.sviPredmeti[i].naziv
        p.index = this.sviPredmeti[i].index
      }
    }
    return p
  }

}
