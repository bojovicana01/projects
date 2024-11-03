<?php namespace App\Models;

use CodeIgniter\Model;

class StavkaPorudzbine extends Model
{
        protected $table      = 'Stavka_Porudzbine';
        protected $primaryKey = 'IdSP';
        protected $returnType = 'object';
        protected $allowedFields = ['IdSP', 'IdPor','Iznos'];
        
  
}