import mongoose from "mongoose";

const nedostupnostSchema = new mongoose.Schema(
    {
        nastavnik : String, 
        odDatumVreme : Date, 
        doDatumVreme : Date, 
        odDatumVremeInput : String, 
        doDatumVremeInput : String
    }, {
        versionKey : false
    }
)

export default mongoose.model('NedostpnostModel', nedostupnostSchema, 'nedostupnost')