"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const predmetSchema = new mongoose_1.default.Schema({
    naziv: String,
    index: Number
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('PredmetModel', predmetSchema, 'predmet');
