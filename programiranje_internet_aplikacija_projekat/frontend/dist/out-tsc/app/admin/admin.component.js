import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Predmet } from '../models/predmet';
import { Korisnik } from '../models/korisnik';
let AdminComponent = class AdminComponent {
    constructor(universalService, router) {
        this.universalService = universalService;
        this.router = router;
        this.korisnik = new Korisnik();
        this.sviPredmeti = [];
        this.sviPredmetiNaziv = [];
        this.brojNastavnikaNaPredmetuArr = [];
        this.sviNastavnici = [];
        this.sviAktivniNastavnici = [];
        this.polNastavnici = [0, 0];
        this.flagAktivanValues = [0, 0, 0];
        this.angazovanost2023 = new Array();
        this.sviUcenici = [];
        this.polUcenici = [0, 0];
        this.sviCasovi = [];
        this.potvrda = [0, 0, 0]; // po labelama: 0-odbijen, 1-prihvacen, 2-nije jos potvrdjen
        this.zahteviReg = [];
        this.noviPredmet = "";
        this.sviPredlozi = [];
        this.odrzanihPon = 0;
        this.odrzanihUto = 0;
        this.odrzanihSre = 0;
        this.odrzanihCet = 0;
        this.odrzanihPet = 0;
        this.odrzanihSub = 0;
        this.odrzanihNed = 0;
        this.prosekPoDanu = [0, 0, 0, 0, 0, 0, 0];
    }
    ngOnInit() {
        let k = localStorage.getItem("logovaniKorisnik");
        if (k != null) {
            this.korisnik = JSON.parse(k);
            this.dohvatiSvePredmete();
            //this.generisanjeHistograma()
            this.dohvatiSveNastavnike();
            //this.generisanjePie1()
            this.dohvatiSveUcenike();
            //this.generisanjePie2()
            this.dohvatiSveCasove();
            //this.generisanjePie3()
            //this.generisanjePie4()
            //this.generisanjeHistograma2()
            this.dohvatiZahteveNastavnika();
            this.dohvatiSvePredloge();
            //this.generisanjelLineChart()
            //this.generisanjeHistograma()
            //this.generisanjePie1()
            //this.generisanjePie2()
            //this.generisanjePie3()
            //this.generisanjePie4()
            //this.generisanjeHistograma2()
        }
    }
    odjava(event) {
        event.preventDefault();
        localStorage.removeItem("logovaniKorisnik");
        this.router.navigate(['']);
    }
    refreshData() {
        this.noviPredmet = "";
        this.odrzanihPon = 0;
        this.odrzanihUto = 0;
        this.odrzanihSre = 0;
        this.odrzanihCet = 0;
        this.odrzanihPet = 0;
        this.odrzanihSub = 0;
        this.odrzanihNed = 0;
        this.prosekPoDanu = [0, 0, 0, 0, 0, 0, 0];
        this.lineChart.destroy();
        this.chartHistogram1.destroy();
        this.chartHistogram2.destroy();
        this.chartPie1.destroy();
        this.chartPie2.destroy();
        this.chartPie3.destroy();
        this.chartPie4.destroy();
        this.polNastavnici = [0, 0];
        this.flagAktivanValues = [0, 0, 0];
        this.polUcenici = [0, 0];
        this.potvrda = [0, 0, 0];
        this.sviNastavnici = [];
        this.sviAktivniNastavnici = [];
        this.angazovanost2023 = []; //!!!!!!!!!!!!!!!!!!!!!!
        this.sviPredmeti = [];
        this.sviPredmetiNaziv = [];
        this.brojNastavnikaNaPredmetuArr = [];
        this.sviUcenici = [];
        this.sviCasovi = [];
        this.zahteviReg = [];
        this.sviPredlozi = [];
        this.dohvatiSvePredmete();
        //this.generisanjeHistograma()
        this.dohvatiSveNastavnike();
        //this.generisanjePie1()
        this.dohvatiSveUcenike();
        //this.generisanjePie2()
        this.dohvatiSveCasove();
        //this.generisanjePie3()
        //this.generisanjePie4()
        //this.generisanjeHistograma2()
        //this.generisanjelLineChart()
        this.dohvatiZahteveNastavnika();
        this.dohvatiSvePredloge();
        //this.generisanjeHistograma()
        //this.generisanjePie1()
        //this.generisanjePie2()
        //this.generisanjePie3()
        //this.generisanjePie4()
        //this.generisanjeHistograma2()
        //this.generisanjelLineChart()
    }
    dodajPredmetAdmin() {
        let noviPredmetIndex = this.sviPredmeti.length;
        this.universalService.dodajPredmetAdmin(this.noviPredmet, noviPredmetIndex).subscribe(data => {
            if (data != null) {
                this.refreshData();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    prihvatiPredlog(p) {
        let np = new Predmet();
        np.naziv = p.naziv;
        np.index = this.sviPredmeti.length;
        this.universalService.prihvatiPredlog(p, np).subscribe(data => {
            if (data != null) {
                this.refreshData();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    odbijPredlog(p) {
        this.universalService.odbijPredlog(p).subscribe(data => {
            if (data != null) {
                this.refreshData();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiSvePredloge() {
        this.universalService.dohvatiSvePredloge().subscribe(data => {
            if (data != null) {
                this.sviPredlozi = data;
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiZahteveNastavnika() {
        this.universalService.dohvatiZahteveNastavnika().subscribe(data => {
            if (data != null) {
                this.zahteviReg = data;
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    prihvatiZahtev(n) {
        this.universalService.prihvatiZahtev(n).subscribe(data => {
            if (data != null) {
                this.refreshData();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    odbijZahtev(n) {
        this.universalService.odbijZahtev(n).subscribe(data => {
            if (data != null) {
                this.refreshData();
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    azurirajPodatkeNastavnika(n, event) {
        event.preventDefault();
        localStorage.setItem("logovaniKorisnik", JSON.stringify(this.korisnik));
        localStorage.setItem("nastavnikZaAzuriranje", JSON.stringify(n));
        this.router.navigate(['azurirajNastavnika']);
    }
    dohvatiSveUcenike() {
        this.universalService.dohvatiSveUcenike().subscribe(data => {
            if (data != null) {
                this.sviUcenici = data;
                let flagFirstIter = true;
                for (let i = 0; i < this.sviUcenici.length; i++) {
                    if (this.sviUcenici[i].pol == 'M')
                        this.polUcenici[0]++;
                    else
                        this.polUcenici[1]++;
                    if (flagFirstIter) {
                        flagFirstIter = false;
                    }
                    else {
                        this.chartPie2.destroy();
                    }
                    this.generisanjePie2();
                }
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiSveNastavnike() {
        this.universalService.dohvSveNastavnike().subscribe(data => {
            if (data != null) {
                this.sviNastavnici = data;
                //-----------------------------------------------------------------------------
                let cntAktivniNastavnici = 0;
                for (let i = 0; i < this.sviNastavnici.length; i++) {
                    if (this.sviNastavnici[i].flagAktivan == 1)
                        cntAktivniNastavnici++;
                }
                let a23 = new Array();
                for (let i = 0; i < cntAktivniNastavnici; i++) {
                    a23.push(new Array());
                }
                let cntA23 = 0;
                let flagFirstIter = true;
                let flagFirstIter2 = true;
                let flagFirstIter3 = true;
                //-----------------------------------------------------------------------------
                for (let i = 0; i < this.sviNastavnici.length; i++) {
                    if (this.sviNastavnici[i].pol == 'M')
                        this.polNastavnici[0]++;
                    else
                        this.polNastavnici[1]++;
                    if (flagFirstIter2) {
                        flagFirstIter2 = false;
                    }
                    else {
                        this.chartPie1.destroy();
                    }
                    this.generisanjePie1();
                    if (this.sviNastavnici[i].flagAktivan == 0)
                        this.flagAktivanValues[0]++;
                    else if (this.sviNastavnici[i].flagAktivan == 1)
                        this.flagAktivanValues[1]++;
                    else if (this.sviNastavnici[i].flagAktivan == 2)
                        this.flagAktivanValues[2]++;
                    if (this.sviNastavnici[i].flagAktivan == 1)
                        this.sviAktivniNastavnici.push(this.sviNastavnici[i]);
                    if (flagFirstIter3) {
                        flagFirstIter3 = false;
                    }
                    else {
                        this.chartPie4.destroy();
                    }
                    this.generisanjePie4();
                    if (this.sviNastavnici[i].flagAktivan == 1) {
                        // provera koliko je casova drzao u 2023
                        this.universalService.brojCasovaNastavnika2023(this.sviNastavnici[i].korIme).subscribe(data => {
                            if (data != null) {
                                // vratice array pomesecima koliko je casova drzao
                                this.angazovanost2023.push(data);
                                this.angazovanost2023.sort((a, b) => (a.reduce((accumulator, currentValue) => accumulator + currentValue, 0) > b.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) ? 1 : -1);
                                this.angazovanost2023.slice(0, 10);
                                if (flagFirstIter) {
                                    flagFirstIter = false;
                                }
                                else {
                                    this.lineChart.destroy();
                                }
                                this.generisanjelLineChart();
                            }
                            else {
                                console.log("Greska. ");
                            }
                        });
                    }
                }
                // treba da sortiramo po angazovanosti i slice-ujemo samo prvih 10 najangazovanijih
                /*
                this.angazovanost2023.sort((a, b) => (
                  a.reduce((accumulator, currentValue) => accumulator + currentValue, 0) > b.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                  ) ? 1 : -1);*/
                console.log("u dhov: ");
                console.log(this.angazovanost2023[0]);
                //this.angazovanost2023.slice(0, 10);
                //this.generisanjelLineChart()
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiSveCasove() {
        this.universalService.dohvatiSveCasove().subscribe(data => {
            if (data != null) {
                this.sviCasovi = data;
                let flagFirstIter = true;
                let flagFirstIter2 = true;
                for (let i = 0; i < this.sviCasovi.length; i++) {
                    if (this.sviCasovi[i].flagPotvrda == 0)
                        this.potvrda[0]++;
                    else if (this.sviCasovi[i].flagPotvrda == 1)
                        this.potvrda[1]++;
                    else
                        this.potvrda[2]++;
                    if (flagFirstIter) {
                        flagFirstIter = false;
                    }
                    else {
                        this.chartPie3.destroy();
                    }
                    this.generisanjePie3();
                    let dTemp = new Date(this.sviCasovi[i].datumVremeInput);
                    if (this.sviCasovi[i].flagOdrzan == true && dTemp.getFullYear() == 2023) {
                        if (dTemp.getDay() == 0)
                            this.odrzanihNed++;
                        else if (dTemp.getDay() == 1)
                            this.odrzanihPon++;
                        else if (dTemp.getDay() == 2)
                            this.odrzanihUto++;
                        else if (dTemp.getDay() == 3)
                            this.odrzanihSre++;
                        else if (dTemp.getDay() == 4)
                            this.odrzanihCet++;
                        else if (dTemp.getDay() == 5)
                            this.odrzanihPet++;
                        else if (dTemp.getDay() == 6)
                            this.odrzanihSub++;
                        // ***********
                        this.prosekPoDanu[0] = this.odrzanihPon / 52;
                        this.prosekPoDanu[1] = this.odrzanihUto / 52;
                        this.prosekPoDanu[2] = this.odrzanihSre / 52;
                        this.prosekPoDanu[3] = this.odrzanihCet / 52;
                        this.prosekPoDanu[4] = this.odrzanihPet / 52;
                        this.prosekPoDanu[5] = this.odrzanihSub / 52;
                        this.prosekPoDanu[6] = this.odrzanihNed / 52;
                        if (flagFirstIter2) {
                            flagFirstIter2 = false;
                        }
                        else {
                            this.chartHistogram2.destroy();
                        }
                        this.generisanjeHistograma2();
                    }
                }
                this.prosekPoDanu[0] = this.odrzanihPon / 52;
                this.prosekPoDanu[1] = this.odrzanihUto / 52;
                this.prosekPoDanu[2] = this.odrzanihSre / 52;
                this.prosekPoDanu[3] = this.odrzanihCet / 52;
                this.prosekPoDanu[4] = this.odrzanihPet / 52;
                this.prosekPoDanu[5] = this.odrzanihSub / 52;
                this.prosekPoDanu[6] = this.odrzanihNed / 52;
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    dohvatiSvePredmete() {
        this.universalService.dohvSvePredmete().subscribe(data => {
            if (data != null) {
                this.sviPredmeti = data;
                let flagFirstIter = true;
                for (let i = 0; i < this.sviPredmeti.length; i++) {
                    this.universalService.brojNastavnikaNaPredmetu(this.sviPredmeti[i].naziv).subscribe(data2 => {
                        if (data2 != null) {
                            this.brojNastavnikaNaPredmetuArr[i] = data2;
                            this.sviPredmetiNaziv[i] = this.sviPredmeti[i].naziv;
                            if (flagFirstIter) {
                                flagFirstIter = false;
                            }
                            else {
                                this.chartHistogram1.destroy();
                            }
                            this.generisanjeHistograma();
                        }
                        else {
                            console.log("Greska. ");
                        }
                    });
                }
            }
            else {
                console.log("Greska. ");
            }
        });
    }
    generisanjelLineChart() {
        console.log("angazovanost2023:");
        console.log(this.angazovanost2023);
        Chart.register(...registerables);
        this.lineChart = new Chart("lineChart", {
            type: 'line',
            data: {
                labels: ['jan', 'feb', 'mart', 'apr', 'maj', 'jun', 'jul', 'avg', 'sept', 'okt', 'nov', 'dec'],
                datasets: [
                    {
                        label: '1.',
                        data: this.angazovanost2023[0],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '2.',
                        data: this.angazovanost2023[1],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '3.',
                        data: this.angazovanost2023[2],
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '4.',
                        data: this.angazovanost2023[3],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '5.',
                        data: this.angazovanost2023[4],
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '6.',
                        data: this.angazovanost2023[5],
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '7.',
                        data: this.angazovanost2023[6],
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '8.',
                        data: this.angazovanost2023[7],
                        backgroundColor: 'rgba(0, 255, 0, 0.2)',
                        borderColor: 'rgba(0, 255, 0, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '9.',
                        data: this.angazovanost2023[8],
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '10.',
                        data: this.angazovanost2023[9],
                        backgroundColor: 'rgba(128, 0, 128, 0.2)',
                        borderColor: 'rgba(128, 0, 128, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, },
                }
            }
        });
    }
    generisanjeHistograma() {
        Chart.register(...registerables);
        this.chartHistogram1 = new Chart("histogramCanvas", {
            type: 'bar',
            data: {
                labels: this.sviPredmetiNaziv,
                datasets: [{
                        label: 'Broj nastavnika po predmetu',
                        data: this.brojNastavnikaNaPredmetuArr,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, },
                }
            }
        });
    }
    generisanjeHistograma2() {
        Chart.register(...registerables);
        this.chartHistogram2 = new Chart("histogram2", {
            type: 'bar',
            data: {
                labels: ['PON', 'UTO', 'SRE', 'CET', 'PET', 'SUB', 'NED'],
                datasets: [{
                        label: 'Broj casova po danu',
                        data: this.prosekPoDanu,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, },
                }
            }
        });
    }
    generisanjePie1() {
        Chart.register(...registerables);
        this.chartPie1 = new Chart("pie1", {
            type: 'pie',
            data: {
                labels: ['M', 'Z'],
                datasets: [{
                        label: 'Raspodela nastavnika po polu',
                        data: this.polNastavnici,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, },
                }
            }
        });
    }
    generisanjePie2() {
        Chart.register(...registerables);
        this.chartPie2 = new Chart("pie2", {
            type: 'pie',
            data: {
                labels: ['M', 'Z'],
                datasets: [{
                        label: 'Raspodela ucenika po polu',
                        data: this.polUcenici,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, },
                }
            }
        });
    }
    generisanjePie3() {
        Chart.register(...registerables);
        this.chartPie3 = new Chart("pie3", {
            type: 'pie',
            data: {
                labels: ['odbijen', 'potvrdjen', 'nije razmotren'],
                datasets: [{
                        label: 'Potvrda casa',
                        data: this.potvrda,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, },
                }
            }
        });
    }
    generisanjePie4() {
        Chart.register(...registerables);
        this.chartPie4 = new Chart("pie4", {
            type: 'pie',
            data: {
                labels: ['odbijen', 'potvrdjen', 'nije razmotren'],
                datasets: [{
                        label: 'Potvrda nastavika',
                        data: this.flagAktivanValues,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, },
                }
            }
        });
    }
};
AdminComponent = __decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.css']
    })
], AdminComponent);
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map