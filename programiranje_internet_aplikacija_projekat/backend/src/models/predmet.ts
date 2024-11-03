import mongoose from "mongoose";

const predmetSchema = new mongoose.Schema(
    {
        naziv : String, 
        index : Number
    },{
        versionKey:false  
    }
)

export default mongoose.model('PredmetModel', predmetSchema, 'predmet')