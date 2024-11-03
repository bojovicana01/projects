    
<!--Andrej Davidovic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prijava</title>
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
            </ul>
        </div>
    </nav>

    <div class="container tek text-center">
        <div class="row mt-5">
            <div class="col-12 text-center naslov">
                <p id="hc">HOME CENTRE</p>
            </div>
        </div>
        
        <h1 class="pitanje" >PRIJAVA</h1>
        <div class="form-container">
            
            <h2>Prijava korisnika</h2>
            <p>
            <?php if(isset($poruka)) echo "<font color='red'>$poruka</font><br>"; ?>
            </p>  
            <form name="loginform" action="<?= site_url('Gost/loginSubmit') ?>" method="post">
                <div class="form-group">
                    <label for="KorisnickoIme">Korisničko ime:</label>
                    <input type="text"  name="KorisnickoIme" 
                             value="<?= set_value('KorisnickoIme') ?>">
                </div>
                <div class="form-group">
                    <label for="Lozinka">Lozinka:</label>
                    <input type="password" id="Lozinka" name="Lozinka">
                </div>
                <input type="submit" value='Prijavi se'>
                <div class="form-group">
                    <p>Nemate nalog? <a href="<?= site_url("{$controller}/prikaziRegistraciju") ?>">Registrujte se.</a></p>
                </div>
                
            </form>
        </div>
        
    </div>


