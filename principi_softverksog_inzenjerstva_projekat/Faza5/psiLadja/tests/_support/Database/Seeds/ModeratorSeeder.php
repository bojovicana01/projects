<?php namespace Tests\Support\Database\Seeds;

use CodeIgniter\Database\Seeder;

use App\Models\SlikaGotovNamestaj;
use App\Models\TipNamestaja;
use App\Models\ModelNamestaja;

class ModeratorSeeder extends Seeder
{
	public function run()
	{
		$slike = [
			(object)[
			    
                            //['IdSlGN', 'Link', 'IdGN','IdKor']
                            'IdSlGN'=> 1,
                            'Link'=> "slike/sto.jpg",
                            'IdGN'=> 5000,
                            'IdKor' => 5000
                            
			],
			
		];
		$builder = $this->db->table('slika_gotov_namestaj');

		foreach ($slike as $slika)
		{
			$builder->insert($slika);
		}
                
                // seed za tip tabelu
                //['IdTip', 'Kategorija', 'Slika'];
                $tipovi = [
                    (object)[
			    
                            'IdTip' => 401,
                            'Kategorija' => 'FOTELJE', 
                            'Slika' => 'slike/sofa1.jpg'
                            
                    ],
                ];
                
                $builderTip = $this->db->table('tip');

		foreach ($tipovi as $tip)
		{
			$builderTip->insert($tip);
		}
	}
}
