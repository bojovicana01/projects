    
<!--Andrej Davidovic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registracija</title>
    <link href='<?php echo base_url("style.css") ?>' rel="stylesheet" type="text/css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    
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
        <h1 class="pitanje" >REGISTRACIJA</h1>
        <div class="form-container">
            <h2>Registracija korisnika</h2>
            <p>
            <?php if(isset($poruka)) echo "<font color='white'><b>$poruka</b></font><br>"; ?>
            </p> 
            <form name="loginform" action="<?= site_url('Gost/register') ?>" method="post">
                <div class="form-group">
                    <label for="Ime">Ime:</label>
                    <input type="text" id="Ime" name="Ime" placeholder="Unesite ime..." required>
                </div>
                <div class="form-group">
                    <label for="Prezime">Prezime:</label>
                    <input type="text" id="Prezime" name="Prezime" placeholder="Unesite prezime..." required>
                </div>
                <div class="form-group">
                    <label for="KorisnickoIme">Korisničko ime:</label>
                    <input type="text" id="KorisnickoIme" name="KorisnickoIme" placeholder="Unesite korisničko ime..." required>
                </div>
                <div class="form-group">
                    <label for="Mejl">Adresa e-mail naloga:</label>
                    <input type="text" id="Mejl" name="Mejl" placeholder="Unesite adresu..." required>
                </div>
                <div class="form-group">
                    <label for="Lozinka">Lozinka:</label>
                    <input type="password" id="Lozinka" name="Lozinka" placeholder="Unesite lozinku..." required>
                </div>
                <div class="form-group">
                    <label for="LozinkaPotvrda">Povrda lozinke:</label>
                    <input type="password" id="LozinkaPotvrda" name="LozinkaPotvrda" placeholder="Ponovite lozinku..." required>
                </div>
                <input type="submit" value='Registruj se'>
                <div class="form-group">
                    <p>Imate nalog? <a href="<?= site_url("{$controller}/prikaziPrijavu") ?>">Prijavite se.</a></p>
                </div>
                
            </form>
        </div>
        
    </div>


