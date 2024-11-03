import express from "express";
import UcenikM from "../models/ucenik";
import ObavestenjeM from "../models/obavestenje";
import CasM from "../models/cas";
import KorisnikM from "../models/korisnik";
import korisnik from "../models/korisnik";

export class UcenikController {

    dohvatiUcenika = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;
        let lozinkaP = req.body.lozinka;

        UcenikM.findOne({korIme: korImeP, lozinka: lozinkaP}).then(ucenik => {
            res.json(ucenik)
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvatiObavestenjaZaUcenika = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;

        ObavestenjeM.find({primalac : korImeP}).then(obavestenja => {
            res.json(obavestenja)
        }).catch((err) => {
            console.log(err)
        })

    }

    dohvUcenikCasovi = (req : express.Request, res : express.Response) => {

        let korImeP = req.body.korIme;

        CasM.find({ucenik : korImeP}).then(casovi => {
            res.json(casovi)
        }).catch((err) => {
            console.log(err)
        })

    }

    //---------------------------------------------------------------------------------------------------------------------------------------------

    promeniStatusObavestenjaUBazi = (req : express.Request, res : express.Response) => {

        let id = req.body._id;
        let oldStatus = req.body.status;
        let newStatus = (oldStatus == 1) ? 0 : 1;

        ObavestenjeM.updateOne({_id : id}, {$set : {status : newStatus}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })

    }

    //---------------------------------------------------------------------------------------------------------------------------------------------

    izmeniIme = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novoImeP = req.body.novoIme;

        UcenikM.updateOne({korIme : korImeP}, {$set : {ime : novoImeP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniPrezime = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novoPrezimeP = req.body.novoPrezime;

        UcenikM.updateOne({korIme : korImeP}, {$set : {prezime : novoPrezimeP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniAdresu = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novaAdresaP = req.body.novaAdresa;

        UcenikM.updateOne({korIme : korImeP}, {$set : {adresa : novaAdresaP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniTelefon = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let novTelefonP = req.body.novTelefon;

        UcenikM.updateOne({korIme : korImeP}, {$set : {telefon : novTelefonP}}).then(ok => {
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

                UcenikM.updateOne({korIme : korImeP}, {$set : {email : novEmailP}}).then(ok => {
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

        UcenikM.updateOne({korIme : korImeP}, {$set : {slika : novaSlikaP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniTipSkole = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let noviTipSkoleP = req.body.noviTipSkole;

        UcenikM.updateOne({korIme : korImeP}, {$set : {tipSkole : noviTipSkoleP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    izmeniRazred = (req : express.Request, res : express.Response) => {
        let korImeP = req.body.korIme;
        let noviRazredP = req.body.noviRazred;

        UcenikM.updateOne({korIme : korImeP}, {$set : {razred : noviRazredP}}).then(ok => {
            res.json('ok')
        }).catch((err) => {
            console.log(err)
        })
    }

}