import { Predmet } from "./predmet"

export class Cas {
    nastavnik : string = ""
    ucenik : string = ""
    predmet : string = ""
    opisTemeCasa : string = ""
    datumVreme : Date = new Date()
    datumVremePlus : Date = new Date()
    datumVremeInput : string = ""
    dupliCas : boolean = false
    flagPotvrda : number = 2
    obrazlozenjeOdbijen : string = ""
    flagOdrzan : boolean = false
    flagOtkazan : boolean = false
    obrazlozenjeOtkazan : string = ""
    komentarNastavnika : string = ""
    komentarUcenika : string = ""
    ocenaZaUcenika : number = 0
    ocenaZaNastavnika : number = 0
}