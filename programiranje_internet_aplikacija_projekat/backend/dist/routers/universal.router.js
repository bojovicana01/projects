"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const universal_controller_1 = require("../controllers/universal.controller");
const universalRouter = express_1.default.Router();
universalRouter.route("/dohvatiKorisnika").post((req, res) => new universal_controller_1.UniversalController().dohvatiKorisnika(req, res));
universalRouter.route("/dohvatiUcenika").post((req, res) => new universal_controller_1.UniversalController().dohvatiUcenika(req, res));
universalRouter.route("/dohvatiNastavnika").post((req, res) => new universal_controller_1.UniversalController().dohvatiNastavnika(req, res));
universalRouter.route("/dohvSvePredmete").get((req, res) => new universal_controller_1.UniversalController().dohvSvePredmete(req, res));
universalRouter.route("/dohvatiSveCasove").get((req, res) => new universal_controller_1.UniversalController().dohvatiSveCasove(req, res));
universalRouter.route("/brojNastavnikaNaPredmetu").post((req, res) => new universal_controller_1.UniversalController().brojNastavnikaNaPredmetu(req, res));
universalRouter.route("/dohvSveNastavnike").get((req, res) => new universal_controller_1.UniversalController().dohvSveNastavnike(req, res));
universalRouter.route("/dohvatiSveUcenike").get((req, res) => new universal_controller_1.UniversalController().dohvatiSveUcenike(req, res));
universalRouter.route("/dohvBrojUcenika").get((req, res) => new universal_controller_1.UniversalController().dohvBrojUcenika(req, res));
universalRouter.route("/dohvatiZahteveNastavnika").get((req, res) => new universal_controller_1.UniversalController().dohvatiZahteveNastavnika(req, res));
universalRouter.route("/dohvatiCasoveUN").post((req, res) => new universal_controller_1.UniversalController().dohvatiCasoveUN(req, res));
universalRouter.route("/dohvatiCasoveNastavnika").post((req, res) => new universal_controller_1.UniversalController().dohvatiCasoveNastavnika(req, res));
//--------------------------------------------------------------------------------------------LOGIN/REGISTER
universalRouter.route("/login").post((req, res) => new universal_controller_1.UniversalController().login(req, res));
universalRouter.route("/registrujUcenika").post((req, res) => new universal_controller_1.UniversalController().registrujUcenika(req, res));
universalRouter.route("/registrujNastavnika").post((req, res) => new universal_controller_1.UniversalController().registrujNastavnika(req, res));
universalRouter.route("/dodajPredlogPredmeta").post((req, res) => new universal_controller_1.UniversalController().dodajPredlogPredmeta(req, res));
universalRouter.route("/proveraPostojanjaKorIme").post((req, res) => new universal_controller_1.UniversalController().proveraPostojanjaKorIme(req, res));
universalRouter.route("/proveraPostojanjaEmail").post((req, res) => new universal_controller_1.UniversalController().proveraPostojanjaEmail(req, res));
//--------------------------------------------------------------------------------------------DODAJ SLIKU
universalRouter.route("/dodajSliku").post((req, res) => new universal_controller_1.UniversalController().dodajSliku(req, res));
universalRouter.route("/dodajBiografiju").post((req, res) => new universal_controller_1.UniversalController().dodajBiografiju(req, res));
universalRouter.route("/dohvFajl").post((req, res) => new universal_controller_1.UniversalController().dohvFajl(req, res));
//--------------------------------------------------------------------------------------------PROMENA LOZINKE
universalRouter.route("/promeniLozinku").post((req, res) => new universal_controller_1.UniversalController().promeniLozinku(req, res));
universalRouter.route("/promeniLozinkuKorisnikM").post((req, res) => new universal_controller_1.UniversalController().promeniLozinkuKorisnikM(req, res));
//--------------------------------------------------------------------------------------------CASOVI
universalRouter.route("/proveraPostojiCas").post((req, res) => new universal_controller_1.UniversalController().proveraPostojiCas(req, res));
universalRouter.route("/proveraProfNedostupan").post((req, res) => new universal_controller_1.UniversalController().proveraProfNedostupan(req, res));
universalRouter.route("/zakaziCas").post((req, res) => new universal_controller_1.UniversalController().zakaziCas(req, res));
universalRouter.route("/otkaziCas").post((req, res) => new universal_controller_1.UniversalController().otkaziCas(req, res));
universalRouter.route("/prihvatiCas").post((req, res) => new universal_controller_1.UniversalController().prihvatiCas(req, res));
universalRouter.route("/odbijCas").post((req, res) => new universal_controller_1.UniversalController().odbijCas(req, res));
universalRouter.route("/definisiNedostupnost").post((req, res) => new universal_controller_1.UniversalController().definisiNedostupnost(req, res));
//----------------------------------------------------------------------------------------ADMIN
universalRouter.route("/prihvatiZahtev").post((req, res) => new universal_controller_1.UniversalController().prihvatiZahtev(req, res));
universalRouter.route("/odbijZahtev").post((req, res) => new universal_controller_1.UniversalController().odbijZahtev(req, res));
universalRouter.route("/dodajPredmetAdmin").post((req, res) => new universal_controller_1.UniversalController().dodajPredmetAdmin(req, res));
universalRouter.route("/dohvatiSvePredloge").get((req, res) => new universal_controller_1.UniversalController().dohvatiSvePredloge(req, res));
universalRouter.route("/prihvatiPredlog").post((req, res) => new universal_controller_1.UniversalController().prihvatiPredlog(req, res));
universalRouter.route("/odbijPredlog").post((req, res) => new universal_controller_1.UniversalController().odbijPredlog(req, res));
universalRouter.route("/deaktivirajNastavnika").post((req, res) => new universal_controller_1.UniversalController().deaktivirajNastavnika(req, res));
//-----------------------------------------------------------------------------------
universalRouter.route("/brojCasovaNastavnika2023").post((req, res) => new universal_controller_1.UniversalController().brojCasovaNastavnika2023(req, res));
exports.default = universalRouter;
