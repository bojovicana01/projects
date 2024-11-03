<?php

namespace App\Controllers;
use App\Models\Recenzija;
use App\Models\Materijal;
use App\Models\Boja;
use App\Models\GNamestaj;
use App\Models\Korisnik;
use App\Models\SlikaGotovNamestaj;
use App\Models\ModelNamestaja;
use App\Models\TipNamestaja;
use App\Models\NamestajPoMeri;
use App\Models\SlikaNamestajPoMeri;
use App\Models\SlikaBoja;

class Administrator extends Moderator
{
    protected function prikaz($page, $data) {
        $data['controller']='Administrator';
        echo view ("prototip/$page", $data);
    }
    public function index(){
        $this->prikaz("opcijeAdministratora", null);
    }
    
    public function ukloniNalogPre() {
        $this->prikaz('ukloniNalog', []);
    }
    
    public function ukloniNalog() {
        $korime = $this->request->getVar('korIme');
        $korisnikModel = new Korisnik();
        $kor = $korisnikModel->where('KorisnickoIme', $korime)->first();
        
        if($kor){
            $id = $kor->IdKor;
            $korisnikModel->delete($id);
        }
        else{
            return $this->greske('ukloniNalog','Nepostojeci nalog');
        }
        $this->prikaz('uspeh', []);
    } 
    
    
    public function greske($page = 'izmenaCene',$poruka=null) {
        $this->prikaz($page, ['poruka'=>$poruka]);
    }
    
    //-----------------opcije administratora-------------------
    
    public function prikaziStranicuDodajModeratora() {
        $this->prikaz('dodajModeratora', null);
    }
    
    public function dodajModeratora() {
        $moderatorD = $this->request->getVar('moderatorZaDodavanje');
        
        if ($moderatorD == '') return $this->prikaz('greska', []);
        
        $korisnikD = new Korisnik();
        $kor = $korisnikD->where('KorisnickoIme', $moderatorD)->first();
        
        if ($kor == null) return $this->prikaz('greska', []);
        
        //'IdKor', 'Ime', 'Prezime','Mejl','KorisnickoIme','Lozinka','Flag'
        $dataReda = array(
            'IdKor' => $kor->IdKor,
            'Ime' => $kor->Ime,
            'Prezime' => $kor->Prezime,
            'Mejl' => $kor->Mejl, 
            'KorisnickoIme' => $kor->KorisnickoIme, 
            'Lozinka' => $kor->Lozinka, 
            'Flag' => 1
        );
        
        $korisnikD->update($kor->IdKor, $dataReda);
        
        $this->prikaz('uspeh', []);
    }
    
    //-----------------linkovi za navbar---------------------------

    
}
