<?php namespace App\Models;

use CodeIgniter\Model;

class Recenzija extends Model
{
        protected $table      = 'Recenzija';
        protected $primaryKey = 'IdRec';
        protected $returnType = 'object';
        protected $allowedFields = ['IdRec', 'Ocena', 'Komentar','IdKor'];
        
  
}