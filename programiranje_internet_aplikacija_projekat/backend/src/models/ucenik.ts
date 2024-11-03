import mongoose from "mongoose";

const ucenikSchema = new mongoose.Schema(
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
        tipSkole : String , 
        razred : Number 
    }, {
        versionKey : false
    }
)

export default mongoose.model('UcenikModel', ucenikSchema, 'ucenik')