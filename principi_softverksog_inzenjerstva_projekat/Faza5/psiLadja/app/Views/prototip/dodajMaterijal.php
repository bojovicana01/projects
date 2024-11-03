<!DOCTYPE html>

<!--Andrej Davidovic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dodaj materijal</title>
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
    <div class="text-center">
        <div class="form-container2">
            <h2>Dodaj materijal</h2>
            <form method="POST" action="<?= site_url("$controller/dodajMaterijal") ?>">
                <div class="form-group">
                    <label for="materijal">Naziv materijala:</label>
                    <input type="text" class="materijal" name="materijal">
                </div><div class="form-group">
                    <label for="materijalCena">Cena materijala:</label>
                    <input type="text" class="materijalCena" name="materijalCena">
                </div>
                
                <div class="form-group">
                    <label for="proizvodi">Unesi sifre proizvoda (razdvojene zarezima) za koje je dostupan dati materijal:</label>
        <input type="text" class="proizvodi" name="proizvodi">
                </div>
                <div class="form-group">
                    <label for="slikaMat">Unesi sliku:</label>
                    <input type="text" class="slikaMat" name="slikaMat">
                </div>
                <input name="dodajMaterijal" type="submit" value="Dodaj materijal"><br>
                <?php if(isset($poruka)) echo "<font color='red'>$poruka</font><br>"; ?>
            </form>
        </div>
    

</body>
</html>
