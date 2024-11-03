<?php

namespace App\Controllers;
use App\Models\Recenzija;
use App\Models\Materijal;
use App\Models\Boja;
use App\Models\GNamestaj;
use App\Models\SlikaGotovNamestaj;
use App\Models\ModelNamestaja;
use App\Models\TipNamestaja;
use App\Models\SlikaMaterijal;
use App\Models\NamestajPoMeri;
use App\Models\SlikaNamestajPoMeri;
use App\Models\SlikaBoja;
use App\Models\Korisnik;
use App\Models\NarucenNamestajPoMeri;
use App\Models\StavkaGotovNamestaj;
use App\Models\StavkaNamestajPoMeri;
use App\Models\StavkaPorudzbine;
use App\Models\Porudzbine;
class Moderator extends Prijavljen
{
   protected function prikaz($page, $data) {
        $data['controller']='Moderator';
        echo view ("prototip/$page", $data);
    }
    public function index(){
        $this->prikaz("opcijeModeratora", null);
    }
    
    public function prikaziRecenzijuPre() {
        $this->prikaz('dodajRecenziju', []);
    }
    
    public function dodajMaterijalPre(){
        $this->prikaz('dodajMaterijal', []);
    }
    
    public function dodajMaterijal(){
        $rules=[
            'materijal'=> 'required',
            'materijalCena' => 'required',
            'proizvodi' =>'required',
            'slikaMat' => 'required'
            ];
        if(!$this->validate($rules)) return $this->prikaz('dodajMaterijal', ['poruka'=>'Niste popunili sva polja!']);
        $materijal = $this->request->getVar('materijal');
        $cena = $this->request->getVar('materijalCena');
        $urlSlike = $this->request->getVar('slikaMat');
        $sifreProizvoda = $this->request->getVar('proizvodi');
        $sifreProizvoda = explode(",", $sifreProizvoda);
        $materijalModel= new Materijal();
        
        //provera za cenu
        if($cena<=0 || !is_numeric($cena)) return $this->prikaz('dodajMaterijal', ['poruka'=>'Unesite pravilno cenu!']);
        
        //provera da li materijal vec postoji
        $red = $materijalModel->where('Naziv',$materijal)->find();
        if($red) return $this->prikaz('dodajMaterijal', ['poruka'=>'Materijal vec postoji u bazi!']);
        
        //provera da li su uneti samo brojevi za sifre proizvoda
        foreach ($sifreProizvoda as $p) {
            if(!is_numeric($p)){
                return $this->prikaz('dodajMaterijal', ['poruka'=>'Unesite samo brojeve za sifre proizvoda!']);
            }
            
        }
        
        if(!empty($this->request->getVar('flag'))){
            $materijalModel->insert([
            'IdMat'=>89,
            'Naziv'=>$materijal,
            'Cena'=> $cena
        ]);
        }
        else{
            $materijalModel->insert([
            
            'Naziv'=>$materijal,
            'Cena'=> $cena
            ]);
        }
        
        
        
        $id = $materijalModel->getInsertID();
        
        $slikaMaterijalModel = new SlikaMaterijal();
        $kor=null;
        if($this->session->has('moderator'))$kor = $this->session->get('moderator')->IdKor;
        else $kor = 1;
        
         if(!empty($this->request->getVar('flag2'))){
            $slikaMaterijalModel->insert([
            'IdMat' => 10,
            'IdKor' => $kor,
            'Link' => $urlSlike,
            'IdSlM'=> 899
        ]);
        }
        else{
            $slikaMaterijalModel->insert([
            'IdMat' => $id,
            'IdKor' => $kor,
            'Link' => $urlSlike 
        ]);
        }
        
        
        
        
        $gotovNamestajModel = new GNamestaj();
        foreach ($sifreProizvoda as $proizvod) {
           $proizvod = $gotovNamestajModel->where('IdGN',$proizvod)->first();
           if($proizvod) $gotovNamestajModel->update($proizvod->IdGN,['IdMat' => $id]);
           
        }
        
        $this->prikaz('uspeh', []);
    }
    
    public function dodajBojuPre(){
        $this->prikaz('dodajBoju', []);
    }
    
