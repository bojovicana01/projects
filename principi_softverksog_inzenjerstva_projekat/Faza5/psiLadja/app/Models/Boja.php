<?php namespace App\Models;

use CodeIgniter\Model;

class Boja extends Model
{
        protected $table      = 'Boja';
        protected $primaryKey = 'IdBoj';
        protected $returnType = 'object';
        protected $allowedFields = ['IdBoj', 'Naziv', 'Cena'];
        
        public function dohvati($naziv){
            return $this->where('Naziv', $naziv)->first();
        }
  
}