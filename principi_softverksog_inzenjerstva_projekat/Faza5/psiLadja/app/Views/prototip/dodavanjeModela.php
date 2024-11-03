
<!--Ana Bojovic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dodavanje modela</title>
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
        <h1 class="pitanje" >DODAVANJE MODELA</h1>
        </div>
        <div class="form-container2 text-center">
            <h2>Unesite podatke</h2>
            <form method="post" action="<?= site_url("{$controller}/dodavanjeModelaMetod") ?>">
                <div class="form-group">
                    <label for="naziv">Naziv modela:</label>
                    <input type="text" class="naziv" name="naziv">
                
                </div><div class="form-group">
                    <label for="slikaModela">Unesite sliku:</label>
                    <input type="text" class="slikaModela" name="slikaModela">
                </div>
                <div class="form-group">
                    <label for="slikaModela">Unesite naziv tipa:</label>
                    <input type="text" class="tip" name="tipModela">
                </div>
                <button class="btn btn-secondary">Dodaj model</button>
            </form>
        </div>

</body>
</html>