    public function dodajBoju() {
        $rules=[
            'naziv'=> 'required',
            'cena' => 'required',
            'slikaBoje' =>'required'
            ];
        if(!$this->validate($rules)) return $this->prikaz('dodajBoju', ['poruka'=>'Niste popunili sva polja!']);
        $bojaModel = new Boja();
        $naziv = $this->request->getVar('naziv');
        $urlSlike = $this->request->getVar('slikaBoje');
        $cena = $this->request->getVar('cena');
        
        //provera za cenu
        if($cena<=0 || !is_numeric($cena)) return $this->prikaz('dodajBoju', ['poruka'=>'Unesite pravilno cenu!']);
        
        //provera da li boja vec postoji u bazi
        $red = $bojaModel->where('Naziv',$naziv)->find();
        if($red) return $this->prikaz('dodajBoju', ['poruka'=>'Boja vec postoji u bazi!']);
        
        if(!empty($this->request->getVar('flag'))){
            $bojaModel->insert([
            'IdBoj'=>899,
            'Naziv'=>$naziv,
            'Cena'=> $cena
        ]);
        }
        else{
         $bojaModel->insert([
            
            'Naziv'=>$naziv,
            'Cena'=> $cena
        ]);
        }
         $id = $bojaModel->getInsertID();
        
         $slikaBojaModel = new SlikaBoja();
         
         $moderator=null;
         $administrator=null;
         //dohvatanje moderatora ili administratora
         if (isset($_SESSION['moderator'])) {
             $moderator = $this->session->get('moderator')->KorisnickoIme;
         }
         if(isset($_SESSION['administrator'])){
             $administrator = $this->session->get('administrator')->KorisnickoIme;
         }   
         
         $IdKor = null;
         if($moderator){
             $korisnikModel = new Korisnik();
             $IdKor = $korisnikModel->dohvati($moderator)->IdKor;
         }
         else if($administrator){
             $korisnikModel = new Korisnik();
             $IdKor = $korisnikModel->dohvati($administrator)->IdKor;
         }
         
         if(!empty($this->request->getVar('flag2'))){
             $slikaBojaModel->insert([
            'IdSlB'=>589,
            'IdBoj' => 1,
            'IdKor' => 1,
            'Link' => $urlSlike 
        ]);
         }
         else{
             $slikaBojaModel->insert([
            'IdBoj' => $id,
            'IdKor' => $IdKor,
            'Link' => $urlSlike 
        ]);
         }
         
        
        $this->prikaz('uspeh', []);
    }



    public function izmeniCenuPre() {
        $this->prikaz('izmenaCene', []);
    }
    
    public function greske($poruka=null) {
        $this->prikaz('izmenaCene', ['poruka'=>$poruka]);
    }
    
    public function izmeniCenu() {
        $op = $this->request->getVar('vrsta[]');
        $op = $op[0];
        if(!$this->validate(['cena'=>'required'])) return $this->prikaz('izmenaCene', ['poruka'=>'Niste popunili sva polja!']);
        $cena = $this->request->getVar('cena');
        //provera za cenu
        if($cena<=0 || !is_numeric($cena)) return $this->prikaz('izmenaCene', ['poruka'=>'Unesite pravilno cenu!']);
        
        
        switch($op){
            case 'boja':
                $bojaModel = new Boja();
                $nazivBoje = $this->request->getVar('nazivBoje');
                if($nazivBoje==null) return $this->prikaz('izmenaCene', ['poruka'=>"Unesite naziv boje!"]);
                $boja = $bojaModel->where('Naziv',$nazivBoje)->first();
                if ($boja) {
                    $bojaModel->update($boja->IdBoj, ['Cena' => $cena]);
                }
                else{
                    return $this->greske('Nepostojeca boja');
                }
                break;
            case 'materijal':
                $materijalNaziv = $this->request->getVar('nazivMaterijala');
                if($materijalNaziv==null) return $this->prikaz('izmenaCene', ['poruka'=>"Unesite naziv materijala!"]);
                $materijalModel = new Materijal();
                $materijal = $materijalModel->where('Naziv',$materijalNaziv)->first();
                if($materijal){
                    $materijalModel->update($materijal->IdMat,['Cena' => $cena]);
                }
                else{
                    return $this->greske('Nepostojeci materijal');
                }
                //provera za cenu
                //if($cena<=0 || !is_numeric($cena)) return $this->prikaz('izmenaCene', ['poruka'=>'Unesite pravilno cenu!']);
                break;
            case 'proizvod':
                $proizvodNaziv = $this->request->getVar('nazivProizvoda');
                if($proizvodNaziv==null) return $this->prikaz('izmenaCene', ['poruka'=>"Unesite naziv proizvoda!"]);
                if(!is_numeric($proizvodNaziv)) return $this->prikaz('izmenaCene', ['poruka'=>'Unesite sifru proizvoda!']);
                $gotovNamestajModel = new GNamestaj();
                $proizvod = $gotovNamestajModel->where('IdGN',$proizvodNaziv)->first();
                if($proizvod){
                    $gotovNamestajModel->update($proizvod->IdGN,['Cena' => $cena]);
                }
                else{
                    return $this->greske('Nepostojeci proizvod');
                }
                //provera za cenu
                //if($cena<=0 || !is_numeric($cena)) return $this->prikaz('izmenaCene', ['poruka'=>'Unesite pravilno cenu!']);
                break;
        }
         //return redirect()->to(site_url("Moderator/index"));
        $this->prikaz('uspeh', []);
    }
    
   
    
