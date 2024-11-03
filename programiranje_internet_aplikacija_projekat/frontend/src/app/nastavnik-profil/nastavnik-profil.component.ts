import { Component } from '@angular/core';
import { NastavnikService } from '../services/nastavnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { UniversalService } from '../services/universal.service';
import { Predmet } from '../models/predmet';
import { Nastavnik } from '../models/nastavnik';

@Component({
  selector: 'app-nastavnik-profil',
  templateUrl: './nastavnik-profil.component.html',
  styleUrls: ['./nastavnik-profil.component.css']
})
export class NastavnikProfilComponent {

  constructor(private nastavnikService : NastavnikService, private universalService : UniversalService, private router : Router) {}

  nIme : string = ""
  nPrezime : string = ""
  nAdresa : string = ""
  nTelefon : string = ""
  nEmail : string = ""
  nSlika : string = "../../assets/defaultProfilePicture2.jpg"
  nSlikaFajl : File | null = null
  nPredmeti : Predmet[] = []
  nUzrast : string[] = []

  korisnik : Korisnik = new Korisnik()
  nastavnik : Nastavnik = new Nastavnik()

  nSlikaPrikaz : string = ""

  slikaFajl : any
  flagIzabranaSlika : number = 0
  slikaFajlId : string = ""

  ngOnInit(): void {
    let logovani = localStorage.getItem("logovaniKorisnik")
    if (logovani != null) {
      this.korisnik = JSON.parse(logovani);
      this.dohvatiNastavnika(this.korisnik);
      this.dohvSvePredmete();
    }
  }

  odjava(event: Event) {
    event.preventDefault();
    localStorage.removeItem("logovaniKorisnik");
    this.router.navigate(['']);
  }

  dohvatiNastavnika(k : Korisnik) {
    this.universalService.dohvatiNastavnika(k.korIme).subscribe(
      data => {
        if (data != null) {
          this.nastavnik = data;
          this.nIme = this.nastavnik.ime;
          this.nPrezime = this.nastavnik.prezime;
          this.nAdresa = this.nastavnik.adresa;
          this.nTelefon = this.nastavnik.telefon;
          this.nEmail = this.nastavnik.email;
          this.nSlika = this.nastavnik.slika;
          this.nPredmeti = this.nastavnik.predmeti;
          this.nUzrast = this.nastavnik.uzrast;

          if (this.nastavnik.slika == "../../assets/defaultProfilePicture2.jpg") {
            this.nSlikaPrikaz = "../../assets/defaultProfilePicture2.jpg";
          }
          else {
            let nSlikaId = this.nastavnik.slikaId;
            this.dohvFajl(nSlikaId);
            console.log(this.nSlikaPrikaz)
          }
        }
      }
    )
  }

  dohvFajl(id : string) {
    this.universalService.dohvFajl(id, 0).subscribe(
      data => {
        if (data != null) {
          this.nSlikaPrikaz = data
        }
      }
    )
  }
//-----------------------------------------------------------------------------------------IZMENA PREDMETA I UZRASTA

  uzrastTemp : string[] = ["", "", ""]
  uzrast : string[] = []
  uzrastCheckFlag : boolean[] = [false, false, false]

  sviPredmeti : Predmet[] = []
  predmetiTemp : string[] = []
  predmeti : Predmet[] = []
  predmetiCheckFlag : boolean[] = []

  errUzrast : string = ""
  errPredmeti : string = ""

  izmeniPredmete() {
    for (let i = 0; i < this.predmetiTemp.length; i++) {
      if (this.predmetiTemp[i] != "") {
        let p = this.dohvPredmetPoNazivu(this.predmetiTemp[i])
        this.predmeti.push(p)
      }
    }

    if (this.predmeti.length == 0) {
      this.errPredmeti = "Niste uneli predmete. "
      this.predmeti = []
      return
    }
    else {
      this.errPredmeti = ""

      this.nastavnikService.izmeniPredmete(this.nastavnik.korIme, this.predmeti).subscribe(
        data => {
          if (data != null) {
            this.dohvatiNastavnika(this.korisnik)
            this.predmeti = []

          }
          else {
            alert("Nije izmenjeno. ")
          }
        }
      )
    }
  }

