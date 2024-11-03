<?php

namespace App\Controllers;

use CodeIgniter\Test\ControllerTester;
use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Config\Factories;

use App\Models\SlikaGotovNamestaj;
use App\Models\TipNamestaja;
use App\Models\ModelNamestaja;

class PrijavljenControllerTest extends CIUnitTestCase
{
	use ControllerTester;

        
        
	/**
	 * The seed file(s) used for all tests within this test case.
	 * Should be fully-namespaced or relative to $basePath
	 *
	 * @var string|array
	 */
	protected $seed = 'Tests\Support\Database\Seeds\PrijavljenSeeder';
        
        //Recenzije
        
        //test za postavljanje recenzija- fali komentar
        public function testPostaviRecenziju1() {
                       
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("postaviRecenziju");
            $this->assertTrue($results->see('Niste ostavili komentar!'));
        }
        
        //test uspesno postavljanje recenzije
        public function testPostaviRecenziju2(){
            $_POST['komentar'] = 'Vitrine su najbolje!';
            $_POST['ocena'] = 5;
            $_REQUEST['flag'] = 1;
            /*$_SESSION['korisnik'] = null;
            $_SESSION['moderator'] = null;
            $_SESSION['administrator'] = null;*/
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("postaviRecenziju");
            $this->assertTrue($results->see('uspesno'));
        }
        
        //postavljanje pitanja neuspesno
        public function testPostaviPitanje1() {           
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("postaviPitanje");
            $this->assertTrue($results->see('Unesite pitanje'));
        }
        
        //postavi pitanje- uspesno
        public function testPostaviPitanje2() {
            $_REQUEST['pitanje']="Koje su cene medijapana?";
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("postaviPitanje");
            $this->assertTrue($results->see('uspesno'));
        }
        
        //test za logout
        public function testLogout() {
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("logout");
            $this->assertFalse($results->see('Odjavi se'));
        }
        
        
        
        //Andrej Davidovic
        //testiranje funkcionalnosti porucivanje namestaja po meri,porucivanje gotovog namestaja i placanje
       
        
       //test za namestaj po meri uspesan scenario
        
