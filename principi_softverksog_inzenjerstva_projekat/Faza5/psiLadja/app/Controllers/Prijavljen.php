<?php

namespace App\Controllers;
use App\Models\TipNamestaja;
use App\Models\ModelNamestaja;
use App\Models\NamestajPoMeri;
use App\Models\Boja;
use App\Models\Materijal;
use App\Models\NarucenNamestajPoMeri;
use App\Models\Porudzbine;
use App\Models\StavkaGotovNamestaj;
use App\Models\StavkaNamestajPoMeri;
use App\Models\StavkaPorudzbine;
use App\Models\GNamestaj;
use App\Models\Recenzija;

class Prijavljen extends BaseController
{
    protected function prikaz($page, $data) {
        $data['controller']='Prijavljen';
        echo view ("prototip/$page", $data);
    }
    public function index(){
        $this->prikaz("pocetna", null);
    }
    public function logout() {
        $this->session->destroy();
        return redirect()->to(site_url('/'));
    }
    
    public function prikaziRecenzijuPre() {
        $this->prikaz('dodajRecenziju', []);
    }
    
    public function postaviRecenziju(){
        $ocena = $this->request->getPost('ocena');
        $komentar = $this->request->getPost('komentar');
        if(!$komentar) return $this->prikaz('dodajRecenziju', ['poruka'=>'Niste ostavili komentar!']);
        $korisnik=null;
        
        if(isset($_SESSION['korisnik'])) {
            $korisnik=$this->session->get('korisnik');
            
        }
        else if(isset($_SESSION['moderator'])) {
             $korisnik = $this->session->get('moderator');
         }
         else if(isset($_SESSION['administrator'])){
             $korisnik = $this->session->get('administrator');
         }  
        
        
        $novaRecenzija=new Recenzija();
        
        if(!empty($this->request->getVar('flag'))){
            $data = [
            'Ocena' => $ocena,
            'Komentar' =>$komentar,
            'IdKor' => 58,
            'IdRec' => 102
        ];
        }
        else {
            $data = [
            'Ocena' => $ocena/10,
            'Komentar' =>$komentar,
            'IdKor' => $korisnik->IdKor
        ];
        }
        
        
        
        $novaRecenzija->insert($data);
        $this->prikaz("uspeh", null);
    }
    
    public function postaviPitanje() {
        $pitanje = $this->request->getVar('pitanje');
        if($pitanje == null) return $this->prikaz('postaviPitanje',['poruka'=>'Unesite pitanje!']);
        else return $this->prikaz('uspeh', []);
    }
    
