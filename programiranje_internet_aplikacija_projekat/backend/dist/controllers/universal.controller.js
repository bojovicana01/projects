"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversalController = void 0;
const predmet_1 = __importDefault(require("../models/predmet"));
const ucenik_1 = __importDefault(require("../models/ucenik"));
const nastavnik_1 = __importDefault(require("../models/nastavnik"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const cas_1 = __importDefault(require("../models/cas"));
const nedostupnost_1 = __importDefault(require("../models/nedostupnost"));
const predlog_1 = __importDefault(require("../models/predlog"));
const js_sha512_1 = require("js-sha512");
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
class UniversalController {
    constructor() {
        this.dohvatiKorisnika = (req, res) => {
            let korImeP = req.body.korIme;
            korisnik_1.default.findOne({ korIme: korImeP }).then(kor => {
                res.json(kor);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiUcenika = (req, res) => {
            let korImeP = req.body.korIme;
            ucenik_1.default.findOne({ korIme: korImeP }).then(u => {
                res.json(u);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiNastavnika = (req, res) => {
            let korImeP = req.body.korIme;
            nastavnik_1.default.findOne({ korIme: korImeP }).then(n => {
                res.json(n);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiCasoveUN = (req, res) => {
            let ucenik = req.body.ucenik;
            let nastavnik = req.body.nastavnik;
            cas_1.default.find({ ucenik: ucenik, nastavnik: nastavnik }).then(casovi => {
                res.json(casovi);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiCasoveNastavnika = (req, res) => {
            let nastavnik = req.body.nastavnik;
            cas_1.default.find({ nastavnik: nastavnik }).then(casovi => {
                res.json(casovi);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvSvePredmete = (req, res) => {
            predmet_1.default.find({}).then(predmeti => {
                res.json(predmeti);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiSveCasove = (req, res) => {
            cas_1.default.find({}).then(casovi => {
                res.json(casovi);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.brojNastavnikaNaPredmetu = (req, res) => {
            let naziv = req.body.naziv;
            nastavnik_1.default.find({ "predmeti.naziv": { $in: [naziv] }, flagAktivan: 1 }).then(nastavnici => {
                if (nastavnici.length > 0) {
                    res.json(nastavnici.length);
                }
                else {
                    res.json(0);
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvSveNastavnike = (req, res) => {
            nastavnik_1.default.find({}).then(nastavnici => {
                res.json(nastavnici);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiSveUcenike = (req, res) => {
            ucenik_1.default.find({}).then(ucenici => {
                res.json(ucenici);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvBrojUcenika = (req, res) => {
            ucenik_1.default.find({}).count().then(brojUcenika => {
                res.json(brojUcenika);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiZahteveNastavnika = (req, res) => {
            nastavnik_1.default.find({ flagAktivan: 2 }).then(nastavnici => {
                res.json(nastavnici);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.login = (req, res) => {
            let korImeP = req.body.korIme;
            let lozinkaP = req.body.lozinka;
            korisnik_1.default.findOne({ korIme: korImeP, lozinka: (0, js_sha512_1.sha512)(lozinkaP) }).then(kor => {
                res.json(kor);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.registrujUcenika = (req, res) => {
            req.body.lozinka = (0, js_sha512_1.sha512)(req.body.lozinka);
            let uKorIme = req.body.korIme;
            let uLozinka = req.body.lozinka;
            let uEmail = req.body.email;
            let k = {
                korIme: uKorIme,
                lozinka: uLozinka,
                email: uEmail,
                flagTip: 0
            };
            new korisnik_1.default(k).save();
            new ucenik_1.default(req.body).save().then(ok => {
                res.json('sacuvan');
            });
        };
        this.registrujNastavnika = (req, res) => {
            req.body.lozinka = (0, js_sha512_1.sha512)(req.body.lozinka);
            let nKorIme = req.body.korIme;
            let nLozinka = req.body.lozinka;
            let nEmail = req.body.email;
            console.log("controller");
            console.log(req.body.uzrast);
            let k = {
                korIme: nKorIme,
                lozinka: nLozinka,
                email: nEmail,
                flagTip: 1
            };
            new korisnik_1.default(k).save();
            new nastavnik_1.default(req.body).save().then(ok => {
                res.json('sacuvan');
            });
        };
        this.dodajPredlogPredmeta = (req, res) => {
            let naziv = req.body.naziv;
            let korIme = req.body.korIme;
            let p = {
                naziv: naziv,
                korIme: korIme
            };
            new predlog_1.default(p).save().then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.proveraPostojanjaKorIme = (req, res) => {
            let korImeP = req.body.korIme;
            korisnik_1.default.findOne({ korIme: korImeP }).then(kor => {
                if (kor != null) {
                    res.json('postoji');
                }
                else {
                    res.json('ne postoji');
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.proveraPostojanjaEmail = (req, res) => {
            let emailP = req.body.email;
            korisnik_1.default.findOne({ email: emailP }).then(kor => {
                if (kor != null) {
                    res.json('postoji');
                }
                else {
                    res.json('ne postoji');
                }
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dodajSliku = (req, res) => {
            let korIme = req.body.korIme;
            let naziv = req.body.naziv;
            let sadrzaj = req.body.sadrzaj;
            let flagUN = req.body.flagUN;
            let id = (0, uuid_1.v4)();
            if (flagUN == 1) { // nastavnik
                nastavnik_1.default.updateOne({ korIme: korIme }, { $set: { slika: naziv, slikaId: id } }).then(ok => {
                    console.log("dodata slika");
                    console.log(naziv);
                }).catch((err) => {
                    console.log(err);
                });
            }
            else if (flagUN == 0) { // ucenik
                ucenik_1.default.updateOne({ korIme: korIme }, { $set: { slika: naziv, slikaId: id } }).then(ok => {
                    console.log("dodata slika");
                    console.log(naziv);
                }).catch((err) => {
                    console.log(err);
                });
            }
            let fajlNaDisku = fs_1.default.createWriteStream(id);
            fajlNaDisku.write(sadrzaj);
            fajlNaDisku.end();
            res.json(id);
        };
        this.dodajBiografiju = (req, res) => {
            let korIme = req.body.korIme;
            let naziv = req.body.naziv;
            let sadrzaj = req.body.sadrzaj;
            let flagUN = req.body.flagUN;
            let id = (0, uuid_1.v4)();
            if (flagUN == 1) { // nastavnik
                nastavnik_1.default.updateOne({ korIme: korIme }, { $set: { biografija: naziv, biografijaId: id } }).then(ok => {
                    console.log("dodata bio");
                    console.log(naziv);
                }).catch((err) => {
                    console.log(err);
                });
            }
            let fajlNaDisku = fs_1.default.createWriteStream(id);
            fajlNaDisku.write(sadrzaj);
            fajlNaDisku.end();
            res.json(id);
        };
        this.dohvFajl = (req, res) => {
            let id = req.body.id;
            let flagUN = req.body.flagUN;
            if (flagUN == 1) {
                nastavnik_1.default.findOne({ slikaId: id }).then(slika => {
                    let sadrzaj = fs_1.default.readFileSync(id);
                    let retSadrzaj = sadrzaj.toString();
                    res.json(retSadrzaj);
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                ucenik_1.default.findOne({ slikaId: id }).then(slika => {
                    let sadrzaj = fs_1.default.readFileSync(id);
                    let retSadrzaj = sadrzaj.toString();
                    res.json(retSadrzaj);
                }).catch((err) => {
                    console.log(err);
                });
            }
        };
        this.promeniLozinku = (req, res) => {
            let korIme = req.body.korIme;
            let novaLozinka = req.body.novaLozinka;
            let flagTip = req.body.flagTip;
            if (flagTip == 0) {
                ucenik_1.default.updateOne({ korIme: korIme }, { $set: { lozinka: (0, js_sha512_1.sha512)(novaLozinka) } }).then(ok => {
                    res.json('ok');
                }).catch((err) => {
                    console.log(err);
                });
            }
            else if (flagTip == 1) {
                nastavnik_1.default.updateOne({ korIme: korIme }, { $set: { lozinka: (0, js_sha512_1.sha512)(novaLozinka) } }).then(ok => {
                    res.json('ok');
                }).catch((err) => {
                    console.log(err);
                });
            }
        };
        this.promeniLozinkuKorisnikM = (req, res) => {
            let korIme = req.body.korIme;
            let novaLozinka = req.body.novaLozinka;
            korisnik_1.default.updateOne({ korIme: korIme }, { $set: { lozinka: (0, js_sha512_1.sha512)(novaLozinka) } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        //-----------------------------------------------------------------------------------------------------------------CASOVI
        this.proveraPostojiCas = (req, res) => {
            let korIme = req.body.korIme;
            let datumVreme = new Date(req.body.datumVremeInput);
            let datumVremeInput = req.body.datumVremeInput;
            let dupliCas = req.body.dupliCas;
            let datumVremePlus = new Date(datumVremeInput);
            if (dupliCas == false) {
                datumVremePlus.setMinutes(datumVremePlus.getMinutes() + 45);
            }
            else {
                datumVremePlus.setMinutes(datumVremePlus.getMinutes() + 90);
            }
            cas_1.default.find({ nastavnik: korIme }).then(casovi => {
                let flagZauzet = false;
                for (let i = 0; i < casovi.length; i++) {
                    let dv = new Date(casovi[i].datumVremeInput);
                    let dvPlus = new Date(casovi[i].datumVremeInput);
                    if (casovi[i].dupliCas == false) {
                        dvPlus === null || dvPlus === void 0 ? void 0 : dvPlus.setMinutes(dvPlus.getMinutes() + 45);
                    }
                    else {
                        dvPlus === null || dvPlus === void 0 ? void 0 : dvPlus.setMinutes(dvPlus.getMinutes() + 90);
                    }
                    let b = (dvPlus >= datumVreme && dv <= datumVremePlus) ? true : false;
                    console.log(b);
                    if (dvPlus >= datumVreme && dv <= datumVremePlus && casovi[i].flagPotvrda == 1)
                        flagZauzet = true;
                    console.log(flagZauzet);
                }
                res.json(flagZauzet);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.proveraProfNedostupan = (req, res) => {
            let korIme = req.body.korIme;
            let datumVreme = new Date(req.body.datumVremeInput);
            let datumVremeInput = req.body.datumVremeInput;
            let dupliCas = req.body.dupliCas;
            let datumVremePlus = new Date(datumVremeInput);
            if (dupliCas == false) {
                datumVremePlus.setMinutes(datumVremePlus.getMinutes() + 45);
            }
            else {
                datumVremePlus.setMinutes(datumVremePlus.getMinutes() + 90);
            }
            nedostupnost_1.default.find({ nastavnik: korIme }).then(nedostupnosti => {
                let flagNedostupan = false;
                for (let i = 0; i < nedostupnosti.length; i++) {
                    let dvOd = new Date(nedostupnosti[i].odDatumVremeInput);
                    let dvDo = new Date(nedostupnosti[i].doDatumVremeInput);
                    if (dvDo > datumVreme && dvOd < datumVremePlus)
                        flagNedostupan = true;
                }
                res.json(flagNedostupan);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.zakaziCas = (req, res) => {
            let datumVremeInput = req.body.datumVremeInput;
            let datumVreme = new Date(datumVremeInput);
            datumVreme.setHours(datumVreme.getHours() + 1);
            let datumVremePlus = new Date(datumVremeInput);
            datumVremePlus.setHours(datumVremePlus.getHours() + 1);
            datumVremePlus.setMinutes(datumVremePlus.getMinutes() + ((req.body.dupliCas == true) ? 90 : 45));
            let c = {
                nastavnik: req.body.nastavnik,
                ucenik: req.body.ucenik,
                predmet: req.body.predmet,
                opisTemeCasa: req.body.opisTemeCasa,
                datumVreme: datumVreme,
                datumVremePlus: datumVremePlus,
                datumVremeInput: req.body.datumVremeInput,
                dupliCas: req.body.dupliCas,
                flagPotvrda: 2,
                obrazlozenjeOdbijen: "",
                flagOdrzan: false,
                flagOtkazan: false,
                obrazlozenjeOtkazan: "",
                komentarNastavnika: "",
                komentarUcenika: "",
                ocenaZaUcenika: 0,
                ocenaZaNastavnika: 0
            };
            new cas_1.default(c).save().then(ok => {
                res.json('sacuvan');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.otkaziCas = (req, res) => {
            let nastavnik = req.body.nastavnik;
            let ucenik = req.body.ucenik;
            let predmet = req.body.predmet;
            let datumVremeInput = req.body.datumVremeInput;
            cas_1.default.deleteOne({ nastavnik: nastavnik, ucenik: ucenik, predmet: predmet, datumVremeInput: datumVremeInput }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.prihvatiCas = (req, res) => {
            let nastavnik = req.body.nastavnik;
            let ucenik = req.body.ucenik;
            let predmet = req.body.predmet;
            let datumVremeInput = req.body.datumVremeInput;
            cas_1.default.updateOne({ nastavnik: nastavnik, ucenik: ucenik, predmet: predmet, datumVremeInput: datumVremeInput }, { $set: { flagPotvrda: 1 } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odbijCas = (req, res) => {
            let nastavnik = req.body.nastavnik;
            let ucenik = req.body.ucenik;
            let predmet = req.body.predmet;
            let datumVremeInput = req.body.datumVremeInput;
            let obrazlozenjeOdbijen = req.body.obrazlozenjeOdbijen;
            cas_1.default.updateOne({ nastavnik: nastavnik, ucenik: ucenik, predmet: predmet, datumVremeInput: datumVremeInput }, { $set: { flagPotvrda: 0, obrazlozenjeOdbijen: obrazlozenjeOdbijen } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.definisiNedostupnost = (req, res) => {
            new nedostupnost_1.default(req.body).save().then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.prihvatiZahtev = (req, res) => {
            let korIme = req.body.korIme;
            nastavnik_1.default.updateOne({ korIme: korIme }, { $set: { flagAktivan: 1 } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odbijZahtev = (req, res) => {
            let korIme = req.body.korIme;
            nastavnik_1.default.updateOne({ korIme: korIme }, { $set: { flagAktivan: 0 } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dodajPredmetAdmin = (req, res) => {
            let naziv = req.body.naziv;
            let index = req.body.index;
            let p = {
                naziv: naziv,
                index: index
            };
            new predmet_1.default(p).save().then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvatiSvePredloge = (req, res) => {
            predlog_1.default.find({}).then(predlozi => {
                res.json(predlozi);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.prihvatiPredlog = (req, res) => {
            let predlog = req.body.predlog;
            let noviPredmet = req.body.noviPredmet;
            let korIme = predlog.korIme;
            let naziv = predlog.naziv;
            let np = {
                naziv: noviPredmet.naziv,
                index: noviPredmet.index
            };
            nastavnik_1.default.updateOne({ korIme: korIme }, { $push: { predmeti: np } }).then(ok => {
                console.log("trebalo bi da je stavio");
            });
            new predmet_1.default(noviPredmet).save();
            predlog_1.default.deleteOne({ korIme: korIme, naziv: naziv }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odbijPredlog = (req, res) => {
            let korIme = req.body.korIme;
            let naziv = req.body.naziv;
            predlog_1.default.deleteOne({ korIme: korIme, naziv: naziv }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.deaktivirajNastavnika = (req, res) => {
            let korIme = req.body.korIme;
            nastavnik_1.default.updateOne({ korIme: korIme }, { $set: { flagAktivan: 3 } }).then(ok => {
                res.json('ok');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.brojCasovaNastavnika2023 = (req, res) => {
            let korIme = req.body.korIme;
            cas_1.default.find({ nastavnik: korIme }).then(casovi => {
                let brojCasovaPoMesecu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (let i = 0; i < casovi.length; i++) {
                    let datumCasa = new Date(casovi[i].datumVremeInput);
                    let mesec = datumCasa.getMonth();
                    let godina = datumCasa.getFullYear();
                    if (godina == 2023 && casovi[i].flagOdrzan == true) {
                        brojCasovaPoMesecu[mesec]++;
                    }
                }
                res.json(brojCasovaPoMesecu);
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.UniversalController = UniversalController;
