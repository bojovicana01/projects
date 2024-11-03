import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NeregKorisnikComponent } from './nereg-korisnik/nereg-korisnik.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UcenikProfilComponent } from './ucenik-profil/ucenik-profil.component';
import { UcenikNastavniciComponent } from './ucenik-nastavnici/ucenik-nastavnici.component';
import { UcenikCasoviComponent } from './ucenik-casovi/ucenik-casovi.component';
import { RegistracijaUcenikComponent } from './registracija-ucenik/registracija-ucenik.component';
import { RegistracijaNastavnikComponent } from './registracija-nastavnik/registracija-nastavnik.component';
import { NastavnikDetaljiComponent } from './nastavnik-detalji/nastavnik-detalji.component';
import { UcenikObavestenjaComponent } from './ucenik-obavestenja/ucenik-obavestenja.component';
import { NastavnikProfilComponent } from './nastavnik-profil/nastavnik-profil.component';
import { NastavnikCasoviComponent } from './nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikMojiUceniciComponent } from './nastavnik-moji-ucenici/nastavnik-moji-ucenici.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { PromenaLozinkePoznataStaraComponent } from './promena-lozinke-poznata-stara/promena-lozinke-poznata-stara.component';
import { PromenaLozinkeNepoznataStaraComponent } from './promena-lozinke-nepoznata-stara/promena-lozinke-nepoznata-stara.component';
import { OcenjivanjeNastavnikaComponent } from './ocenjivanje-nastavnika/ocenjivanje-nastavnika.component';
import { MojUcenikDetaljiComponent } from './moj-ucenik-detalji/moj-ucenik-detalji.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AzurirajNastavnikaComponent } from './azuriraj-nastavnika/azuriraj-nastavnika.component';
const routes = [
    { path: "", component: NeregKorisnikComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "ucenikProfil", component: UcenikProfilComponent },
    { path: "ucenikNastavnici", component: UcenikNastavniciComponent },
    { path: "ucenikCasovi", component: UcenikCasoviComponent },
    { path: "ucenikObavestenja", component: UcenikObavestenjaComponent },
    { path: "registracijaUcenik", component: RegistracijaUcenikComponent },
    { path: "registracijaNastavnik", component: RegistracijaNastavnikComponent },
    { path: "nastavnikDetalji", component: NastavnikDetaljiComponent },
    { path: "nastavnikProfil", component: NastavnikProfilComponent },
    { path: "nastavnikCasovi", component: NastavnikCasoviComponent },
    { path: "nastavnikMojiUcenici", component: NastavnikMojiUceniciComponent },
    { path: "promenaLozinke", component: PromenaLozinkeComponent },
    { path: "promenaLozinkePoznataStara", component: PromenaLozinkePoznataStaraComponent },
    { path: "promenaLozinkeNepoznataStara", component: PromenaLozinkeNepoznataStaraComponent },
    { path: "ocenjivanjeNastavnika", component: OcenjivanjeNastavnikaComponent },
    { path: "mojUcenikDetalji", component: MojUcenikDetaljiComponent },
    { path: "adminLogin", component: AdminLoginComponent },
    { path: "admin", component: AdminComponent },
    { path: "azurirajNastavnika", component: AzurirajNastavnikaComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map