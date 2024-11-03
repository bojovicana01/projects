<?php namespace App\Models;

use CodeIgniter\Model;

class TipNamestaja extends Model
{
        protected $table      = 'Tip';
        protected $primaryKey = 'IdTip';
        protected $returnType = 'object';
        protected $allowedFields = ['IdTip', 'Kategorija', 'Slika'];
        
        public function dohvati($kategorija){
            return $this->where('Kategorija', $kategorija)->first();
        }
  
}