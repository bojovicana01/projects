"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const korisnikSchema = new mongoose_1.default.Schema({
    korIme: String,
    lozinka: String,
    email: String,
    flagTip: Number
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('KorisnikModel', korisnikSchema, 'korisnik');
