import mongoose from "mongoose";

const fajlSchema = new mongoose.Schema(
    {
        id : String, 
        naziv : String
    }, {
        versionKey : false
    }
)

export default mongoose.model('FajlModel', fajlSchema, 'fajl')