"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nastavnik_controller_1 = require("../controllers/nastavnik.controller");
const nastavnikRouter = express_1.default.Router();
nastavnikRouter.route("/dohvatiNastavnika").post((req, res) => new nastavnik_controller_1.NastavnikController().dohvatiNastavnika(req, res));
nastavnikRouter.route("/dohvUcenikeOdrzanCas").post((req, res) => new nastavnik_controller_1.NastavnikController().dohvUcenikeOdrzanCas(req, res));
//---------------------------------------------------------------------------------------------------------------------------------------------
nastavnikRouter.route("/izmeniIme").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniIme(req, res));
nastavnikRouter.route("/izmeniPrezime").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniPrezime(req, res));
nastavnikRouter.route("/izmeniAdresu").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniAdresu(req, res));
nastavnikRouter.route("/izmeniTelefon").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniTelefon(req, res));
nastavnikRouter.route("/izmeniEmail").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniEmail(req, res));
nastavnikRouter.route("/izmeniSliku").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniSliku(req, res));
nastavnikRouter.route("/izmeniPredmete").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniPredmete(req, res));
nastavnikRouter.route("/izmeniUzraste").post((req, res) => new nastavnik_controller_1.NastavnikController().izmeniUzraste(req, res));
exports.default = nastavnikRouter;
