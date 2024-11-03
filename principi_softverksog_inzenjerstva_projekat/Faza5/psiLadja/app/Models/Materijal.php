<?php namespace App\Models;

use CodeIgniter\Model;

class Materijal extends Model
{
        protected $table      = 'Materijal';
        protected $primaryKey = 'IdMat';
        protected $returnType = 'object';
        protected $allowedFields = ['IdMat', 'Naziv', 'Cena'];
        
        public function dohvati($naziv){
            return $this->where('Naziv', $naziv)->first();
        }
}