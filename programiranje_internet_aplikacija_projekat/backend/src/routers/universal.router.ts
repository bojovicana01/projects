import express from "express"
import { UniversalController } from "../controllers/universal.controller"

const universalRouter = express.Router()

universalRouter.route("/dohvatiKorisnika").post(
    (req, res) => new UniversalController().dohvatiKorisnika(req, res)
)

universalRouter.route("/dohvatiUcenika").post(
    (req, res) => new UniversalController().dohvatiUcenika(req, res)
)

universalRouter.route("/dohvatiNastavnika").post(
    (req, res) => new UniversalController().dohvatiNastavnika(req, res)
)

universalRouter.route("/dohvSvePredmete").get(
    (req, res) => new UniversalController().dohvSvePredmete(req, res)
)

universalRouter.route("/dohvatiSveCasove").get(
    (req, res) => new UniversalController().dohvatiSveCasove(req, res)
)

universalRouter.route("/brojNastavnikaNaPredmetu").post(
    (req, res) => new UniversalController().brojNastavnikaNaPredmetu(req, res)
)

universalRouter.route("/dohvSveNastavnike").get(
    (req, res) => new UniversalController().dohvSveNastavnike(req, res)
)

universalRouter.route("/dohvatiSveUcenike").get(
    (req, res) => new UniversalController().dohvatiSveUcenike(req, res)
)

universalRouter.route("/dohvBrojUcenika").get(
    (req, res) => new UniversalController().dohvBrojUcenika(req, res)
)

universalRouter.route("/dohvatiZahteveNastavnika").get(
    (req, res) => new UniversalController().dohvatiZahteveNastavnika(req, res)
)

universalRouter.route("/dohvatiCasoveUN").post(
    (req, res) => new UniversalController().dohvatiCasoveUN(req, res)
)

universalRouter.route("/dohvatiCasoveNastavnika").post(
    (req, res) => new UniversalController().dohvatiCasoveNastavnika(req, res)
)


//--------------------------------------------------------------------------------------------LOGIN/REGISTER

universalRouter.route("/login").post(
    (req, res) => new UniversalController().login(req, res)
)

universalRouter.route("/registrujUcenika").post(
    (req, res) => new UniversalController().registrujUcenika(req, res)
)

universalRouter.route("/registrujNastavnika").post(
    (req, res) => new UniversalController().registrujNastavnika(req, res)
)

universalRouter.route("/dodajPredlogPredmeta").post(
    (req, res) => new UniversalController().dodajPredlogPredmeta(req, res)
)


universalRouter.route("/proveraPostojanjaKorIme").post(
    (req, res) => new UniversalController().proveraPostojanjaKorIme(req, res)
)

universalRouter.route("/proveraPostojanjaEmail").post(
    (req, res) => new UniversalController().proveraPostojanjaEmail(req, res)
)

//--------------------------------------------------------------------------------------------DODAJ SLIKU

universalRouter.route("/dodajSliku").post(
    (req, res) => new UniversalController().dodajSliku(req, res)
)

universalRouter.route("/dodajBiografiju").post(
    (req, res) => new UniversalController().dodajBiografiju(req, res)
)

universalRouter.route("/dohvFajl").post(
    (req, res) => new UniversalController().dohvFajl(req, res)
)

//--------------------------------------------------------------------------------------------PROMENA LOZINKE

universalRouter.route("/promeniLozinku").post(
    (req, res) => new UniversalController().promeniLozinku(req, res)
)

universalRouter.route("/promeniLozinkuKorisnikM").post(
    (req, res) => new UniversalController().promeniLozinkuKorisnikM(req, res)
)

//--------------------------------------------------------------------------------------------CASOVI

universalRouter.route("/proveraPostojiCas").post(
    (req, res) => new UniversalController().proveraPostojiCas(req, res)
)

universalRouter.route("/proveraProfNedostupan").post(
    (req, res) => new UniversalController().proveraProfNedostupan(req, res)
)

universalRouter.route("/zakaziCas").post(
    (req, res) => new UniversalController().zakaziCas(req, res)
)

universalRouter.route("/otkaziCas").post(
    (req, res) => new UniversalController().otkaziCas(req, res)
)

universalRouter.route("/prihvatiCas").post(
    (req, res) => new UniversalController().prihvatiCas(req, res)
)

universalRouter.route("/odbijCas").post(
    (req, res) => new UniversalController().odbijCas(req, res)
)

universalRouter.route("/definisiNedostupnost").post(
    (req, res) => new UniversalController().definisiNedostupnost(req, res)
)

//----------------------------------------------------------------------------------------ADMIN

universalRouter.route("/prihvatiZahtev").post(
    (req, res) => new UniversalController().prihvatiZahtev(req, res)
)

universalRouter.route("/odbijZahtev").post(
    (req, res) => new UniversalController().odbijZahtev(req, res)
)

universalRouter.route("/dodajPredmetAdmin").post(
    (req, res) => new UniversalController().dodajPredmetAdmin(req, res)
)

universalRouter.route("/dohvatiSvePredloge").get(
    (req, res) => new UniversalController().dohvatiSvePredloge(req, res)
)

universalRouter.route("/prihvatiPredlog").post(
    (req, res) => new UniversalController().prihvatiPredlog(req, res)
)

universalRouter.route("/odbijPredlog").post(
    (req, res) => new UniversalController().odbijPredlog(req, res)
)

universalRouter.route("/deaktivirajNastavnika").post(
    (req, res) => new UniversalController().deaktivirajNastavnika(req, res)
)

//-----------------------------------------------------------------------------------

universalRouter.route("/brojCasovaNastavnika2023").post(
    (req, res) => new UniversalController().brojCasovaNastavnika2023(req, res)
)


export default universalRouter