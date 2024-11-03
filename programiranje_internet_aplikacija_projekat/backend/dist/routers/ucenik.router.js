"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ucenik_controller_1 = require("../controllers/ucenik.controller");
const ucenikRouter = express_1.default.Router();
ucenikRouter.route("/dohvatiUcenika").post((req, res) => new ucenik_controller_1.UcenikController().dohvatiUcenika(req, res));
ucenikRouter.route("/dohvatiObavestenjaZaUcenika").post((req, res) => new ucenik_controller_1.UcenikController().dohvatiObavestenjaZaUcenika(req, res));
ucenikRouter.route("/dohvUcenikCasovi").post((req, res) => new ucenik_controller_1.UcenikController().dohvUcenikCasovi(req, res));
//---------------------------------------------------------------------------------------------------------------------------------------------
ucenikRouter.route("/promeniStatusObavestenjaUBazi").post((req, res) => new ucenik_controller_1.UcenikController().promeniStatusObavestenjaUBazi(req, res));
//---------------------------------------------------------------------------------------------------------------------------------------------
ucenikRouter.route("/izmeniIme").post((req, res) => new ucenik_controller_1.UcenikController().izmeniIme(req, res));
ucenikRouter.route("/izmeniPrezime").post((req, res) => new ucenik_controller_1.UcenikController().izmeniPrezime(req, res));
ucenikRouter.route("/izmeniAdresu").post((req, res) => new ucenik_controller_1.UcenikController().izmeniAdresu(req, res));
ucenikRouter.route("/izmeniTelefon").post((req, res) => new ucenik_controller_1.UcenikController().izmeniTelefon(req, res));
ucenikRouter.route("/izmeniEmail").post((req, res) => new ucenik_controller_1.UcenikController().izmeniEmail(req, res));
ucenikRouter.route("/izmeniSliku").post((req, res) => new ucenik_controller_1.UcenikController().izmeniSliku(req, res));
ucenikRouter.route("/izmeniTipSkole").post((req, res) => new ucenik_controller_1.UcenikController().izmeniTipSkole(req, res));
ucenikRouter.route("/izmeniRazred").post((req, res) => new ucenik_controller_1.UcenikController().izmeniRazred(req, res));
exports.default = ucenikRouter;
