import mongoose from "mongoose";

const obavestenjeSchema = new mongoose.Schema(
    {
        _id : String, 
        primalac : String, 
        posiljalac : String, 
        sadrzaj : String, 
        status : Boolean
    }, {
        versionKey : false
    }
)

export default mongoose.model('ObavestenjeModel', obavestenjeSchema, 'obavestenje')