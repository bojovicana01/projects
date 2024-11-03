<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;
use App\Models\Recenzija;
use App\Models\Korisnik;
/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{
    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $request;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var array
     */
    protected $helpers = ['form','url'];

    /**
     * Be sure to declare properties for any property fetch you initialized.
     * The creation of dynamic property is deprecated in PHP 8.2.
     */
    // protected $session;

    /**
     * Constructor.
     */
    
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        // Preload any models, libraries, etc, here.

         $this->session = \Config\Services::session();
    }
    public function ucitajRecenzije(){
        $recenzijaModel = new Recenzija();
        $recenzije = $recenzijaModel->findAll();
        $korisnik=new Korisnik();
        foreach ($recenzije as $recenzija){
            $recenzija->imeKorisnika=$korisnik->find($recenzija->IdKor)->Ime;
            $recenzija->prezimeKorisnika=$korisnik->find($recenzija->IdKor)->Prezime;
            
        }
        return json_encode($recenzije);
    }
    protected function prikaz($path,$data){}
    //-----------------linkovi za navbar---------------------------
    public function prikaziStranicuPocetna() {
        $this->prikaz('pocetna', null);
    }
    
    public function prikaziStranicuPostaviPitanje() {
        $this->prikaz('postaviPitanje', null);
    }
    
    public function prikaziStranicuPregledRecenzija() {
        $this->prikaz('pregledRecenzija', null);
    }
    
    public function prikaziStranicuOnama() {
        $this->prikaz('onama', null);
    }
    
    public function prikaziStranicuRegistracija() {
        $this->prikaz('registracija', null);
    }
    
    public function prikaziStranicuGalerija() {
        $this->prikaz('galerija', null);
    }
    
    
    public function prikaziStranicuTipovi() {
        $this->prikaz('tipovi', null);
    }
    public function prikaziStranicuModeli()
    {
        $this->prikaz('modeli',null);
    }

    //-----------------linkovi za navbar---------------------------
    
}
