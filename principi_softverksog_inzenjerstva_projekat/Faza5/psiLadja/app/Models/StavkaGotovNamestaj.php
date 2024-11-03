<?php namespace App\Models;

use CodeIgniter\Model;

class StavkaGotovNamestaj extends Model
{
        protected $table      = 'Stavka_Gotov_Namestaj';
        protected $primaryKey = 'IdSGN';
        protected $returnType = 'object';
        protected $allowedFields = ['IdSGN', 'IdGN'];
        
  
}