        public function testPoruciNamestajPoMeri1(){
            $_REQUEST['sirina']=100;
            $_REQUEST['duzina']= 200;
            $_REQUEST['visina']=300;
            $_REQUEST['kolicina']=1;
            $_REQUEST['boja']='crna';
            $_REQUEST['materijal']='medijapan';
            $_REQUEST['flag'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruci");
            $this->assertFalse($results->see('PORUCIVANJE PROIZVODA'));
            
        }
        
        
        //test za namestaj po meri, neuspesan scenario-nisu popunjena sva polja forme za porucivanje
        
        public function testPoruciNamestajPoMeri2(){
            //$_REQUEST['sirina']=100;
            $_REQUEST['duzina']= 200;
            $_REQUEST['visina']=300;
            $_REQUEST['kolicina']=1;
            $_REQUEST['boja']='crna';
            $_REQUEST['materijal']='medijapan';
            $_REQUEST['flag'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruci");
            $this->assertTrue($results->see('Niste popunii sva polja!'));
            
        }
        
        //test za namestaj po meri, neuspesan scenario-niste uneli pravilno visinu
        
        public function testPoruciNamestajPoMeri3(){
            $_REQUEST['sirina']=100;
            $_REQUEST['duzina']= 200;
            $_REQUEST['visina']='dadga';
            $_REQUEST['kolicina']=1;
            $_REQUEST['boja']='crna';
            $_REQUEST['materijal']='medijapan';
            $_REQUEST['flag'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruci");
            $this->assertTrue($results->see('Unesite pravilno visinu!'));
            
        }
        
        //test za namestaj po meri, neuspesan scenario-niste uneli pravilno sirinu
        
        public function testPoruciNamestajPoMeri4(){
            $_REQUEST['sirina']='gadgas';
            $_REQUEST['duzina']= 200;
            $_REQUEST['visina']=300;
            $_REQUEST['kolicina']=1;
            $_REQUEST['boja']='crna';
            $_REQUEST['materijal']='medijapan';
            $_REQUEST['flag'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruci");
            $this->assertTrue($results->see('Unesite pravilno sirinu!'));
            
        }
        
        
        
        //test za namestaj po meri, neuspesan scenario-niste uneli pravilno duzinu
        
        public function testPoruciNamestajPoMeri5(){
            $_REQUEST['sirina']=100;
            $_REQUEST['duzina']= 'gagasdg';
            $_REQUEST['visina']=300;
            $_REQUEST['kolicina']=1;
            $_REQUEST['boja']='crna';
            $_REQUEST['materijal']='medijapan';
            $_REQUEST['flag'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruci");
            $this->assertTrue($results->see('Unesite pravilno duzinu!'));
            
        }
        
        
        //test za namestaj po meri, neuspesan scenario-niste uneli pravilno kolicinu
        
        public function testPoruciNamestajPoMeri6(){
            $_REQUEST['sirina']=100;
            $_REQUEST['duzina']= 200;
            $_REQUEST['visina']=300;
            $_REQUEST['kolicina']='fadfdasf';
            $_REQUEST['boja']='crna';
            $_REQUEST['materijal']='medijapan';
            $_REQUEST['flag'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruci");
            $this->assertTrue($results->see('Unesite pravilno kolicinu!'));
            
        }
        
        
        
        //test za gotov namestaj uspesan scenario
        
        public function testPoruciGotovNamestaj1(){
            $_REQUEST['kolicina']=1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruciGotov");
            $this->assertFalse($results->see('PORUCIVANJE PROIZVODA'));
            
        }
        
        
         //test za gotov namestaj neuspesan scenario-nisu popunjena sva polja forme za porucivanje
        
        public function testPoruciGotovNamestaj2(){
            //$_REQUEST['kolicina']=1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruciGotov");
            $this->assertTrue($results->see('Niste popunii sva polja!'));
            
        }
        
        
        
         //test za gotov namestaj neuspesan scenario-nepravilno popunjeno polje za kolicinu
        
        public function testPoruciGotovNamestaj3(){
            $_REQUEST['kolicina']='fsafas';
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("poruciGotov");
            $this->assertTrue($results->see('Unesite pravilno kolicinu!'));
            
        }
        
        
        
        //test za placanje uspesan scenario
        public function testPlati1(){
            $_REQUEST['brojRacuna']=134-1234567891234-23;
            $_REQUEST['adresa']= 'Beogradska 2';
            $_REQUEST['brTel']=0652234141;
            $_POST['placanje'] = 'online';
            $_POST['dostava'] = 'adresa';
            $_REQUEST['flag'] = 1;
             $_REQUEST['flag2'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("plati");
            $this->assertTrue($results->see('uspesno'));
            
        }
        
        
        
        
         //test za placanje neuspesan scenario,nepopunjen broj racuna
        public function testPlati2(){
            //$_REQUEST['brojRacuna']=134-1234567891234-23;
            $_REQUEST['adresa']= 'Beogradska 2';
            $_REQUEST['brTel']=0652234141;
            $_POST['placanje'] = 'online';
            $_POST['dostava'] = 'adresa';
            $_REQUEST['flag'] = 1;
             $_REQUEST['flag2'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("plati");
            $this->assertTrue($results->see('Molimo Vas uneste broj racuna!'));
            
        }
        
        //test za placanje neuspesan scenario,nepopunjena adresa
        public function testPlati3(){
            $_REQUEST['brojRacuna']=134-1234567891234-23;
            //$_REQUEST['adresa']= 'Beogradska 2';
            $_REQUEST['brTel']=0652234141;
            $_POST['placanje'] = 'online';
            $_POST['dostava'] = 'adresa';
            $_REQUEST['flag'] = 1;
             $_REQUEST['flag2'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("plati");
            $this->assertTrue($results->see('Molimo Vas unesite adresu dostave.'));
            
        }
        
        //test za placanje neuspesan scenario,nepopunjen broj telefona
        public function testPlati4(){
            $_REQUEST['brojRacuna']=134-1234567891234-23;
            $_REQUEST['adresa']= 'Beogradska 2';
            //$_REQUEST['brTel']=0652234141;
            $_POST['placanje'] = 'online';
            $_POST['dostava'] = 'adresa';
            $_REQUEST['flag'] = 1;
             $_REQUEST['flag2'] = 1;
            
            $results = $this->controller('\App\Controllers\Prijavljen')
                ->execute("plati");
            $this->assertTrue($results->see('Molimo Vas unesite broj telefona.'));
            
        }
        
        
        
        
        
        
}