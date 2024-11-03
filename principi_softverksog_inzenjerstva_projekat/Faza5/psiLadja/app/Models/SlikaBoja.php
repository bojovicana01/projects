<?php namespace App\Models;

use CodeIgniter\Model;

class SlikaBoja extends Model
{
        protected $table      = 'Slika_Boja';
        protected $primaryKey = 'IdSlB';
        protected $returnType = 'object';
        protected $allowedFields = ['IdSlB', 'Link', 'IdBoj','IdKor'];
        
  
}