import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RegisterComponent = class RegisterComponent {
    constructor(router) {
        this.router = router;
    }
    ucenikReg() {
        this.router.navigate(['registracijaUcenik']);
    }
    nastavnikReg() {
        this.router.navigate(['registracijaNastavnik']);
    }
    nazad(event) {
        event.preventDefault();
        this.router.navigate(['']);
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map