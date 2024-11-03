"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const predlogSchema = new mongoose_1.default.Schema({
    naziv: String,
    korIme: String
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('PredlogModel', predlogSchema, 'predlog');
