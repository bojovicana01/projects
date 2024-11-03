<?php namespace App\Models;

use CodeIgniter\Model;

class Porudzbine extends Model
{
        protected $table      = 'porudzbine';
        protected $primaryKey = 'IdPor';
        protected $returnType = 'object';
        protected $allowedFields = ['IdPor', 'Status', 'Opis','IdKor','Iznos','Adresa'];
        
  
}