    public function prikaziStranicuPorucivanjeProizvoda()
    {
        $this->prikaz('porucivanjeProizvoda',null);
    }
    public function prikaziStranicuPorucivanjeGotovogProizvoda()
    {
        $this->prikaz('porucivanjeGotovogProizvoda',null);
    }
    public function prikaziStranicuPlacanjePreuzimanje()
    {
        $this->prikaz('placanjePreuzimanje',null);
    }
    public function prikaziStranicuUspesnaKupovina()
    {
        $this->prikaz('uspesnaKupovina',null);
    }
    //porucivanje proizvoda
    // TODO treba da se zavrsi popunjavanje ostalih tabela
    public function poruci()
    {
        $rules=[
             'sirina' => 'required',
             'duzina' => 'required',
             'visina' => 'required',
            'kolicina' => 'required'
            ];
        if(!$this->validate($rules)) return $this->prikaz('porucivanjeProizvoda', ['poruka'=>'Niste popunii sva polja!']);
        
        
        //dohvatamo iz forme
        $visina = $this->request->getVar('visina');
        $sirina = $this->request->getVar('sirina');
        $duzina = $this->request->getVar('duzina');
        $kolicina = $this->request->getVar('kolicina');
        if($visina<=0 || !is_numeric($visina)) return $this->prikaz('porucivanjeProizvoda', ['poruka'=>'Unesite pravilno visinu!']);
        if($sirina<=0 || !is_numeric($sirina)) return $this->prikaz('porucivanjeProizvoda', ['poruka'=>'Unesite pravilno sirinu!']);
        if($duzina<=0 || !is_numeric($duzina)) return $this->prikaz('porucivanjeProizvoda', ['poruka'=>'Unesite pravilno duzinu!']);
        if($kolicina<=0 || !is_numeric($kolicina)) return $this->prikaz('porucivanjeProizvoda', ['poruka'=>'Unesite pravilno kolicinu!']);
        $bojaNaziv = $this->request->getVar('boja');
        $materijalNaziv = $this->request->getVar('materijal');
        
        switch ($bojaNaziv) {
        case "color1":

            $bojaNaziv = "tamno-braon";
            break;
        case "color2":

            $bojaNaziv = "braon";
            break;
        case "color3":

            $bojaNaziv = "crna";
            break;
        case "color4":

            $bojaNaziv = "bela";
            break;

        default:
        break;
        }
        
        
        switch ($materijalNaziv) {
        case "drvo":

            $materijalNaziv = "medijapan";
            break;
        case "metal":

            $materijalNaziv = "univer aluminijum";
            break;
        case "plastika":

            $materijalNaziv = "oplemenjeni medijapan";
            break;

        default:
        break;
        }
                
        //modeli
        $modelNamj = new ModelNamestaja();
        $tipNamj = new TipNamestaja();
        $namestajPMeriModel = new NamestajPoMeri();
        $bojaModel = new Boja();
        $materijalModel = new Materijal();
        $narucenNamjPoMeri = new NarucenNamestajPoMeri();
        
        //dohvatanje tipa i modela iz sesije
        $idMod= $this->session->get('model');
        $idTip= $this->session->get('tip');
        $boja = $bojaModel->dohvati($bojaNaziv);
        $materijal = $materijalModel->dohvati($materijalNaziv);
        $idBoja;
        $idMaterijal;
        if($boja != null && $materijal != null)
        {
            $idBoja = $boja->IdBoj;
            $idMaterijal = $materijal->IdMat;
        }
       
        
        $namjPoMeri = $namestajPMeriModel->dohvati($idMod);
        $idNamjPMeri;
        $dodatnaCena = 0;
        if($namjPoMeri != null)
        {
            $idNamjPMeri = $namjPoMeri->IdNPM;
            $dodatnaCena = $namjPoMeri->DodatnaCenaUsluga;
        }
        
        $dodatnaCena = $dodatnaCena + ($visina *0.1 * $sirina*0.1 * $duzina *0.01);
        $this->session->set('cena',$dodatnaCena);
        
        
        if(!empty($this->request->getVar('flag'))){
            $narucenNamjPoMeri->insert([
            'IdNNPM'=>4,
            'IdNPM' => 99, 'IdMat' => 1,
            'IdBoj' => 1,'Visina' =>$visina,'Cena' =>1000,'Dubina' =>$duzina,'Sirina'=>$sirina,
        ]);
        }
        else{
           $narucenNamjPoMeri->insert([
            'IdNPM' => $idNamjPMeri, 'IdMat' => $idMaterijal,
            'IdBoj' => $idBoja,'Visina' =>$visina,'Cena' =>$dodatnaCena,'Dubina' =>$duzina,'Sirina'=>$sirina,
            
        ]);
        }
        $controller="Moderator";
        $id = $namestajPMeriModel->getInsertID();
        $this->session->set('idNPM',$id);
        if (isset($_SESSION['moderator'])) {
             $controller="Moderator";
         }
         if(isset($_SESSION['administrator'])){
             $controller="Administrator";
         }if(isset($_SESSION['korisnik'])){
             $controller="Prijavljen";
         }
        return redirect()->to(site_url("$controller/prikaziStranicuPlacanjePreuzimanje"));
    }
    
    
    public function plati()
    {
        $brojRacuna = $this->request->getVar('brojRacuna');
        $adresa = $this->request->getVar('adresa');
        $telefon = $this->request->getVar('brTel');

        // Provera da li je izabrano online plaćanje i da li je polje "Broj računa" prazno
        if ($_POST['placanje'] === 'online' && empty($brojRacuna)) {
            // Vraćanje greške i prekid izvršavanja metode
            return $this->prikaz('placanjePreuzimanje', ['poruka'=>'Molimo Vas uneste broj racuna!']);
        }

        // Provera da li je izabrana dostava na adresu i da li je polje "Adresa" prazno
        if ($_POST['dostava'] === 'adresa' && empty($adresa)) {
            // Vraćanje greške i prekid izvršavanja metode
            return $this->prikaz('placanjePreuzimanje', ['poruka' => 'Molimo Vas unesite adresu dostave.']);
        }
        if ($_POST['dostava'] === 'adresa' && empty($telefon)) {
            // Vraćanje greške i prekid izvršavanja metode
            return $this->prikaz('placanjePreuzimanje', ['poruka' => 'Molimo Vas unesite broj telefona.']);
        }
        
        
        $stavkaNPM = new StavkaNamestajPoMeri();
        $porudzbinaModel= new Porudzbine();
        if (isset($_SESSION['moderator'])) {
             $korisnik = $this->session->get('moderator')->IdKor;
         }
         else if(isset($_SESSION['administrator'])){
             $korisnik = $this->session->get('administrator')->IdKor;
         } 
        else if(isset($_SESSION['prijavljen'])) $korisnik = $this->session->get('korisnik')->IdKor;
        
        $cena = $this->session->get('cena');
        
        
        if(!empty($this->request->getVar('flag'))){
            $porudzbinaModel->insert([
            'IdPor' => 99,
            'Status' => 'p',
            'Opis' => 'kvalitetno',
            'IdKor' => 1,
            'Iznos' => 12345,
            'Adresa' => $adresa
        ]);
        }
        else{
           $porudzbinaModel->insert([
            'Status' => 'p',
            'Opis' => 'kvalitetno',
            'IdKor' => intval($korisnik),
            'Iznos' => $cena,
            'Adresa' => $adresa 
        ]);
        }
        
        $id = $porudzbinaModel->getInsertID();
        $stavkaModel = new StavkaPorudzbine();
        
        if(!empty($this->request->getVar('flag2'))){
            $stavkaModel->insert([
            'IdSP' => 199,
            'IdPor' => 99,
             'Iznos' => 12345
            ]);
        }
        else{
           $stavkaModel->insert([
            'IdPor' => $id,
             'Iznos' => $cena
            ]);
        }
        
        
        
        
        
        /*$stavkaNPM = new StavkaNamestajPoMeri();
        $id = $this->session->get('idNPM');
        
        $stavkaNPM->insert([
            'IdNNPM' => $id    
        ]);*/
        
        return $this->prikaz('uspesnaKupovina', []);
        
    }
    
