import mongoose from "mongoose";

const predlogSchema = new mongoose.Schema(
    {
        naziv : String, 
        korIme : String
    }, {
        versionKey : false
    }
)

export default mongoose.model('PredlogModel', predlogSchema, 'predlog')