<?php namespace App\Models;

use CodeIgniter\Model;

class ModelNamestaja extends Model
{
        protected $table      = 'Model';
        protected $primaryKey = 'IdMod';
        protected $returnType = 'object';
        protected $allowedFields = ['IdMod', 'Naziv', 'IdTip','Slika'];
        public function dohvati($naziv){
            return $this->where('Naziv', $naziv)->first();
        }
  
}