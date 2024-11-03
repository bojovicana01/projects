import express from "express";
import PredmetM from "../models/predmet";
import UcenikM from "../models/ucenik";
import NastavnikM from "../models/nastavnik";
import KorisnikM from "../models/korisnik";
import CasM from "../models/cas";
import NedostupnostM from "../models/nedostupnost";
import PredlogM from "../models/predlog";

import { sha512} from 'js-sha512';

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import nastavnik from "../models/nastavnik";
import ucenik from "../models/ucenik";

export class UniversalController {

    dohvatiKorisnika = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;

        KorisnikM.findOne({korIme : korImeP}).then(kor => {
            res.json(kor)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiUcenika = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;

        UcenikM.findOne({korIme : korImeP}).then(u => {
            res.json(u)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiNastavnika = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;

        NastavnikM.findOne({korIme : korImeP}).then(n => {
            res.json(n)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiCasoveUN = (req : express.Request, res : express.Response) => {
        let ucenik = req.body.ucenik;
        let nastavnik = req.body.nastavnik;

        CasM.find({ucenik: ucenik, nastavnik: nastavnik}).then(casovi => {
            res.json(casovi)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiCasoveNastavnika = (req : express.Request, res : express.Response) => {
        let nastavnik = req.body.nastavnik;

        CasM.find({nastavnik: nastavnik}).then(casovi => {
            res.json(casovi)
        }).catch((err) => {
            console.log(err)
        })
    }

    

    dohvSvePredmete = (req : express.Request, res : express.Response) => {
        PredmetM.find({}).then(predmeti => {
            res.json(predmeti)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiSveCasove = (req : express.Request, res : express.Response) => {
        CasM.find({}).then(casovi => {
            res.json(casovi)
        }).catch((err) => {
            console.log(err)
        })
    }

    brojNastavnikaNaPredmetu = (req : express.Request, res : express.Response) => {

        let naziv = req.body.naziv;

        NastavnikM.find({"predmeti.naziv": {$in : [naziv]}, flagAktivan: 1}).then(nastavnici => {
            if (nastavnici.length > 0) {
                res.json(nastavnici.length)
            }
            else {
                res.json(0)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvSveNastavnike = (req : express.Request, res : express.Response) => {
        NastavnikM.find({}).then(nastavnici => {
            res.json(nastavnici)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiSveUcenike = (req : express.Request, res : express.Response) => {
        UcenikM.find({}).then(ucenici => {
            res.json(ucenici)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvBrojUcenika = (req : express.Request, res : express.Response) => {
        UcenikM.find({}).count().then(brojUcenika => {
            res.json(brojUcenika)
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiZahteveNastavnika = (req : express.Request, res : express.Response) => {
        NastavnikM.find({flagAktivan: 2}).then(nastavnici => {
            res.json(nastavnici)
        }).catch((err) => {
            console.log(err)
        })
    }

    login = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;
        let lozinkaP = req.body.lozinka;

        KorisnikM.findOne({korIme : korImeP, lozinka : sha512(lozinkaP)}).then(kor => {
            res.json(kor)
        }).catch((err) => {
            console.log(err)
        })

    }


    registrujUcenika = (req : express.Request, res : express.Response) => {

        req.body.lozinka = sha512(req.body.lozinka);

        let uKorIme = req.body.korIme;
        let uLozinka = req.body.lozinka;
        let uEmail = req.body.email;

        let k = {
            korIme : uKorIme, 
            lozinka : uLozinka, 
            email : uEmail, 
            flagTip : 0
        }

        new KorisnikM(k).save()

        new UcenikM(req.body).save().then(ok => {
            res.json('sacuvan')
        })
    }

    registrujNastavnika= (req : express.Request, res : express.Response) => {

        req.body.lozinka = sha512(req.body.lozinka);

        let nKorIme = req.body.korIme;
        let nLozinka = req.body.lozinka;
        let nEmail = req.body.email;

        console.log("controller")
        console.log(req.body.uzrast)

        let k = {
            korIme : nKorIme, 
            lozinka : nLozinka, 
            email : nEmail, 
            flagTip : 1
        }

        new KorisnikM(k).save()

        new NastavnikM(req.body).save().then(ok => {
            res.json('sacuvan')
        })
    }

    dodajPredlogPredmeta = (req : express.Request, res : express.Response) => {
        let naziv = req.body.naziv;
        let korIme = req.body.korIme;

        let p = {
            naziv: naziv, 
            korIme: korIme
        }

        new PredlogM(p).save().then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    proveraPostojanjaKorIme = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;

        KorisnikM.findOne({korIme : korImeP}).then(kor => {
            if (kor != null) {
                res.json('postoji')
            }
            else {
                res.json('ne postoji')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    proveraPostojanjaEmail = (req : express.Request, res : express.Response) => {
        let emailP = req.body.email;

        KorisnikM.findOne({email : emailP}).then(kor => {
            if (kor != null) {
                res.json('postoji')
            }
            else {
                res.json('ne postoji')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    dodajSliku = (req : express.Request, res : express.Response) => {
        
        let korIme = req.body.korIme;
        let naziv = req.body.naziv;
        let sadrzaj = req.body.sadrzaj;
        let flagUN = req.body.flagUN;

        let id = uuidv4();

        if (flagUN == 1) { // nastavnik
            NastavnikM.updateOne({korIme : korIme}, {$set : {slika : naziv, slikaId : id}}).then(ok => {
                console.log("dodata slika")
                console.log(naziv)
            }).catch((err) => {
                console.log(err)
            })
        }
        else if (flagUN == 0) { // ucenik
            UcenikM.updateOne({korIme : korIme}, {$set : {slika : naziv, slikaId : id}}).then(ok => {
                console.log("dodata slika")
                console.log(naziv)
            }).catch((err) => {
                console.log(err)
            })
        }

        let fajlNaDisku = fs.createWriteStream(id)
        fajlNaDisku.write(sadrzaj)
        fajlNaDisku.end()

        res.json(id)

    }

    dodajBiografiju = (req : express.Request, res : express.Response) => {


        let korIme = req.body.korIme;
        let naziv = req.body.naziv;
        let sadrzaj = req.body.sadrzaj;
        let flagUN = req.body.flagUN;

        let id = uuidv4();

        if (flagUN == 1) { // nastavnik
            NastavnikM.updateOne({korIme : korIme}, {$set : {biografija : naziv, biografijaId : id}}).then(ok => {
                console.log("dodata bio")
                console.log(naziv)
            }).catch((err) => {
                console.log(err)
            })
        }

        let fajlNaDisku = fs.createWriteStream(id)
        fajlNaDisku.write(sadrzaj)
        fajlNaDisku.end()

        res.json(id)

    }

    dohvFajl = (req : express.Request, res : express.Response) => {

        let id = req.body.id;
        let flagUN = req.body.flagUN;

        if (flagUN == 1) {
            NastavnikM.findOne({slikaId : id}).then(slika => {
                let sadrzaj = fs.readFileSync(id)
                let retSadrzaj = sadrzaj.toString()
                res.json(retSadrzaj)
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            UcenikM.findOne({slikaId : id}).then(slika => {
                let sadrzaj = fs.readFileSync(id)
                let retSadrzaj = sadrzaj.toString()
                res.json(retSadrzaj)
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    promeniLozinku = (req : express.Request, res : express.Response) => {

        let korIme = req.body.korIme;
        let novaLozinka = req.body.novaLozinka;
        let flagTip = req.body.flagTip;

        if (flagTip == 0) {
            UcenikM.updateOne({korIme : korIme}, {$set : {lozinka : sha512(novaLozinka)}}).then(ok => {
                res.json('ok')
            }).catch((err) => {
                console.log(err)
            })
        }
        else if (flagTip == 1) {
            NastavnikM.updateOne({korIme : korIme}, {$set : {lozinka : sha512(novaLozinka)}}).then(ok => {
                res.json('ok')
            }).catch((err) => {
                console.log(err)
            })
        }

    }

    promeniLozinkuKorisnikM = (req : express.Request, res : express.Response) => {

        let korIme = req.body.korIme;
        let novaLozinka = req.body.novaLozinka;

        KorisnikM.updateOne({korIme : korIme}, {$set : {lozinka : sha512(novaLozinka)}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })

    }

    //-----------------------------------------------------------------------------------------------------------------CASOVI

    proveraPostojiCas = (req : express.Request, res : express.Response) => {

        let korIme = req.body.korIme;
        let datumVreme = new Date(req.body.datumVremeInput)
        let datumVremeInput = req.body.datumVremeInput;
        let dupliCas = req.body.dupliCas;

        let datumVremePlus = new Date(datumVremeInput);
        if (dupliCas == false) {
            datumVremePlus.setMinutes(datumVremePlus.getMinutes() + 45);

        }
        else {
            datumVremePlus.setMinutes(datumVremePlus.getMinutes() + 90);
        }

        CasM.find({nastavnik : korIme}).then(casovi => {

            let flagZauzet = false;

            for (let i = 0; i < casovi.length; i++) {

                let dv = new Date(casovi[i].datumVremeInput!);
                let dvPlus = new Date(casovi[i].datumVremeInput!);

                if (casovi[i].dupliCas == false) {
                    dvPlus?.setMinutes(dvPlus.getMinutes() + 45)
                } 
                else {
                    dvPlus?.setMinutes(dvPlus.getMinutes() + 90)
                }

                let b = (dvPlus! >= datumVreme && dv! <= datumVremePlus) ? true : false
                console.log(b)

                if (dvPlus! >= datumVreme && dv! <= datumVremePlus && casovi[i].flagPotvrda == 1) flagZauzet = true;

                console.log(flagZauzet)
            }

            res.json(flagZauzet)

        }).catch((err) => {
            console.log(err)
        })

    }

    proveraProfNedostupan = (req : express.Request , res : express.Response) => {

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

        NedostupnostM.find({nastavnik : korIme}).then(nedostupnosti => {

            let flagNedostupan = false;

            for (let i = 0; i < nedostupnosti.length; i++) {

                let dvOd = new Date(nedostupnosti[i].odDatumVremeInput!);
                let dvDo = new Date(nedostupnosti[i].doDatumVremeInput!);

                if (dvDo! > datumVreme && dvOd! < datumVremePlus) flagNedostupan = true;

            }

            res.json(flagNedostupan)

        }).catch((err) => {
            console.log(err)
        })

    }

    zakaziCas = (req : express.Request, res : express.Response) => {

        let datumVremeInput = req.body.datumVremeInput;

        let datumVreme = new Date(datumVremeInput);
        datumVreme.setHours(datumVreme.getHours() + 1)

        let datumVremePlus = new Date(datumVremeInput);
        datumVremePlus.setHours(datumVremePlus.getHours() + 1)
        datumVremePlus.setMinutes(datumVremePlus.getMinutes() + ((req.body.dupliCas == true) ? 90 : 45))

        let c = {
            nastavnik : req.body.nastavnik, 
            ucenik : req.body.ucenik, 
            predmet : req.body.predmet, 
            opisTemeCasa : req.body.opisTemeCasa, 
            datumVreme : datumVreme, 
            datumVremePlus : datumVremePlus, 
            datumVremeInput : req.body.datumVremeInput, 
            dupliCas : req.body.dupliCas,
            flagPotvrda : 2, 
            obrazlozenjeOdbijen : "", 
            flagOdrzan : false, 
            flagOtkazan : false, 
            obrazlozenjeOtkazan : "", 
            komentarNastavnika : "", 
            komentarUcenika : "", 
            ocenaZaUcenika : 0, 
            ocenaZaNastavnika : 0
        }

        new CasM(c).save().then(ok => {
            res.json('sacuvan')
        }).catch((err) => {
            console.log(err)
        })
    }

    otkaziCas = (req : express.Request, res : express.Response) => {

        let nastavnik = req.body.nastavnik;
        let ucenik = req.body.ucenik;
        let predmet = req.body.predmet;
        let datumVremeInput = req.body.datumVremeInput;


        CasM.deleteOne({nastavnik: nastavnik, ucenik: ucenik, predmet: predmet, datumVremeInput: datumVremeInput}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    prihvatiCas = (req : express.Request, res : express.Response) => {

        let nastavnik = req.body.nastavnik;
        let ucenik = req.body.ucenik;
        let predmet = req.body.predmet;
        let datumVremeInput = req.body.datumVremeInput;


        CasM.updateOne({nastavnik: nastavnik, ucenik: ucenik, predmet: predmet, datumVremeInput: datumVremeInput}, 
            {$set : {flagPotvrda: 1}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    odbijCas = (req : express.Request, res : express.Response) => {

        let nastavnik = req.body.nastavnik;
        let ucenik = req.body.ucenik;
        let predmet = req.body.predmet;
        let datumVremeInput = req.body.datumVremeInput;

        let obrazlozenjeOdbijen = req.body.obrazlozenjeOdbijen;


        CasM.updateOne({nastavnik: nastavnik, ucenik: ucenik, predmet: predmet, datumVremeInput: datumVremeInput}, 
            {$set : {flagPotvrda: 0, obrazlozenjeOdbijen: obrazlozenjeOdbijen}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    definisiNedostupnost = (req : express.Request, res : express.Response) => {
        new NedostupnostM(req.body).save().then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }


    prihvatiZahtev = (req : express.Request, res : express.Response) => {

        let korIme = req.body.korIme;

        NastavnikM.updateOne({korIme: korIme}, {$set : {flagAktivan: 1}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    odbijZahtev = (req : express.Request, res : express.Response) => {

        let korIme = req.body.korIme;

        NastavnikM.updateOne({korIme: korIme}, {$set : {flagAktivan: 0}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    dodajPredmetAdmin = (req : express.Request, res : express.Response) => {
        let naziv = req.body.naziv;
        let index = req.body.index;

        let p = {
            naziv: naziv, 
            index: index
        }

        new PredmetM(p).save().then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    dohvatiSvePredloge = (req : express.Request, res : express.Response) => {
        PredlogM.find({}).then(predlozi => {
            res.json(predlozi)
        }).catch((err) => {
            console.log(err)
        })
    }

    prihvatiPredlog = (req : express.Request, res : express.Response) => {
        let predlog = req.body.predlog;
        let noviPredmet = req.body.noviPredmet;

        let korIme = predlog.korIme;
        let naziv = predlog.naziv;

        let np = {
            naziv: noviPredmet.naziv, 
            index: noviPredmet.index
        }

        NastavnikM.updateOne({korIme: korIme}, {$push : {predmeti: np}}).then(ok => {
            console.log("trebalo bi da je stavio")
        })
        
        new PredmetM(noviPredmet).save()

        PredlogM.deleteOne({korIme: korIme, naziv: naziv}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    odbijPredlog = (req : express.Request, res : express.Response) => {
        let korIme = req.body.korIme;
        let naziv = req.body.naziv;

        PredlogM.deleteOne({korIme: korIme, naziv: naziv}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    deaktivirajNastavnika = (req : express.Request, res : express.Response) => {
        let korIme = req.body.korIme;

        NastavnikM.updateOne({korIme: korIme}, {$set : {flagAktivan: 3}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    brojCasovaNastavnika2023 = (req : express.Request, res : express.Response) => {
        let korIme = req.body.korIme;

        CasM.find({nastavnik: korIme}).then(casovi => {

            let brojCasovaPoMesecu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            for (let i = 0; i < casovi.length; i++) {

                let datumCasa = new Date(casovi[i].datumVremeInput!);

                let mesec = datumCasa.getMonth();
                let godina = datumCasa.getFullYear();

                if (godina == 2023 && casovi[i].flagOdrzan == true) {
                    brojCasovaPoMesecu[mesec]++;
                }
            }

            res.json(brojCasovaPoMesecu);
            
        }).catch((err) => {
            console.log(err)
        })
    }
}