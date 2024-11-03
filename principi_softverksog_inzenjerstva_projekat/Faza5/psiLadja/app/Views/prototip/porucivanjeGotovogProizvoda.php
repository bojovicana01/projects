
<!--Djurdja Joksimovic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Porucivanje gotovog proizvoda</title>
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
        <h1 class="pitanje" >PORUCIVANJE PROIZVODA</h1>
        </div>
        <div class="form-container">
            <h2>Unesite podatke</h2>
       
            <form method="POST" action="<?= site_url("{$controller}/poruciGotov") ?>">
                <div class="form-group">
                    <label for="velicina">Velicina:</label>
                    <select id="velicina" name="velicina">
                        <option value="vel1">150x180x60</option>
                        <option value="vel2">145x155x50</option>
                        <option value="vel3">180x190x70</option>
                        <option value="vel4">200x210x80</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="boja">Boja:</label>
                    <select class="boja" name="boja">
                        <option value="color1">Tamno braon</option>
                        <option value="color2">Oker</option>
                        <option value="color3">Trula visnja</option>
                        <option value="color4">Ciklama</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="kolicina">Količina:</label>
                    <input type="text" class="kolicina" name="kolicina">
                </div>
                <div class="form-group">
                    <input name="dodajMaterijal" type="submit" value="Poruci i predji na placanje"><br>
                    <?php if(isset($poruka)) echo "<font color='red'>$poruka</font><br>"; ?>
                </div>
            </form>
        </div>

</body>
</html>
