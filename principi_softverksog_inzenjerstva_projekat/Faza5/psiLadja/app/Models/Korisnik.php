<?php namespace App\Models;

use CodeIgniter\Model;

class Korisnik extends Model
{
        protected $table      = 'Korisnik';
        protected $primaryKey = 'IdKor';
        protected $returnType = 'object';
        protected $allowedFields = ['IdKor', 'Ime', 'Prezime','Mejl','KorisnickoIme','Lozinka','Flag'];
        
        public function dohvati($korIme){
            return $this->where('KorisnickoIme', $korIme)->first();
        }
}