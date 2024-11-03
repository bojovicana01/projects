import mongoose from "mongoose";

const nastavnikSchema = new mongoose.Schema(
    {
        korIme : String , 
        lozinka : String , 
        bezbedonosnoPitanje : String , 
        bezbedonosniOdgovor : String , 
        ime : String , 
        prezime : String , 
        pol : String , 
        adresa : String , 
        telefon : String , 
        email : String , 
        slika : String , 
        slikaId : String, 
        biografija : String, 
        biografijaId : String, 
        predmeti : Array, 
        uzrast : Array, 
        gdeJeCuoZaSajt : String, 
        flagAktivan : Number,
        ocene : Array
    }, {
        versionKey : false
    }
)

export default mongoose.model('NastavnikModel', nastavnikSchema, 'nastavnik')