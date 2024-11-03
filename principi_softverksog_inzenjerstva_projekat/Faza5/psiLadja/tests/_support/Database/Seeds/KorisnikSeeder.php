<?php namespace Tests\Support\Database\Seeds;

use CodeIgniter\Database\Seeder;

class KorisnikSeeder extends Seeder
{
	public function run()
	{
		$autori = [
			(object)[
			    
                            //IdKor', 'Ime', 'Prezime','Mejl','KorisnickoIme','Lozinka','Flag'
                            'IdKor'=> 65,
                            'Ime'=> "Djuradj",
                            "Prezime"=>"Brankovic",
                            'Mejl' => "joksimovi.djuradj@gmail.com",
                            "KorisnickoIme" =>"modni",
                            "Lozinka" => "ajmoCare",
                            "Flag" => 1
                            
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
                    (object)[
			    'IdKor'=> 17,
                            'Ime'=> "Coma",
                            "Prezime"=>"Iko",
                            'Mejl' => "some.kome@gmail.com",
                            "KorisnickoIme" =>"moja",
                            "Lozinka" => "kutija",
                            "Flag" => 0
			],
			
		];
		$builder = $this->db->table('Korisnik');

		foreach ($autori as $autor)
		{
			$builder->insert($autor);
		}
	}
}
