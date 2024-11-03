<?php namespace App\Models;

use CodeIgniter\Model;

class GNamestaj extends Model
{
        protected $table      = 'Gotov_Namestaj';
        protected $primaryKey = 'IdGN';
        protected $returnType = 'object';
        protected $allowedFields = ['IdGN', 'Visina', 'IdMat','IdBoj','IdMod','Naziv','Cena','Sirina','Dubina','Naziv','Opis'];
        
  
}