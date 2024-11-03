"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UcenikController = void 0;
const ucenik_1 = __importDefault(require("../models/ucenik"));
const obavestenje_1 = __importDefault(require("../models/obavestenje"));
const cas_1 = __importDefault(require("../models/cas"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
class UcenikController {
    constructor() {
        this.dohvatiUcenika = (req, res) => {
            let korImeP = req.body.korIme;
            let lozinkaP = req.body.lozinka;
            ucenik_1.default.findOne({ korIme: korImeP, lozinka: lozinkaP }).then(ucenik => {
                res.json(ucenik);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiObavestenjaZaUcenika = (req, res) => {
            let korImeP = req.body.korIme;
            obavestenje_1.default.find({ primalac: korImeP }).then(obavestenja => {
                res.json(obavestenja);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvUcenikCasovi = (req, res) => {
            let korImeP = req.body.korIme;
            cas_1.default.find({ ucenik: korImeP }).then(casovi => {
                res.json(casovi);
            }).catch((err) => {
                console.log(err);
            });
        };
        //---------------------------------------------------------------------------------------------------------------------------------------------
        this.promeniStatusObavestenjaUBazi = (req, res) => {
            let id = req.body._id;
            let oldStatus = req.body.status;
            let newStatus = (oldStatus == 1) ? 0 : 1;
            obavestenje_1.default.updateOne({ _id: id }, { $set: { status: newStatus } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        //---------------------------------------------------------------------------------------------------------------------------------------------
        this.izmeniIme = (req, res) => {
            let korImeP = req.body.korIme;
            let novoImeP = req.body.novoIme;
            ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { ime: novoImeP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniPrezime = (req, res) => {
            let korImeP = req.body.korIme;
            let novoPrezimeP = req.body.novoPrezime;
            ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { prezime: novoPrezimeP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniAdresu = (req, res) => {
            let korImeP = req.body.korIme;
            let novaAdresaP = req.body.novaAdresa;
            ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { adresa: novaAdresaP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniTelefon = (req, res) => {
            let korImeP = req.body.korIme;
            let novTelefonP = req.body.novTelefon;
            ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { telefon: novTelefonP } }).then(ok => {
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
                    ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { email: novEmailP } }).then(ok => {
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
            ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { slika: novaSlikaP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniTipSkole = (req, res) => {
            let korImeP = req.body.korIme;
            let noviTipSkoleP = req.body.noviTipSkole;
            ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { tipSkole: noviTipSkoleP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.izmeniRazred = (req, res) => {
            let korImeP = req.body.korIme;
            let noviRazredP = req.body.noviRazred;
            ucenik_1.default.updateOne({ korIme: korImeP }, { $set: { razred: noviRazredP } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.UcenikController = UcenikController;
