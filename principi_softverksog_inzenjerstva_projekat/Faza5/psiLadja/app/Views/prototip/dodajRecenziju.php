<!DOCTYPE html>

<!--Lidija Deletic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dodaj recenziju</title>
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
        <h1 class="pitanje">OSTAVITE RECENZIJU</h1>>
        
    <form action="<?= site_url("{$controller}/postaviRecenziju") ?>" method="POST">
    <div class="novi" style="background-color: #CFBFA5;">
            
            <ul class="cont">
                <li><br>
                    <div class="o">Ocena:</div><br>
                    <div><input type="range" name="ocena" id="ocena" class="ocena"></div>
                    
                </li><br>
                <li>
                    <div class="o">Komentar:</div>
                    <div><input type="textarea" name="komentar" id="komentar" class="ocena" style="width:300px; height:100px;"></div>
                </li><br><br>
            </ul>
        </div>
        <?php if(isset($poruka)) echo "<font color='red'>$poruka</font><br>"; ?> <br>
        <input type="submit" value="Dodaj recenziju"> 
        
    </form>

        
           
    </div>

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

 <script>
    document.getElementById("dodaj-recenziju").addEventListener("click", function() {
        var ocena = document.getElementById("ocena").value;
        var ocena1 = document.getElementById("ocena1").value;
        var komentar = document.getElementById("komentar").value;
        var kontroler = "<?php echo $kontroler; ?>";
        //var url = kontroler + "/postaviRecenziju";
        

       /* var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("ocena=" + ocena + "&komentar=" + komentar);*/
    });
</script>  

    

</body>
</html>
