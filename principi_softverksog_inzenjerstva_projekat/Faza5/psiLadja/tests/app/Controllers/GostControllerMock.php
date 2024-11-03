<?php

namespace App\Controllers;

use CodeIgniter\Test\ControllerTester;
use CodeIgniter\Test\CIUnitTestCase;
use CodeIgniter\Config\Factories;

class GostControllerMock extends CIUnitTestCase
{
	use ControllerTester;
        
	public function setUp(): void
	{
		parent::setUp();
		// Extra code to run before each test
		$korisnici = [
			(object)[
			    
                            //IdKor', 'Ime', 'Prezime','Mejl','KorisnickoIme','Lozinka','Flag'
                            'IdKor'=> 65,
                            'Ime'=> "Djuradj",
                            "Prezime"=>"Brankovic",
                            'Mejl' => "joksimovi.djuradj@gmail.com",
                            "KorisnickoIme" =>"modni",
                            "Lozinka" => "ajmoCare",
                            "Flag" => 0
                            
			],
			(object)[
			    'IdKor'=> 54,
                            'Ime'=> "kanjuz",
                            "Prezime"=>"manjuz",
                            'Mejl' => "kanjuz.djuradj@gmail.com",
                            "KorisnickoIme" =>"kreator",
                            "Lozinka" => "comi",
                            "Flag" => 0
			],
		];
		$mockvest = $this->createMock(\App\Models\Korisnik::class);
		$mockvest->method("findAll")->willReturn($korisnici);
                Factories::injectMock('models', 'App\Models\Korisnik', $mockvest);		
	}
        public function test_When_access_news_Then_see_two_items()
	{		
		$results = $this->controller('\App\Controllers\Gost')
                ->execute("register");
		$this->assertFalse($results->see('Registruj se', 'a'));
                $this->assertFalse($results->see('Prijavi se', 'a'));
		$this->assertTrue($results->see('HOME CENTRE','p'));
	}
}