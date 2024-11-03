import express from "express";
import NastavnikM from "../models/nastavnik";
import KorisnikM from "../models/korisnik";
import CasM from "../models/cas";
import cas from "../models/cas";

export class NastavnikController {

    dohvatiNastavnika = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;
        let lozinkaP = req.body.lozinka;

        NastavnikM.findOne({korIme: korImeP, lozinka: lozinkaP}).then(nastavnik => {
            res.json(nastavnik)
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvUcenikeOdrzanCas = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;

        CasM.find({nastavnik: korImeP, flagOdrzan: true}).then(casovi => {
            let uceniciKI = casovi.map(el => el.ucenik)
            uceniciKI = uceniciKI.filter((value, index, self) => self.indexOf(value) === index)
            res.json(uceniciKI)
        }).catch((err) => {
            console.log(err)
        })

    }

    //-----------------------------------------------------------------------------------------------------------------------

    izmeniIme = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novoImeP = req.body.novoIme;

        NastavnikM.updateOne({korIme : korImeP}, {$set : {ime : novoImeP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniPrezime = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novoPrezimeP = req.body.novoPrezime;

        NastavnikM.updateOne({korIme : korImeP}, {$set : {prezime : novoPrezimeP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniAdresu = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novaAdresaP = req.body.novaAdresa;

        NastavnikM.updateOne({korIme : korImeP}, {$set : {adresa : novaAdresaP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniTelefon = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novTelefonP = req.body.novTelefon;

        NastavnikM.updateOne({korIme : korImeP}, {$set : {telefon : novTelefonP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniEmail = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novEmailP = req.body.novEmail;

        // mora prvo provera da li moze da se izmeni mejl na izabrani
        KorisnikM.findOne({email: novEmailP}).then(korisnik => {

            if (korisnik != null && korisnik.email == novEmailP) {
                res.json('Trazeni mejl vec postoji. ')
            }
            else if (korisnik == null) {
                KorisnikM.updateOne({korIme: korImeP}, {$set : {email: novEmailP}}).then(ok => {
                    console.log('ok')
                })

                NastavnikM.updateOne({korIme : korImeP}, {$set : {email : novEmailP}}).then(ok => {
                    res.json('ok')
                }).catch((err) => {
                    console.log(err)
                })
            }

        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniSliku = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novaSlikaP = req.body.novaSlika;

        NastavnikM.updateOne({korIme : korImeP}, {$set : {slika : novaSlikaP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    izmeniPredmete = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let predmeti = req.body.predmeti;

        NastavnikM.updateOne({korIme : korImeP}, {$set : {predmeti : predmeti}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

    izmeniUzraste = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let uzrast = req.body.uzrast;

        NastavnikM.updateOne({korIme : korImeP}, {$set : {uzrast : uzrast}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

}