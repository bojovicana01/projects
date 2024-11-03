
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pocetna stranica</title>
    <link href='<?php echo base_url("style.css") ?>' rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    
</head>
<body class="tek">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">
            <img src="<?php echo base_url('slike/logo1.jpeg') ?>" alt="Logo" style="width:50px;" class="rounded-pill">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="<?= site_url("{$controller}/prikaziStranicuPocetna") ?>">Početna</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= site_url("{$controller}/prikaziStranicuPostaviPitanje") ?>">Postavite pitanje</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= site_url("{$controller}/prikaziStranicuPregledRecenzija") ?>">Pogledajte recenzije</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= site_url("{$controller}/prikaziStranicuOnama") ?>">Kontakt informacije</a>
                </li>
                <li class="nav-item ml-auto">
                    <a class="nav-link" href="<?=$controller == 'Gost' ? '#' : site_url("{$controller}/logout")?>">Odjavi se</a>
                    
                </li>
            </ul>
        </div>
    </nav>

    <div class="container tek text-center">
        <div class="row mt-5">
            <div class="col-12 text-center naslov">
                <p id="hc">HOME CENTRE</p>
            </div>
        </div>
        
        <div class="linkovi">
            <?php
                if ($controller=="Gost") {
                    echo "<a href='" . site_url("Gost/registracija") . "' id='linkR'>Registruj se</a><br>";
                    echo "<a href='" . site_url("Gost/login") . "'>Prijavi se</a>";
                }
                if($controller=="Moderator"){
                    echo "<a href='" . site_url("Moderator/index") . "'>Prikaz opcija moderatora</a>";
                }
                if($controller=="Administrator"){
                    echo "<a href='" . site_url("Administrator/index") . "'>Prikaz opcija administratora</a>";
                }
            ?>
        </div>
        
        
        <div class="row mt-3 kartice">
            <div class="col-md-6">
                <div class="card card1" style="width: 350px; ">
                    <img src="<?php echo base_url('slike/slika1g.jpeg') ?>" class="card-img-top" alt="Slika 1">
                    <div class="card-body">
                        <h4 class="card-title">Galerija</h4>
                        <p class="card-text">Pogledajte galeriju proizvoda  </p>
                        <a href="<?= site_url("{$controller}/prikaziStranicuGalerija") ?>" class="btn btn-secondary">Prikazi galeriju</a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card" style="width: 350px; ">
                    <img src="<?php echo base_url('slike/slika2g.jpeg') ?>" class="card-img-top" alt="Slika 2">
                    <div class="card-body">
                        <h5 class="card-title">Proizvodi</h5>
                        <p class="card-text">Pogledajte proizvode koje mozete naruciti</p>
                        <a href="<?= site_url("{$controller}/prikaziStranicuTipovi") ?>" class="btn btn-secondary">Prikazi proizvode</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>