  izmeniUzraste() {
    for (let i = 0; i < this.uzrastTemp.length; i++) {
      if (this.uzrastTemp[i] != "") this.uzrast.push(this.uzrastTemp[i])
    }

    if (this.uzrast.length == 0) {
      this.errUzrast = "Niste uneli uzrast. "
      this.uzrast = []
      return
    }
    else {
      this.errUzrast = ""

      this.nastavnikService.izmeniUzraste(this.nastavnik.korIme, this.uzrast).subscribe(
        data => {
          if (data != null) {
            this.dohvatiNastavnika(this.korisnik)
            this.uzrast = []
          }
          else {
            alert("Nije izmenjeno. ")
          }
        }
      )
    }
  }


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

  dohvSvePredmete() {
    this.universalService.dohvSvePredmete().subscribe(
      data => {
        if (data != null) {
          this.sviPredmeti = data;

          for (let i = 0; i < this.sviPredmeti.length; i++) {
            this.predmetiCheckFlag[i] = false;
            this.predmetiTemp[i] = ""
          }
        }
        else {
          console.log("Greska. ")
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
//-----------------------------------------------------------------------------------------IZMENA PREDMETA I UZRASTA KRAJ


  izmeniSliku() {

    if (this.flagIzabranaSlika) {
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
          this.universalService.dodajSliku(this.nastavnik.korIme, slikaFajlName, sadrzaj, 1).subscribe(
            data => {
              this.slikaFajlId = data;
              this.dohvatiNastavnika(this.korisnik)
            }
          )
        }
      }

      if (this.slikaFajl) {
        fajlCitac.readAsDataURL(this.slikaFajl)
      }
    }
  }

  izabranaSlika(event : any) {
    this.slikaFajl = event.target.files[0];
    this.flagIzabranaSlika = 1
  }

  izmeniIme() {
    this.nastavnikService.izmeniIme(this.nastavnik.korIme, this.nIme).subscribe(
      data => {
        if (data != null) {
          this.dohvatiNastavnika(this.korisnik)
        }
        else {
          alert("Nije izmenjeno. ")
        }
      }
    )
  }

  izmeniPrezime() {
    this.nastavnikService.izmeniPrezime(this.nastavnik.korIme, this.nPrezime).subscribe(
      data => {
        if (data != null) {
          this.dohvatiNastavnika(this.korisnik)
        }
        else {
          alert("Nije izmenjeno. ")
        }
      }
    )
  }

  izmeniAdresu() {
    this.nastavnikService.izmeniAdresu(this.nastavnik.korIme, this.nAdresa).subscribe(
      data => {
        if (data != null) {
          this.dohvatiNastavnika(this.korisnik)
        }
        else {
          alert("Nije izmenjeno. ")
        }
      }
    )
  }

  izmeniTelefon() {
    this.nastavnikService.izmeniTelefon(this.nastavnik.korIme, this.nTelefon).subscribe(
      data => {
        if (data != null) {
          this.dohvatiNastavnika(this.korisnik)
        }
        else {
          alert("Nije izmenjeno. ")
        }
      }
    )
  }

  izmeniEmail() {
    this.nastavnikService.izmeniEmail(this.nastavnik.korIme, this.nEmail).subscribe(
      data => {
        if (data != null) {
          if (data == 'Trazeni mejl vec postoji. ') alert(data)
          this.dohvatiNastavnika(this.korisnik)
        }
        else {
          alert("Nije izmenjeno. ")
        }
      }
    )
  }

  profilStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['nastavnikProfil'])
  }

  casoviStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['nastavnikCasovi'])
  }

  mojiUceniciStr(event : Event) {
    event.preventDefault()
    localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik))
    this.router.navigate(['nastavnikMojiUcenici'])
  }

}