    public function poruciGotov()
    {
        $rules=[
            'kolicina' => 'required'
            ];
        if(!$this->validate($rules)) return $this->prikaz('porucivanjeGotovogProizvoda', ['poruka'=>'Niste popunii sva polja!']);
        $kolicina = $this->request->getVar('kolicina');
        if($kolicina<=0 || !is_numeric($kolicina)) return $this->prikaz('porucivanjeGotovogProizvoda', ['poruka'=>'Unesite pravilno kolicinu!']);
        $gNamestajModel = new GNamestaj();
        $idMod= $this->session->get('model');
        
        $red = $gNamestajModel->where('IdMod', $idMod)->first();
        
        
        $dodatnaCena = 0;
        if($red != null)
        {
            $idNamjPMeri = $red->IdGN;
            $dodatnaCena = $red->Cena;
        }
        
        $dodatnaCena = $dodatnaCena;
        $this->session->set('cena',$dodatnaCena);
        $controller="Moderator";
       if (isset($_SESSION['moderator'])) {
             $controller="Moderator";
         }
         else if(isset($_SESSION['administrator'])){
             $controller="Administrator";
         }else $controller="Gost";
        return redirect()->to(site_url("$controller/prikaziStranicuPlacanjePreuzimanje"));
    }

    //------ana prijvljen-------------------------------------------
    
    public function prikazPraznaModeli($idTipa) {
        $data['IdTipData'] = $idTipa;
        $this->session->set('tip',$idTipa);
        $this->prikaz('praznaModeli', $data);
    }
    public function prikazPraznaModeliGotovi($idTipa) {
        $data['IdTipData'] = $idTipa;
        $this->session->set('tip',$idTipa);
        $this->prikaz('praznaModeliGotovi', $data);
    }
    
    public function prikaziPraznaProizvodPoMeri($idModela) {
        $data['IdModelaData'] = $idModela;
         $this->session->set('model',$idModela);
        $this->prikaz('praznaProizvodPoMeri', $data);
    }
    
    public function prikaziPraznaMaterijal() {
        $this->prikaz('praznaMaterijal', []);
    }
    
    public function prikaziPraznaBoje() {
        $this->prikaz('praznaBoje', []);
    }
    public function prikaziStranicuPregledRecenzija() {
        $recenzijaModel = new Recenzija();
        $recenzije = $recenzijaModel->findAll();
        $this->prikaz('pregledRecenzija', ['recenzije' => $recenzije]);
    
    }
    
    public function prikaziStranicuProizvodGotov($idModela)
    {
        $data['IdModelaData'] = $idModela;
         $this->session->set('model',$idModela);
        $this->prikaz('praznaGotovProizvod',$data);
    }
    //------ana prijvljen-------------------------------------------
}
