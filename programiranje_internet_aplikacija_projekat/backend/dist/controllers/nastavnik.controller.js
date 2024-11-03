"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NastavnikController = void 0;
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const cas_1 = __importDefault(require("../models/cas"));
class NastavnikController {
    constructor() {
        this.dohvatiNastavnika = (req, res) => {
            let korImeP = req.body.korIme;
            let lozinkaP = req.body.lozinka;
            nastavnik_1.default.findOne({ korIme: korImeP, lozinka: lozinkaP }).then(nastavnik => {
                res.json(nastavnik);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvUcenikeOdrzanCas = (req, res) => {
            let korImeP = req.body.korIme;
            cas_1.default.find({ nastavnik: korImeP, flagOdrzan: true }).then(casovi => {
                let uceniciKI = casovi.map(el => el.ucenik);
                uceniciKI = uceniciKI.filter((value, index, self) => self.indexOf(value) === index);
                res.json(uceniciKI);
            }).catch((err) => {
                console.log(err);
            });
        };
        //-----------------------------------------------------------------------------------------------------------------------
        this.izmeniIme = (req, res) => {
            let korImeP = req.body.korIme;
            let novoImeP = req.body.novoIme;
            nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { ime: novoImeP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniPrezime = (req, res) => {
            let korImeP = req.body.korIme;
            let novoPrezimeP = req.body.novoPrezime;
            nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { prezime: novoPrezimeP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniAdresu = (req, res) => {
            let korImeP = req.body.korIme;
            let novaAdresaP = req.body.novaAdresa;
            nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { adresa: novaAdresaP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniTelefon = (req, res) => {
            let korImeP = req.body.korIme;
            let novTelefonP = req.body.novTelefon;
            nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { telefon: novTelefonP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniEmail = (req, res) => {
            let korImeP = req.body.korIme;
            let novEmailP = req.body.novEmail;
            // mora prvo provera da li moze da se izmeni mejl na izabrani
            korisnik_1.default.findOne({ email: novEmailP }).then(korisnik => {
                if (korisnik != null && korisnik.email == novEmailP) {
                    res.json('Trazeni mejl vec postoji. ');
                }
                else if (korisnik == null) {
                    korisnik_1.default.updateOne({ korIme: korImeP }, { $set: { email: novEmailP } }).then(ok => {
                        console.log('ok');
                    });
                    nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { email: novEmailP } }).then(ok => {
                        res.json('ok');
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniSliku = (req, res) => {
            let korImeP = req.body.korIme;
            let novaSlikaP = req.body.novaSlika;
            nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { slika: novaSlikaP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniPredmete = (req, res) => {
            let korImeP = req.body.korIme;
            let predmeti = req.body.predmeti;
            nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { predmeti: predmeti } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniUzraste = (req, res) => {
            let korImeP = req.body.korIme;
            let uzrast = req.body.uzrast;
            nastavnik_1.default.updateOne({ korIme: korImeP }, { $set: { uzrast: uzrast } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.NastavnikController = NastavnikController;
