<?php namespace App\Models;

use CodeIgniter\Model;

class NarucenNamestajPoMeri extends Model
{
        protected $table      = 'Narucen_Namestaj_Po_Meri';
        protected $primaryKey = 'IdNNPM';
        protected $returnType = 'object';
        protected $allowedFields = ['IdNPM', 'IdNNPM', 'IdMat',
            'IdBoj','Visina','Cena','Dubina','Sirina'];
        
  
}