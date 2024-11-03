"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const casSchema = new mongoose_1.default.Schema({
    nastavnik: String,
    ucenik: String,
    predmet: String,
    opisTemeCasa: String,
    datumVreme: Date,
    datumVremePlus: Date,
    datumVremeInput: String,
    dupliCas: Boolean,
    flagPotvrda: Number,
    obrazlozenjeOdbijen: String,
    flagOdrzan: Boolean,
    flagOtkazan: Boolean,
    obrazlozenjeOtkazan: String,
    komentarNastavnika: String,
    komentarUcenika: String,
    ocenaZaUcenika: Number,
    ocenaZaNastavnika: Number
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('CasModel', casSchema, 'cas');
