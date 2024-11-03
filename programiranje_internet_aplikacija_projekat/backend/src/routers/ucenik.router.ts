import express from "express";
import { UcenikController } from "../controllers/ucenik.controller";

const ucenikRouter = express.Router()

ucenikRouter.route("/dohvatiUcenika").post(
    (req, res) => new UcenikController().dohvatiUcenika(req, res)
)

ucenikRouter.route("/dohvatiObavestenjaZaUcenika").post(
    (req, res) => new UcenikController().dohvatiObavestenjaZaUcenika(req, res)
)

ucenikRouter.route("/dohvUcenikCasovi").post(
    (req, res) => new UcenikController().dohvUcenikCasovi(req, res)
)

//---------------------------------------------------------------------------------------------------------------------------------------------

ucenikRouter.route("/promeniStatusObavestenjaUBazi").post(
    (req, res) => new UcenikController().promeniStatusObavestenjaUBazi(req, res)
)

//---------------------------------------------------------------------------------------------------------------------------------------------

ucenikRouter.route("/izmeniIme").post(
    (req, res) => new UcenikController().izmeniIme(req, res)
)
ucenikRouter.route("/izmeniPrezime").post(
    (req, res) => new UcenikController().izmeniPrezime(req, res)
)
ucenikRouter.route("/izmeniAdresu").post(
    (req, res) => new UcenikController().izmeniAdresu(req, res)
)
ucenikRouter.route("/izmeniTelefon").post(
    (req, res) => new UcenikController().izmeniTelefon(req, res)
)
ucenikRouter.route("/izmeniEmail").post(
    (req, res) => new UcenikController().izmeniEmail(req, res)
)
ucenikRouter.route("/izmeniSliku").post(
    (req, res) => new UcenikController().izmeniSliku(req, res)
)
ucenikRouter.route("/izmeniTipSkole").post(
    (req, res) => new UcenikController().izmeniTipSkole(req, res)
)
ucenikRouter.route("/izmeniRazred").post(
    (req, res) => new UcenikController().izmeniRazred(req, res)
)


export default ucenikRouter