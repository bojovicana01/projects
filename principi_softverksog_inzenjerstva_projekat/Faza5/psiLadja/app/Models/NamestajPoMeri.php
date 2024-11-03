<?php namespace App\Models;

use CodeIgniter\Model;

class NamestajPoMeri extends Model
{
        protected $table      = 'namestaj_po_meri';
        protected $primaryKey = 'IdNPM';
        protected $returnType = 'object';
        protected $allowedFields = ['IdNPM', 'IdMod', 'DodatnaCenaUsluga','Naziv','Opis'];
        public function dohvati($idMod){
            return $this->where('IdMod', $idMod)->first();
        }
  
}