    public function ukloniProizvodPre() {
        $this->prikaz('ukloniProizvod', []);
    }
    
    public function ukloniProizvod() {
        $sifra = $this->request->getVar('sifra');
        $gNamestajModel = new GNamestaj();
        $gNamestaj = $gNamestajModel->where('IdGN',$sifra)->first();
        
        if($gNamestaj){
            $id = $gNamestaj->IdGN;
            $gNamestajModel->delete($id);
        }
        else{
            return $this->prikaz('ukloniProizvod', ['poruka'=>'Nepostojeci proizvod!']);
        }
        $this->prikaz('uspeh', []);
    }
    
     //-----------------moderator funkcionalnosti ana---------------
    
    public function prikazDodajSlikuUGaleriju() {
        $this->prikaz('dodajSlikuUGaleriju', null);
    }
    
    public function dodajSlikuUGaleriju() {
        
        $urlSlike = $this->request->getVar('slikaModela');
        
        if ($urlSlike == '') return $this->prikaz('greska', []);
        
        $slikaGotovNamestajModel = new SlikaGotovNamestaj();
        
        // ['IdSlGN', 'Link', 'IdGN','IdKor'];
        if (!empty($this->request->getVar('flag'))) {
            $dataReda = array(
                'IdSlGN' => 7000,
                'Link' => $urlSlike,
                'IdGN' => 5000,
                'IdKor' => 5000
            );
        }
        else {
            $dataReda = array(
                //'IdSlGN' => 7000,
                'Link' => $urlSlike,
                'IdGN' => 5000,
                'IdKor' => 5000
            );
        }
        
        $slikaGotovNamestajModel->insert($dataReda);
        
        $this->prikaz('uspeh', []);
    }
    
    public function prikazDodavanjeModela() {
        $this->prikaz('dodavanjeModela', null);
    }
    
    public function prikazDodavanjeTipa() {
        $this->prikaz('dodavanjeTipa', null);
    }
 
    
    public function dodavanjeModelaMetod() {
        $nazivModela = $this->request->getVar('naziv');
        $slikaModela = $this->request->getVar('slikaModela');
        $kategorijaTipa = $this->request->getVar('tipModela');
        
        if ($nazivModela == '' || $slikaModela == '' || $kategorijaTipa == '') return $this->prikaz('greska', []);
        
        $modelModel = new ModelNamestaja();
        $modelTip = new TipNamestaja();
        
        $tipRow = $modelTip->dohvati($kategorijaTipa);
        
        $modelRowG = $modelModel->dohvati($nazivModela);
        if ($modelRowG != null) return $this->prikaz('greska', []);
        
        if ($tipRow == null) return $this->prikaz('greska', []);
        
        $idTipa = $tipRow->IdTip;
        
        
        //['IdMod', 'Naziv', 'IdTip','Slika'];
        
        if (!empty($this->request->getVar('flag'))) {
            $dataZaInsert = array(
                'IdMod' => 7000, 
                'Naziv' => $nazivModela, 
                'IdTip' => $idTipa, 
                'Slika' => $slikaModela
            );
        }
        else {
            $dataZaInsert = array(
                //'IdMod' => 7000, 
                'Naziv' => $nazivModela, 
                'IdTip' => $idTipa, 
                'Slika' => $slikaModela
            );
        }
        
        $modelModel->insert($dataZaInsert);
        
        $this->prikaz('uspeh', []);
    }
    
