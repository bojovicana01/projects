import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Predmet } from '../models/predmet';
import { Nastavnik } from '../models/nastavnik';
let AzurirajNastavnikaComponent = class AzurirajNastavnikaComponent {
    constructor(nastavnikService, universalService, router) {
        this.nastavnikService = nastavnikService;
        this.universalService = universalService;
        this.router = router;
        this.nIme = "";
        this.nPrezime = "";
        this.nAdresa = "";
        this.nTelefon = "";
        this.nEmail = "";
        this.nSlika = "../../assets/defaultProfilePicture2.jpg";
        this.nSlikaFajl = null;
        this.nPredmeti = [];
        this.nUzrast = [];
        this.nastavnik = new Nastavnik();
        this.nSlikaPrikaz = "";
        this.flagIzabranaSlika = 0;
        this.slikaFajlId = "";
        //-----------------------------------------------------------------------------------------IZMENA PREDMETA I UZRASTA
        this.uzrastTemp = ["", "", ""];
        this.uzrast = [];
        this.uzrastCheckFlag = [false, false, false];
        this.sviPredmeti = [];
        this.predmetiTemp = [];
        this.predmeti = [];
        this.predmetiCheckFlag = [];
        this.errUzrast = "";
        this.errPredmeti = "";
    }
    ngOnInit() {
        let n = localStorage.getItem("nastavnikZaAzuriranje");
        if (n != null) {
            this.nastavnik = JSON.parse(n);
            this.dohvatiNastavnika(this.nastavnik.korIme);
            this.dohvSvePredmete();
        }
    }
    deaktivirajNastavnika() {
        this.universalService.deaktivirajNastavnika(this.nastavnik.korIme).subscribe(data => {
            if (data != null) {
                this.dohvatiNastavnika(this.nastavnik.korIme);
            }
            else {
                alert("Greska. ");
            }
        });
    }
    dohvatiNastavnika(ki) {
        this.universalService.dohvatiNastavnika(ki).subscribe(data => {
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
                    console.log(this.nSlikaPrikaz);
                }
            }
        });
    }
    dohvFajl(id) {
        this.universalService.dohvFajl(id, 0).subscribe(data => {
            if (data != null) {
                this.nSlikaPrikaz = data;
            }
        });
    }
    izmeniPredmete() {
        for (let i = 0; i < this.predmetiTemp.length; i++) {
            if (this.predmetiTemp[i] != "") {
                let p = this.dohvPredmetPoNazivu(this.predmetiTemp[i]);
                this.predmeti.push(p);
            }
        }
        if (this.predmeti.length == 0) {
            this.errPredmeti = "Niste uneli predmete. ";
            this.predmeti = [];
            return;
        }
        else {
            this.errPredmeti = "";
            this.nastavnikService.izmeniPredmete(this.nastavnik.korIme, this.predmeti).subscribe(data => {
                if (data != null) {
                    this.dohvatiNastavnika(this.nastavnik.korIme);
                    this.predmeti = [];
                }
                else {
                    alert("Nije izmenjeno. ");
                }
            });
        }
    }
    izmeniUzraste() {
        for (let i = 0; i < this.uzrastTemp.length; i++) {
            if (this.uzrastTemp[i] != "")
                this.uzrast.push(this.uzrastTemp[i]);
        }
        if (this.uzrast.length == 0) {
            this.errUzrast = "Niste uneli uzrast. ";
            this.uzrast = [];
            return;
        }
        else {
            this.errUzrast = "";
            this.nastavnikService.izmeniUzraste(this.nastavnik.korIme, this.uzrast).subscribe(data => {
                if (data != null) {
                    this.dohvatiNastavnika(this.nastavnik.korIme);
                    this.uzrast = [];
                }
                else {
                    alert("Nije izmenjeno. ");
                }
            });
        }
    }
    checkUncheckUzrast(index, event) {
        let val = event.target.value;
        if (this.uzrastCheckFlag[index] == true) {
            this.uzrastTemp[index] = val;
        }
        else {
            this.uzrastTemp[index] = "";
        }
    }
    checkUncheckPredmet(index, event) {
        let val = event.target.value;
        if (this.predmetiCheckFlag[index] == true) {
            this.predmetiTemp[index] = val;
        }
        else {
            this.predmetiTemp[index] = "";
        }
    }
    dohvSvePredmete() {
        this.universalService.dohvSvePredmete().subscribe(data => {
            if (data != null) {
                this.sviPredmeti = data;
                for (let i = 0; i < this.sviPredmeti.length; i++) {
                    this.predmetiCheckFlag[i] = false;
                    this.predmetiTemp[i] = "";
                }
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvPredmetPoNazivu(n) {
        let p = new Predmet();
        for (let i = 0; i < this.sviPredmeti.length; i++) {
            if (this.sviPredmeti[i].naziv == n) {
                p.naziv = this.sviPredmeti[i].naziv;
                p.index = this.sviPredmeti[i].index;
            }
        }
        return p;
    }
    //-----------------------------------------------------------------------------------------IZMENA PREDMETA I UZRASTA KRAJ
    izmeniSliku() {
        if (this.flagIzabranaSlika) {
            let slikaFajlName = this.slikaFajl.name;
            let fajlCitac = new FileReader();
            fajlCitac.onload = async () => {
                let sadrzaj = fajlCitac.result;
                let slikaImgObj = await createImageBitmap(this.slikaFajl);
                if (slikaImgObj.width < 100 || slikaImgObj.width > 300 || slikaImgObj.height < 100 || slikaImgObj.height > 300) {
                    alert("Slika je neodgovarajucih dimenzija, mora imati sirinu/visinu >100 i <300. ");
                    return;
                }
                else {
                    this.universalService.dodajSliku(this.nastavnik.korIme, slikaFajlName, sadrzaj, 1).subscribe(data => {
                        this.slikaFajlId = data;
                        this.dohvatiNastavnika(this.nastavnik.korIme);
                    });
                }
            };
            if (this.slikaFajl) {
                fajlCitac.readAsDataURL(this.slikaFajl);
            }
        }
    }
    izabranaSlika(event) {
        this.slikaFajl = event.target.files[0];
        this.flagIzabranaSlika = 1;
    }
    izmeniIme() {
        this.nastavnikService.izmeniIme(this.nastavnik.korIme, this.nIme).subscribe(data => {
            if (data != null) {
                this.dohvatiNastavnika(this.nastavnik.korIme);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniPrezime() {
        this.nastavnikService.izmeniPrezime(this.nastavnik.korIme, this.nPrezime).subscribe(data => {
            if (data != null) {
                this.dohvatiNastavnika(this.nastavnik.korIme);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniAdresu() {
        this.nastavnikService.izmeniAdresu(this.nastavnik.korIme, this.nAdresa).subscribe(data => {
            if (data != null) {
                this.dohvatiNastavnika(this.nastavnik.korIme);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniTelefon() {
        this.nastavnikService.izmeniTelefon(this.nastavnik.korIme, this.nTelefon).subscribe(data => {
            if (data != null) {
                this.dohvatiNastavnika(this.nastavnik.korIme);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniEmail() {
        this.nastavnikService.izmeniEmail(this.nastavnik.korIme, this.nEmail).subscribe(data => {
            if (data != null) {
                if (data == 'Trazeni mejl vec postoji. ')
                    alert(data);
                this.dohvatiNastavnika(this.nastavnik.korIme);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    nazad() {
        this.router.navigate(['admin']);
    }
};
AzurirajNastavnikaComponent = __decorate([
    Component({
        selector: 'app-azuriraj-nastavnika',
        templateUrl: './azuriraj-nastavnika.component.html',
        styleUrls: ['./azuriraj-nastavnika.component.css']
    })
], AzurirajNastavnikaComponent);
export { AzurirajNastavnikaComponent };
//# sourceMappingURL=azuriraj-nastavnika.component.js.map