
<!--Andrej Davidovic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izmena cene</title>
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
        <h1 class="pitanje" >IZMENA CENE</h1>
        </div>
        <div class="form-container2 text-center">
            <h2>Unesite podatke:</h2>
            <form  id= "izmeniCenuForm" method="POST" action="<?= site_url("$controller/izmeniCenu") ?>">

                <div class="form-group">
                    <label for="vrsta">Izaberite za sta menjate cenu:</label>
                    <select id="vrsta" name="vrsta[]" onchange="handleOptionChange()">
                        <option value="boja">Boja</option>
                        <option value="materijal">Materijal</option>
                        <option value="proizvod">Proizvod</option>
                    </select>
                </div><div class="form-group">
                    <label for="naziv">Naziv boje:</label>
                    <input type="text" id="nazivBoje" class="boja" name="nazivBoje" >
                                        
                
                </div>
                <div class="form-group">
                    <label for="naziv">Sifra proizvoda:</label>
                    <input type="text" id="sifraProizvoda" class="sifra" name="nazivProizvoda" disabled>
                
                </div>
                <div class="form-group">
                    <label for="naziv">Naziv materijala:</label>
                    <input type="text" id="nazivMaterijala" class="materijal" name="nazivMaterijala" disabled>
                
                </div>
                <div class="form-group">
                    <label for="naziv">Nova cena:</label>
                    <input type="text" class="novaCena" name="cena">
                      <p id="poruka">
        <?php if(isset($poruka)) echo "<font color='red'>$poruka</font><br>"; ?>
    </p>
                   
                </div>
                
                <input name="uspeh" type="submit" value="Izmeni cenu"><br>
            </form>
        </div>
    
    
    <script>
        function handleOptionChange() {
            var selectBox = document.getElementById("vrsta");
            var selectedOption = selectBox.options[selectBox.selectedIndex].value;
            
            var form = document.getElementById("izmeniCenuForm");
            

            var nazivBojeInput = document.getElementById("nazivBoje");
            var sifraProizvodaInput = document.getElementById("sifraProizvoda");
            var nazivMaterijalaInput = document.getElementById("nazivMaterijala");
            
            var porukaElement = document.getElementById("poruka");

            if (selectedOption === "boja") {
                nazivBojeInput.disabled = false;
                sifraProizvodaInput.disabled = true;
                nazivMaterijalaInput.disabled = true;
                porukaElement.style.display = "block";
                
            } else if (selectedOption === "materijal") {
                nazivBojeInput.disabled = true;
                nazivMaterijalaInput.disabled = false;
                sifraProizvodaInput.disabled = true;
                porukaElement.style.display = "block";
                
            } else if (selectedOption === "proizvod") {
                nazivBojeInput.disabled = true;
                nazivMaterijalaInput.disabled = true;
                sifraProizvodaInput.disabled = false;
                porukaElement.style.display = "block";
            }
        }
    </script>

</body>
</html>
