import mongoose from "mongoose";
import Predmet from "./predmet";

const casSchema = new mongoose.Schema(
    {
        nastavnik : String, 
        ucenik : String, 
        predmet : String, 
        opisTemeCasa : String, 
        datumVreme : Date, 
        datumVremePlus : Date, 
        datumVremeInput : String, 
        dupliCas : Boolean, 
        flagPotvrda : Number, 
        obrazlozenjeOdbijen : String, 
        flagOdrzan : Boolean, 
        flagOtkazan : Boolean, 
        obrazlozenjeOtkazan : String, 
        komentarNastavnika : String, 
        komentarUcenika : String, 
        ocenaZaUcenika : Number, 
        ocenaZaNastavnika : Number
    }, {
        versionKey : false
    }
)

export default mongoose.model('CasModel', casSchema, 'cas')