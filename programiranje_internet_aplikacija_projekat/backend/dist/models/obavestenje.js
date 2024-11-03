"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const obavestenjeSchema = new mongoose_1.default.Schema({
    _id: String,
    primalac: String,
    posiljalac: String,
    sadrzaj: String,
    status: Boolean
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('ObavestenjeModel', obavestenjeSchema, 'obavestenje');
