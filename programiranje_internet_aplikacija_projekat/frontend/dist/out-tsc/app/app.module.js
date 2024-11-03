import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NeregKorisnikComponent } from './nereg-korisnik/nereg-korisnik.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
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
import { AzurirajNastavnikaComponent } from './azuriraj-nastavnika/azuriraj-nastavnika.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            LoginComponent,
            RegisterComponent,
            NeregKorisnikComponent,
            AdminComponent,
            UcenikProfilComponent,
            UcenikNastavniciComponent,
            UcenikCasoviComponent,
            RegistracijaUcenikComponent,
            RegistracijaNastavnikComponent,
            NastavnikDetaljiComponent,
            UcenikObavestenjaComponent,
            NastavnikProfilComponent,
            NastavnikCasoviComponent,
            NastavnikMojiUceniciComponent,
            PromenaLozinkeComponent,
            PromenaLozinkePoznataStaraComponent,
            PromenaLozinkeNepoznataStaraComponent,
            OcenjivanjeNastavnikaComponent,
            MojUcenikDetaljiComponent,
            AdminLoginComponent,
            AzurirajNastavnikaComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map