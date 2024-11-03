<?php namespace App\Models;

use CodeIgniter\Model;

class SlikaGotovNamestaj extends Model
{
        protected $table      = 'Slika_Gotov_Namestaj';
        protected $primaryKey = 'IdSlGN';
        protected $returnType = 'object';
        protected $allowedFields = ['IdSlGN', 'Link', 'IdGN','IdKor'];
        
  
}