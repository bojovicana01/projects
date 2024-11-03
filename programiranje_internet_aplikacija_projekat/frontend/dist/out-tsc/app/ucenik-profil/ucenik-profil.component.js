import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Ucenik } from '../models/ucenik';
import { Korisnik } from '../models/korisnik';
let UcenikProfilComponent = class UcenikProfilComponent {
    constructor(ucenikService, universalService, router) {
        this.ucenikService = ucenikService;
        this.universalService = universalService;
        this.router = router;
        this.uIme = "";
        this.uPrezime = "";
        this.uAdresa = "";
        this.uTelefon = "";
        this.uEmail = "";
        this.uSlika = "../../assets/defaultProfilePicture2.jpg";
        this.uSlikaFajl = null;
        this.uTipSkole = "";
        this.uRazred = 0;
        this.korisnik = new Korisnik();
        this.ucenik = new Ucenik();
        this.uSlikaPrikaz = "";
        this.flagIzabranaSlika = 0;
        this.slikaFajlId = "";
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
                this.uIme = this.ucenik.ime;
                this.uPrezime = this.ucenik.prezime;
                this.uAdresa = this.ucenik.adresa;
                this.uTelefon = this.ucenik.telefon;
                this.uEmail = this.ucenik.email;
                this.uSlika = this.ucenik.slika;
                this.uTipSkole = this.ucenik.tipSkole;
                this.uRazred = this.ucenik.razred;
                if (this.ucenik.slika == "../../assets/defaultProfilePicture2.jpg") {
                    this.uSlikaPrikaz = "../../assets/defaultProfilePicture2.jpg";
                }
                else {
                    let uSlikaId = this.ucenik.slikaId;
                    this.dohvFajl(uSlikaId);
                    console.log(this.uSlikaPrikaz);
                }
            }
        });
    }
    dohvFajl(id) {
        this.universalService.dohvFajl(id, 0).subscribe(data => {
            if (data != null) {
                this.uSlikaPrikaz = data;
            }
        });
    }
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
                    this.universalService.dodajSliku(this.ucenik.korIme, slikaFajlName, sadrzaj, 0).subscribe(data => {
                        this.slikaFajlId = data;
                        this.dohvatiUcenika(this.korisnik);
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
        this.ucenikService.izmeniIme(this.ucenik.korIme, this.uIme).subscribe(data => {
            if (data != null) {
                this.dohvatiUcenika(this.korisnik);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniPrezime() {
        this.ucenikService.izmeniPrezime(this.ucenik.korIme, this.uPrezime).subscribe(data => {
            if (data != null) {
                this.dohvatiUcenika(this.korisnik);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniAdresu() {
        this.ucenikService.izmeniAdresu(this.ucenik.korIme, this.uAdresa).subscribe(data => {
            if (data != null) {
                this.dohvatiUcenika(this.korisnik);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniTelefon() {
        this.ucenikService.izmeniTelefon(this.ucenik.korIme, this.uTelefon).subscribe(data => {
            if (data != null) {
                this.dohvatiUcenika(this.korisnik);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniEmail() {
        this.ucenikService.izmeniEmail(this.ucenik.korIme, this.uEmail).subscribe(data => {
            if (data != null) {
                if (data == 'Trazeni mejl vec postoji. ')
                    alert(data);
                this.dohvatiUcenika(this.korisnik);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniTipSkole() {
        this.ucenikService.izmeniTipSkole(this.ucenik.korIme, this.uTipSkole).subscribe(data => {
            if (data != null) {
                this.dohvatiUcenika(this.korisnik);
            }
            else {
                alert("Nije izmenjeno. ");
            }
        });
    }
    izmeniRazred() {
        let tempRazred = this.uRazred + 1;
        if (this.uRazred != 8) {
            tempRazred = this.uRazred + 1;
        }
        else {
            tempRazred = 1;
        }
        if (this.uTipSkole != "osnovna" && tempRazred > 4)
            return;
        if (this.uTipSkole == "osnovna" && this.uRazred + 1 > 8)
            return;
        this.ucenikService.izmeniRazred(this.ucenik.korIme, tempRazred).subscribe(data => {
            if (data != null) {
                this.dohvatiUcenika(this.korisnik);
            }
            else {
                alert("Nije izmenjeno. ");
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
UcenikProfilComponent = __decorate([
    Component({
        selector: 'app-ucenik-profil',
        templateUrl: './ucenik-profil.component.html',
        styleUrls: ['./ucenik-profil.component.css']
    })
], UcenikProfilComponent);
export { UcenikProfilComponent };
//# sourceMappingURL=ucenik-profil.component.js.map