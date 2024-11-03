"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ucenikSchema = new mongoose_1.default.Schema({
    korIme: String,
    lozinka: String,
    bezbedonosnoPitanje: String,
    bezbedonosniOdgovor: String,
    ime: String,
    prezime: String,
    pol: String,
    adresa: String,
    telefon: String,
    email: String,
    slika: String,
    slikaId: String,
    tipSkole: String,
    razred: Number
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('UcenikModel', ucenikSchema, 'ucenik');
