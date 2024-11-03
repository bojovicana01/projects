import { Predmet } from "./predmet"

export class Nastavnik {
    flagAktivan : number = 2
    ocene : number[] =[]

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
    slikaId : string = ""
    biografija : string = "pocetniTekst"
    biografijaId : string = ""

    predmeti : Predmet[] = []
    uzrast : string[] = []
    gdeJeCuoZaSajt : string = ""
}