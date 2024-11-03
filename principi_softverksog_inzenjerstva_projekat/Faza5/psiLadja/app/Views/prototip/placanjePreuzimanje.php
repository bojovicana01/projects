
<!--Djurdja Joksimovic-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Placanje i preuzimanje</title>
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
        <h1 class="pitanje" >PLACANJE I DOSTAVA</h1>
        </div>
        <div class="form-container">
            <h2>Unesite podatke</h2>
            <form method="POST" action="<?= site_url("{$controller}/plati") ?>">
                <div class="form-group">
                    <label for="placanje">Izaberite nacin placanja:</label>
                    <input onclick="enableDisableInput()" type="radio" name="placanje"> po preuzimanju
                    <input onclick="enableDisableInput()" type="radio" name="placanje" value="online" checked> online placanje
            <br>
                </div>
                <div class="form-group">
                    <label for="brRac">Broj racuna(ako je izabrano online placanje):</label>
                    <input type="text" id="brRac" name="brojRacuna" >
                </div>
                
                <div class="form-group">
                    <label for="dostava">Izaberite nacin preuzimanja:</label>
                    <input onclick="enableDisableInputDostava()" type="radio" name="dostava" value="adresa" checked> Dostava na adresu
                    <input onclick="enableDisableInputDostava()" type="radio" name="dostava" > Preuzimanje u radnji
                </div>
                <div class="form-group">
                    <label for="adresa">Adresa dostave:</label>
                    <input type="text" id="adresa" name="adresa">
                    <label for="brTel">Broj telefona:</label>
                    <input type="text" id="brTel" name="brTel">
                    
                </div>
                <div class="form-group">
                   
                     <input name="dodajMaterijal" type="submit" value="Plati"><br>
                    <?php if(isset($poruka)) echo "<font color='red'>$poruka</font><br>"; ?>
                </div>
            </form>
            <script type="text/javascript">
		function enableDisableInput() {
			if (document.getElementsByName("placanje")[1].checked) {
				document.getElementById("brRac").disabled = false;
			} else {
				document.getElementById("brRac").disabled = true;
			}
		}
	</script>
        <script type="text/javascript">
		function enableDisableInputDostava() {
			if (document.getElementsByName("dostava")[0].checked) {
				document.getElementById("adresa").disabled = false;
                                document.getElementById("brTel").disabled = false;
			} else {
				document.getElementById("adresa").disabled = true;
                                document.getElementById("brTel").disabled = true;
			}
		}
	</script>
        </div>

</body>
</html>