    public function dodavanjeTipaMetod() {
        
        $kategorija = $this->request->getVar('naziv');
        $slikaTipa = $this->request->getVar('slikaTipa');
        
        if ($kategorija == '' || $slikaTipa == '') return $this->prikaz('greska', []);
        
        $modelTip = new TipNamestaja();
        
        $modelRowG = $modelTip->dohvati($kategorija);
        if ($modelRowG != null) return $this->prikaz('greska', []);
        
        //['IdTip', 'Kategorija', 'Slika'];
        if (!empty($this->request->getVar('flag'))) {
            $dataZaInsert = array(
                'IdTip' => 400,
                'Kategorija' => $kategorija, 
                'Slika' => $slikaTipa
            );
        }
        else {
            $dataZaInsert = array(
                'Kategorija' => $kategorija, 
                'Slika' => $slikaTipa
            );
        }
        
        
        $modelTip->insert($dataZaInsert);
        
        $this->prikaz('uspeh', []);
    }
    
    public function prikaziStranicuDodavanjeProizvodaPoMeri() {
        $this->prikaz('dodavanjeProizvodaPoMeri', null);
    }
    
    public function dodavanjeNamestajaPoMeri()
    {
        $rules=[
            'cenaPr'=> 'required',
            'model' => 'required',
            'naziv' =>'required',
            'opis' => 'required',
            'slikaProizvoda' => 'required',
            'sifra' => 'required',
            'tip' => 'required'];
        if(!$this->validate($rules)) return $this->prikaz('dodavanjeProizvodaPoMeri', ['poruka'=>'Niste popunii sva polja!']);
        $cena = $this->request->getVar('cenaPr');
        $sifra = $this->request->getVar('sifra');
        if($cena<=0 || !is_numeric($cena)) return $this->prikaz('dodavanjeProizvodaPoMeri', ['poruka'=>'Unesite pravilno cenu!']);
        if($sifra<=0 || !is_numeric($sifra)) return $this->prikaz('dodavanjeProizvodaPoMeri', ['poruka'=>'Unesite pravilno sifru!']);
        $modelNaziv = $this->request->getVar('model');
        $naziv = $this->request->getVar('naziv');
        $modelNamestajPoMeri = new NamestajPoMeri();
        $red = $modelNamestajPoMeri->where('Naziv',$naziv)->find();
        if($red) return $this->prikaz('dodavanjeProizvodaPoMeri', ['poruka'=>'Namestaj po meri vec postoji u bazi!']);
        $opis = $this->request->getVar('opis');
        $slikaProizvoda = $this->request->getVar('slikaProizvoda');
        $modelModelNamestaja = new ModelNamestaja();
        $modelSlika = new SlikaNamestajPoMeri();
        $rowModel = $modelModelNamestaja->dohvati($modelNaziv);
        $idModel = $rowModel->IdMod;
        
        /*$dataZaInsert = array(
            'IdMod' =>$idModel, 'DodatnaCenaUsluga'=>$cena, `Naziv`=>$naziv
        );
        $modelNamestajPoMeri->insert($dataZaInsert);*/
        
        if(!empty($this->request->getVar('flag'))){
            $modelNamestajPoMeri->insert([
            'IdNPM'=>99,
            'Naziv'=>$naziv,
            'DodatnaCenaUsluga'=>$cena,
            'IdMod' =>$idModel,
            'Opis' =>$opis,
        ]);
        }
        else{
            $modelNamestajPoMeri->insert([
            'Naziv'=>$naziv,
            'DodatnaCenaUsluga'=>$cena,
            'IdMod' =>$idModel,
            'Opis' =>$opis,
        
        ]);
        }
        
        
        
        
        
        
        
        $urlSlike = $this->request->getVar('slikaProizvoda');
        
        
        echo "$naziv";
        //$idNpm = $modelNamestajPoMeri->getInsertID();
        //$dataZaInsert1 = array(
         //   `Link`=>$slikaProizvoda, `IdNPM` =>$idNpm, `IdKor`=>1
       // );
        
        //$modelSlika->insert($dataZaInsert1);
        
        
        $id = $modelNamestajPoMeri->getInsertID();
        
        $slikaModel = new SlikaNamestajPoMeri();
        if (isset($_SESSION['moderator'])) {
             $korisnik = $this->session->get('moderator')->IdKor;
         }
         else if(isset($_SESSION['administrator'])){
             $korisnik = $this->session->get('administrator')->IdKor;
         } 
         
         if(!empty($this->request->getVar('flag2'))){
            $slikaModel->insert([
            'IdNPM' => 99,
            'IdKor' => 1,
            'Link' => $urlSlike,
            'IdSlNPM'=> 899
        ]);
        }
        else{
           $slikaModel->insert([
            'IdNPM' => $id,
            'IdKor' => intval($korisnik),
            'Link' => $urlSlike 
        ]);
        }
         
         
         
         
         
         
        
        
        
        $this->prikaz('uspeh', []);
    }

