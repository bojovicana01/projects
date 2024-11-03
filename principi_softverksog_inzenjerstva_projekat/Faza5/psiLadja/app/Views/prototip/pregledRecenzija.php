<!DOCTYPE html>

<!--Lidija Deletic-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pogledaj recenzije</title>
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
    
    <style>
    .white-field {
        background-color: #CFBFA5;
        color: white;
        padding: 10px;
        margin-bottom: 5px;
    }
</style>

    <div class="container tek text-center">
        <h1 class="pitanje">RECENZIJE</h1>
        <br>
        <div class="text-center recenzije">
            <div class="telo">
                <div class="pod">
                <p id="listaP">Lista svih recenzija:</p>
                
                </div>
            </div>
        </div>
        <br>
        <div class="recenzije">
            <?php 
                $session=session();
                $kontroler=null;
                if($session->has('korisnik'))
                    $kontroler="Prijavljen";
                if($session->has('moderator'))
                    $kontroler="Moderator";
                if($session->has('administrator'))
                    $kontroler="Administrator";
                else $kontroler="Gost";
            ?>
            <?php
            
            foreach ($recenzije as $rec) {
                echo '<div class="white-field">';
                echo '<p>Ocena:  ' . $rec->Ocena . ', Komentar:   ' . $rec->Komentar .'</p>';
                echo '</div>';
            }
           
            ?>  
            
            <script>
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var response = JSON.parse(this.responseText);
                        var recenzijeHTML = '';
                        for (var i = 0; i < response.length; i++) {
                            var recenzija = response[i];
                            var imeKorisnika = recenzija.imeKorisnika;
                            var prezimeKorisnika = recenzija.prezimeKorisnika;
                            var ocena = recenzija.Ocena;
                            var opis = recenzija.Komentar;

                            recenzijeHTML += '<div>';
                            recenzijeHTML += '<h3>'+imeKorisnika+' '+prezimeKorisnika+ ' je rekao o nama:</h3>';
                            recenzijeHTML += '<p>Ocena: ' + ocena + '</p>';
                            recenzijeHTML += '<p>Komentar: ' + opis + '</p>';
                            recenzijeHTML += '</div>';
                        }
                        document.querySelector('.recenzije').innerHTML = recenzijeHTML;
                    }
                };
                
            </script>
        </div>
        <br>
        <?php
        
        $session=session();
        if((!$session->has('korisnik') || !$session->has('moderator'))
         || !($session->has('administrator'))){
            $url = site_url("{$controller}/prikaziRecenzijuPre");
            echo "<a href='$url'>Dodaj recenziju</a>";
            }
            else {
                $url = site_url("{$controller}/pocetna");
                echo "<a href='$url'>Dodaj recenziju</a>";
            
            }
        ?>
    </div>
    
    
    
</body>
</html>





    
