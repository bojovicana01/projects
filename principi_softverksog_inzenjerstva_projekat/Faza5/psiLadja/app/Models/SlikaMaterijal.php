<?php namespace App\Models;

use CodeIgniter\Model;

class SlikaMaterijal extends Model
{
        protected $table      = 'Slika_Materijal';
        protected $primaryKey = 'IdSlM';
        protected $returnType = 'object';
        protected $allowedFields = ['IdSlM', 'Link', 'IdMat','IdKor'];
        
  
}