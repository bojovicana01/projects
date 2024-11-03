import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PromenaLozinkeComponent = class PromenaLozinkeComponent {
    constructor(router) {
        this.router = router;
    }
    poznataStaraLozinka() {
        this.router.navigate(['promenaLozinkePoznataStara']);
    }
    nepoznataStaraLozinka() {
        this.router.navigate(['promenaLozinkeNepoznataStara']);
    }
    nazad(event) {
        event.preventDefault();
        this.router.navigate(['']);
    }
};
PromenaLozinkeComponent = __decorate([
    Component({
        selector: 'app-promena-lozinke',
        templateUrl: './promena-lozinke.component.html',
        styleUrls: ['./promena-lozinke.component.css']
    })
], PromenaLozinkeComponent);
export { PromenaLozinkeComponent };
//# sourceMappingURL=promena-lozinke.component.js.map