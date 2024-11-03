import mongoose from "mongoose";

const korisnikSchema = new mongoose.Schema(
    {
        korIme : String , 
        lozinka : String , 
        email : String, 
        flagTip : Number 
    }, {
        versionKey : false
    }
)

export default mongoose.model('KorisnikModel', korisnikSchema, 'korisnik')