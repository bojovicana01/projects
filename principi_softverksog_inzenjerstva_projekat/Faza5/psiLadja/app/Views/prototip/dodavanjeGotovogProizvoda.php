
<!--Lidija Deletic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dodavanje gotovog proizvoda</title>
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
        <h1 class="pitanje" >DODAVANJE PROIZVODA</h1>
        </div>
        <div class="form-container2">
            <h2>Unesite podatke</h2>
            <form method="POST" action="<?= site_url("$controller/dodajGotovProizvod") ?>">
                <div class="form-group">
                    <label for="naziv">Naziv proizvoda:</label>
                    <input type="text" class="naziv" name="naziv">
                
                </div>
                <div class="form-group">
                    <label for="sifra">Sifra proizvoda:</label>
                    <input type="text" class="sifra" name="sifra">
                
                </div>
                <div class="form-group">
                    <label for="opis">Opis proizvoda:</label>
                    <input type="text" class="opis" name="opis">
                
                </div>
                <div class="form-group">
                    <label for="slikaProizvoda">Slika proizvoda:</label>
                    <input type="text" class="slikaProizvoda" name="slikaProizvoda">
                </div>
                <div class="form-group">
                    <label for="cenaPr">Pocetna cena izrade proizvoda:</label>
                    <input type="text" class="cenaPr" name="cenaPr">
                </div>
                <div class="form-group">
                    <label for="boje">Izaberi boje za dati proizvod:</label>
                    <select id="boje" name="boje" multiple>
                        <option value="1" selected>Tamno braon</option>
                        <option value="2">braon</option>
                        <option value="3">Crna</option>
                        <option value="4">Bela</option>
                        <option value="5">Zuta</option>
                        <option value="6">Crvena</option>
                        
                    </select>
                </div>
                <div class="form-group">
                    <label for="materijali">Izaberi materijale za dati proizvod:</label>
                    <select id="materijali" name="materijali" multiple >
                        <option value="1" selected>Hrast</option>
                        <option value="2">Univer aluminijum</option>
                        <option value="3">Medijapan</option>
                        <option value="4">Oplemenjnei medijapan</option>
                        <option value="5">Medijapan visokog sjaja</option>
                        <option value="6">Sirovi medijapan</option>
                        <option value="7">Oplemenjena iverica</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="visina">Visina:</label>
                    <input type="text" id="visina" name="visina" required>
                </div>
                <div class="form-group">
                    <label for="sirina">Širina:</label>
                    <input type="text" id="sirina" name="sirina" required>
                </div>
                <div class="form-group">
                    <label for="duzina">Dubina:</label>
                    <input type="text" id="dubina" name="dubina" required>
                </div>
                
                <div class="form-group">
                    <label for="duzina">Unesite naziv modela proizvoda:</label>
                    <input type="text" id="model" name="model" required>
                </div>
               
                <input name="dodajProizvod" type="submit" value="Dodaj proizvod"><br>
                <?php if(isset($poruka)) echo "<font color='red'>$poruka</font><br>"; ?>
            </form>
        </div>
    
    
    <script>
    var boje = document.getElementById('boje').value;
    var materijali = document.getElementById('materijali').value;
    
    
    
    </script>

</body>
</html>
