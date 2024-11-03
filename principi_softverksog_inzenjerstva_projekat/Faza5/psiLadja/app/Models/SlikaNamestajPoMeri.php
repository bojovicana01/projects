<?php namespace App\Models;

use CodeIgniter\Model;

class SlikaNamestajPoMeri extends Model
{
        protected $table      = 'Slika_Namestaj_Po_Meri';
        protected $primaryKey = 'IdSlNPM';
        protected $returnType = 'object';
        protected $allowedFields = ['IdSlNPM', 'Link', 'IdNPM','IdKor'];
        
  
}