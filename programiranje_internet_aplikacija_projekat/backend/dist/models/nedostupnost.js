"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nedostupnostSchema = new mongoose_1.default.Schema({
    nastavnik: String,
    odDatumVreme: Date,
    doDatumVreme: Date,
    odDatumVremeInput: String,
    doDatumVremeInput: String
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('NedostpnostModel', nedostupnostSchema, 'nedostupnost');
