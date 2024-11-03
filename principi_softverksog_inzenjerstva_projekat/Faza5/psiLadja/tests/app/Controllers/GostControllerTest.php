<?php
namespace App\Controllers;

use CodeIgniter\Test\ControllerTester;
use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Config\Factories;

use App\Models\SlikaGotovNamestaj;
use App\Models\TipNamestaja;
use App\Models\ModelNamestaja;

class GostControllerTest extends CIUnitTestCase
{
	use ControllerTester;

	/**
	 * The seed file(s) used for all tests within this test case.
	 * Should be fully-namespaced or relative to $basePath
	 *
	 * @var string|array
	 */
	protected $seed = 'Tests\Support\Database\Seeds\GostSeeder';
        
        //test neuspesno postavljanje recenzije
        public function testPostaviRecenzijuNijeDozvoljeno() {
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("postaviRecenziju");
            $this->assertTrue($results->see('nije dozvoljena'));
        }
        
        //test za loginSubmit kada nisu uneti svi podaci
        public function testLoginNisuSviUneti(){
            //$_REQUEST['KorisnickoIme']='bojovicana';
            //$_REQUEST['Lozinka'] = 'ana123';
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("loginSubmit");
            $this->assertTrue($results->see('Niste uneli sve podatke'));
        }
        
        //test za login nema tog korisnickog imena
        public function testLoginNemaImena(){
            $_REQUEST['KorisnickoIme']='anci';
            $_REQUEST['Lozinka'] = 'ana123';
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("loginSubmit");
            $this->assertTrue($results->see('Korisnik ne postoji'));
        }
        
        //test za login netacna lozinka
        public function testLoginPogresnaLozinka(){
            $_REQUEST['KorisnickoIme']='bojovicana';
            $_REQUEST['Lozinka'] = 'ana12345';
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("loginSubmit");
            $this->assertTrue($results->see('Pogresna lozinka'));
        }
        
        //test za login uspesno logovanje
        public function testLoginUspeh(){
            $_REQUEST['KorisnickoIme']='bojovicana';
            $_REQUEST['Lozinka'] = 'ana123';
            
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("loginSubmit");
            $this->assertFalse($results->see('Prijava korisnika'));
        }
        
        //test za login register- uspesno
        public function testRegister1(){
            $_POST['KorisnickoIme'] = 'micikasojic111112222';
            $_POST['Lozinka'] = 'micika123';
            $_POST['LozinkaPotvrda'] = 'micika123';
            $_POST['Ime'] = 'Micika';
            $_POST['Prezime'] = 'Sojic';
            $_POST['Mejl'] = 'micika@gmail.com';
            $_REQUEST['flag'] = 1;
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("register");
            $this->assertFalse($results->see('Registracija korisnika'));          
        }
        
        //test register nisu popunjena sva polja
        public function testRegister2(){
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("register");
            $this->assertTrue($results->see('Niste popunili sva polja'));      
        }
       
        //test za register- lozinke se ne podudaraju
        public function testRegisterLozinke(){
            $_POST['KorisnickoIme'] = 'micikasojic';
            $_POST['Lozinka'] = 'micika123';
            $_POST['LozinkaPotvrda'] = 'micika12345';
            $_POST['Ime'] = 'Micika';
            $_POST['Prezime'] = 'Sojic';
            $_POST['Mejl'] = 'micika@gmail.com';
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("register");
            $this->assertTrue($results->see('Lozinke se ne podudaraju'));      
        }
        
        //test za register- korisnicko ime zauzeto
        public function testRegisterImeZauzeto(){
            $_POST['KorisnickoIme'] = 'bojovicana';
            $_POST['Lozinka'] = 'micika123';
            $_POST['LozinkaPotvrda'] = 'micika123';
            $_POST['Ime'] = 'Micika';
            $_POST['Prezime'] = 'Sojic';
            $_POST['Mejl'] = 'micika@gmail.com';
            $results = $this->controller('\App\Controllers\Gost')
                ->execute("register");
            $this->assertTrue($results->see('Korisnicko ime je vec zauzeto'));       
        }
        
        
        
	
}