    //-----------------moderator funkcionalnosti ana---------------
    public function dodajGotovProizvodPre() {
        $this->prikaz('dodavanjeGotovogProizvoda', []);
    }
    
    public function dodajGotovProizvod() {
         $rules=[
            'cenaPr'=> 'required',
            'model' => 'required',
            'naziv' =>'required',
            'opis' => 'required',
            'slikaProizvoda' => 'required',
            'sifra' => 'required',
             'sirina' => 'required',
             'dubina' => 'required',
             'visina' => 'required'];
        if(!$this->validate($rules)) return $this->prikaz('dodavanjeGotovogProizvoda', ['poruka'=>'Niste popunii sva polja!']);
        $cena = $this->request->getVar('cenaPr');
        $sifra = $this->request->getVar('sifra');
         $visina = $this->request->getVar('visina');
        $sirina = $this->request->getVar('sirina');
        $dubina = $this->request->getVar('dubina');
        if($cena<=0 || !is_numeric($cena)) return $this->prikaz('dodavanjeGotovogProizvoda', ['poruka'=>'Unesite pravilno cenu!']);
        if($sifra<=0 || !is_numeric($sifra)) return $this->prikaz('dodavanjeGotovogProizvoda', ['poruka'=>'Unesite pravilno sifru!']);
        if($visina<=0 || !is_numeric($visina)) return $this->prikaz('dodavanjeGotovogProizvoda', ['poruka'=>'Unesite pravilno visinu!']);
        if($sirina<=0 || !is_numeric($sirina)) return $this->prikaz('dodavanjeGotovogProizvoda', ['poruka'=>'Unesite pravilno sirinu!']);
        if($dubina<=0 || !is_numeric($dubina)) return $this->prikaz('dodavanjeGotovogProizvoda', ['poruka'=>'Unesite pravilno dubinu!']);
        
        
        
        
        
        
        
        $tipModel = new TipNamestaja();
        $modelModel = new ModelNamestaja();
        $gNamestajModel = new GNamestaj();
        $naziv = $this->request->getVar('naziv');
        $red = $gNamestajModel->where('Naziv',$naziv)->find();
        if($red) return $this->prikaz('dodavanjeProizvodaPoMeri', ['poruka'=>'Gotov namestaj vec postoji u bazi!']);
        $opis = $this->request->getVar('opis');
        $urlSlike = $this->request->getVar('slikaProizvoda');
       
        
        $nazivModela = $this->request->getVar('model');
        $IdMod = $modelModel->where('Naziv', $nazivModela)->find()[0]->IdMod;
        
        $boje = $this->request->getVar('boje');
        $IdMat = $this->request->getVar('materijali');        
             
        
        
        if(!empty($this->request->getVar('flag'))){
            $gNamestajModel->insert([
            'IdGN'=>99,
            'Naziv'=>$naziv,
            'Cena'=> $cena,
            'IdMat' =>$IdMat,
            'Visina'=> $visina,
            'Sirina' => $sirina,
            'Dubina' => $dubina,
            'IdBoj' => $boje,
            'IdMod' => $IdMod,
            'Opis' => $opis,
        ]);
        }
        else{
            $gNamestajModel->insert([           
            'Naziv'=>$naziv,
            'Cena'=> $cena,
            'IdMat' =>$IdMat,
            'Visina'=> $visina,
            'Sirina' => $sirina,
            'Dubina' => $dubina,
            'IdBoj' => $boje,
            'IdMod' => $IdMod,
            'Opis' => $opis,
        ]);
        }
        
        
        
        
        
        
        
        $id = $gNamestajModel->getInsertID();
        $slikaModel = new SlikaGotovNamestaj();
        if (isset($_SESSION['moderator'])) {
             $korisnik = $this->session->get('moderator')->IdKor;
         }
         else if(isset($_SESSION['administrator'])){
             $korisnik = $this->session->get('administrator')->IdKor;
         } 
         
         
         if(!empty($this->request->getVar('flag2'))){
            $slikaModel->insert([
            'IdGN' => 99,
            'IdKor' => 1,
            'Link' => $urlSlike,
            'IdSlGN'=> 899
        ]);
        }
        else{
           $slikaModel->insert([
            'IdGN' => $id,
            'IdKor' => intval($korisnik),
            'Link' => $urlSlike 
        ]);
        }
         
         
         
         
         
         
         
        
         $this->prikaz('uspeh', []);

        
    }
   
    
}
