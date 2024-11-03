import express from "express";
import { NastavnikController } from "../controllers/nastavnik.controller";

const nastavnikRouter = express.Router()

nastavnikRouter.route("/dohvatiNastavnika").post(
    (req, res) => new NastavnikController().dohvatiNastavnika(req, res)
)

nastavnikRouter.route("/dohvUcenikeOdrzanCas").post(
    (req, res) => new NastavnikController().dohvUcenikeOdrzanCas(req, res)
)

//---------------------------------------------------------------------------------------------------------------------------------------------

nastavnikRouter.route("/izmeniIme").post(
    (req, res) => new NastavnikController().izmeniIme(req, res)
)
nastavnikRouter.route("/izmeniPrezime").post(
    (req, res) => new NastavnikController().izmeniPrezime(req, res)
)
nastavnikRouter.route("/izmeniAdresu").post(
    (req, res) => new NastavnikController().izmeniAdresu(req, res)
)
nastavnikRouter.route("/izmeniTelefon").post(
    (req, res) => new NastavnikController().izmeniTelefon(req, res)
)
nastavnikRouter.route("/izmeniEmail").post(
    (req, res) => new NastavnikController().izmeniEmail(req, res)
)
nastavnikRouter.route("/izmeniSliku").post(
    (req, res) => new NastavnikController().izmeniSliku(req, res)
)
nastavnikRouter.route("/izmeniPredmete").post(
    (req, res) => new NastavnikController().izmeniPredmete(req, res)
)
nastavnikRouter.route("/izmeniUzraste").post(
    (req, res) => new NastavnikController().izmeniUzraste(req, res)
)


export default nastavnikRouter