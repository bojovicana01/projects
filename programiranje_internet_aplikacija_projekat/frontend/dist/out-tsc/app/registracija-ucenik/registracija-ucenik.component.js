import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Ucenik } from '../models/ucenik';
let RegistracijaUcenikComponent = class RegistracijaUcenikComponent {
    constructor(universalService, router) {
        this.universalService = universalService;
        this.router = router;
        this.korIme = "";
        this.lozinka = "";
        this.bezbedonosnoPitanje = "";
        this.bezbedonosniOdgovor = "";
        this.ime = "";
        this.prezime = "";
        this.pol = "";
        this.adresa = "";
        this.telefon = "";
        this.email = "";
        this.slika = "../../assets/defaultProfilePicture2.jpg";
        this.tipSkole = "";
        this.razred = 0;
        this.errKorIme = ""; //
        this.errLozinka = "";
        this.errBezbedonosnoPitanje = ""; //
        this.errBezbedonosniOdgovor = ""; //
        this.errIme = ""; //
        this.errPrezime = ""; //
        this.errPol = ""; //
        this.errAdresa = ""; //
        this.errTelefon = ""; //
        this.errEmail = ""; //
        this.errSlika = ""; //
        this.errTipSkole = ""; //
        this.errRazred = "";
        this.errMsg = "";
        this.errKorImePostoji = "";
        this.errEmailPostoji = "";
        this.flagIzabranaSlika = 0;
        this.slikaFajlId = "";
    }
    registrujUcenika() {
        let flagErrValidacija = this.validacija();
        if (flagErrValidacija == 1)
            return;
        this.universalService.proveraPostojanjaKorIme(this.korIme).subscribe(data => {
            if (data != null) {
                if (data == 'postoji') {
                    console.log('u kor ime postoji');
                    this.errKorImePostoji = "Korisnicko ime vec postoji. ";
                    return;
                }
                else {
                    this.errKorImePostoji = "";
                    this.universalService.proveraPostojanjaEmail(this.email).subscribe(data => {
                        if (data != null) {
                            if (data == 'postoji') {
                                this.errEmailPostoji = "E-mail vec postoji. ";
                                return;
                            }
                            else {
                                this.errEmailPostoji = "";
                                this.dodavanjeUcenika();
                            }
                        }
                        else {
                            console.log("Greska. ");
                        }
                    });
                }
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dodavanjeUcenika() {
        let ucenik = new Ucenik();
        ucenik.korIme = this.korIme;
        ucenik.lozinka = this.lozinka;
        ucenik.bezbedonosnoPitanje = this.bezbedonosnoPitanje;
        ucenik.bezbedonosniOdgovor = this.bezbedonosniOdgovor;
        ucenik.ime = this.ime;
        ucenik.prezime = this.prezime;
        ucenik.pol = this.pol;
        ucenik.adresa = this.adresa;
        ucenik.telefon = this.telefon;
        ucenik.email = this.email;
        ucenik.slika = "../../assets/defaultProfilePicture2.jpg";
        ucenik.tipSkole = this.tipSkole;
        ucenik.razred = this.razred;
        this.universalService.registrujUcenika(ucenik).subscribe(data => {
            if (data != null) {
                if (this.flagIzabranaSlika)
                    this.dodajSliku();
                this.router.navigate(['']);
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    izabranaSlika(event) {
        this.slikaFajl = event.target.files[0];
        this.flagIzabranaSlika = 1;
    }
    dodajSliku() {
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
                this.universalService.dodajSliku(this.korIme, slikaFajlName, sadrzaj, 0).subscribe(data => {
                    this.slikaFajlId = data;
                });
            }
        };
        if (this.slikaFajl) {
            fajlCitac.readAsDataURL(this.slikaFajl);
        }
    }
    proveraPostojanjaKorIme(ki) {
        this.universalService.proveraPostojanjaKorIme(ki).subscribe(data => {
            if (data != null) {
                if (data == 'postoji')
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        });
        return false;
    }
    proveraPostojanjaEmail(e) {
        this.universalService.proveraPostojanjaEmail(e).subscribe(data => {
            if (data != null) {
                if (data == 'postoji')
                    return true;
                else
                    return false;
            }
            else {
                return false;
            }
        });
        return false;
    }
    validacija() {
        let flagErr = 0;
        if (this.korIme == "") {
            this.errKorIme = "Niste uneli korisnicko ime. ";
            flagErr = 1;
        }
        else {
            this.errKorIme = "";
        }
        if (this.bezbedonosnoPitanje == "") {
            this.errBezbedonosnoPitanje = "Niste uneli bezbedonosno pitanje. ";
            flagErr = 1;
        }
        else {
            this.errBezbedonosnoPitanje = "";
        }
        if (this.bezbedonosniOdgovor == "") {
            this.errBezbedonosniOdgovor = "Niste uneli bezbedonosni odgovor. ";
            flagErr = 1;
        }
        else {
            this.errBezbedonosniOdgovor = "";
        }
        if (this.ime == "") {
            this.errIme = "Niste uneli ime. ";
            flagErr = 1;
        }
        else {
            this.errIme = "";
        }
        if (this.prezime == "") {
            this.errPrezime = "Niste uneli prezime. ";
            flagErr = 1;
        }
        else {
            this.errPrezime = "";
        }
        if (this.pol == "") {
            this.errPol = "Niste odabrali pol. ";
            flagErr = 1;
        }
        else {
            this.errPol = "";
        }
        if (this.adresa == "") {
            this.errAdresa = "Niste uneli adresu. ";
            flagErr = 1;
        }
        else {
            this.errAdresa = "";
        }
        if (this.telefon == "") {
            this.errTelefon = "Niste uneli telefon. ";
            flagErr = 1;
        }
        else {
            this.errTelefon = "";
        }
        if (this.email == "") {
            this.errEmail = "Niste uneli email. ";
            flagErr = 1;
        }
        else {
            this.errEmail = "";
        }
        if (this.tipSkole == "") {
            this.errTipSkole = "Niste odabrali tip skole. ";
            flagErr = 1;
        }
        else {
            this.errTipSkole = "";
        }
        let regex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,10}$/;
        if (!regex.test(this.lozinka)) {
            this.errLozinka = "Neispravna lozinka. ";
            flagErr = 1;
        }
        else {
            this.errLozinka = "";
        }
        if ((this.tipSkole != "osnovna" && this.razred > 4) || (this.razred > 8) || (this.razred < 1)) {
            this.errRazred = "Neispravno unet razred. ";
            flagErr = 1;
        }
        else {
            this.errRazred = "";
        }
        return flagErr;
    }
};
RegistracijaUcenikComponent = __decorate([
    Component({
        selector: 'app-registracija-ucenik',
        templateUrl: './registracija-ucenik.component.html',
        styleUrls: ['./registracija-ucenik.component.css']
    })
], RegistracijaUcenikComponent);
export { RegistracijaUcenikComponent };
//# sourceMappingURL=registracija-ucenik.component.js.map