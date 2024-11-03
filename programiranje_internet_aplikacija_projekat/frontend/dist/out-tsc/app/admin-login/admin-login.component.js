import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
let AdminLoginComponent = class AdminLoginComponent {
    constructor(universalService, router) {
        this.universalService = universalService;
        this.router = router;
        this.korIme = "";
        this.lozinka = "";
        this.korisnik = new Korisnik();
        this.errMsg = "";
    }
    login() {
        this.universalService.login(this.korIme, this.lozinka).subscribe(data => {
            if (data != null) {
                this.errMsg = "";
                this.korisnik = data;
                localStorage.setItem("logovaniKorisnik", JSON.stringify(data));
                if (data.flagTip == 2) {
                    this.router.navigate(['admin']);
                }
                else {
                    alert("Niste admin. ");
                }
            }
            else {
                this.errMsg = "Nepostojeci korisnik. ";
            }
        });
    }
};
AdminLoginComponent = __decorate([
    Component({
        selector: 'app-admin-login',
        templateUrl: './admin-login.component.html',
        styleUrls: ['./admin-login.component.css']
    })
], AdminLoginComponent);
export { AdminLoginComponent };
//# sourceMappingURL=admin-login.component.js.map