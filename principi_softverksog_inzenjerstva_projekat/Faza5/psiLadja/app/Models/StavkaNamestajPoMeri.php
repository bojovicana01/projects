<?php namespace App\Models;

use CodeIgniter\Model;

class StavkaNamestajPoMeri extends Model
{
        protected $table      = 'Stavka_Namestaj_Po_Meri';
        protected $primaryKey = 'IdSNPM';
        protected $returnType = 'object';
        protected $allowedFields = ['IdSNPM', 'IdNNPM'];
        
  
}