-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 17, 2023 at 03:10 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `namestaj`
--
CREATE DATABASE IF NOT EXISTS `namestaj` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `namestaj`;

-- --------------------------------------------------------

--
-- Table structure for table `boja`
--

DROP TABLE IF EXISTS `boja`;
CREATE TABLE IF NOT EXISTS `boja` (
  `IdBoj` int NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(20) NOT NULL,
  `Cena` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdBoj`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `boja`
--

INSERT INTO `boja` (`IdBoj`, `Naziv`, `Cena`) VALUES
(1, 'braon', '900.00'),
(2, 'crna', '1000.00'),
(3, 'bela', '1000.00'),
(4, 'siva', '600.00'),
(5, 'tamno-braon', '700.00'),
(6, 'zuta', '500.00'),
(7, 'crvena', '800.00');

-- --------------------------------------------------------

--
-- Table structure for table `gotov_namestaj`
--

DROP TABLE IF EXISTS `gotov_namestaj`;
CREATE TABLE IF NOT EXISTS `gotov_namestaj` (
  `IdGN` int NOT NULL AUTO_INCREMENT,
  `Visina` int NOT NULL,
  `Sirina` int NOT NULL,
  `Dubina` int NOT NULL,
  `Cena` char(18) DEFAULT NULL,
  `IdMat` int NOT NULL,
  `IdBoj` int NOT NULL,
  `IdMod` int NOT NULL,
  `Naziv` varchar(45) NOT NULL,
  `Opis` varchar(70) NOT NULL,
  PRIMARY KEY (`IdGN`),
  KEY `FK_BOJA_GN_idx` (`IdBoj`),
  KEY `FK_MAT_GN_idx` (`IdMat`),
  KEY `FK_MOD_GN_idx` (`IdMod`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gotov_namestaj`
--

INSERT INTO `gotov_namestaj` (`IdGN`, `Visina`, `Sirina`, `Dubina`, `Cena`, `IdMat`, `IdBoj`, `IdMod`, `Naziv`, `Opis`) VALUES
(1, 100, 100, 100, '7000', 25, 1, 1, 'vitrina', ''),
(2, 100, 100, 100, '6000', 25, 1, 1, 'vitrina1', ''),
(3, 100, 200, 0, '7000', 14, 1, 1, 'vitrina3', ''),
(4, 100, 200, 100, '7000', 14, 1, 1, 'vitrina4', ''),
(5, 100, 200, 100, '7000', 3, 3, 1, 'vitrina4', ''),
(6, 150, 250, 150, '8000', 6, 5, 3, 'sto2', ''),
(7, 150, 150, 250, '9000', 3, 5, 3, 'vitrina3', ''),
(8, 150, 150, 250, '9000', 3, 5, 3, 'vitrina7', ''),
(9, 150, 150, 250, '9000', 3, 5, 3, 'vitrina7', ''),
(10, 80, 200, 100, '10000', 1, 4, 4, 'sofa2', '');

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE IF NOT EXISTS `korisnik` (
  `IdKor` int NOT NULL AUTO_INCREMENT,
  `Ime` varchar(20) NOT NULL,
  `Prezime` varchar(20) NOT NULL,
  `Mejl` varchar(40) NOT NULL,
  `KorisnickoIme` varchar(20) NOT NULL,
  `Lozinka` varchar(20) NOT NULL,
  `Flag` int NOT NULL,
  PRIMARY KEY (`IdKor`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`IdKor`, `Ime`, `Prezime`, `Mejl`, `KorisnickoIme`, `Lozinka`, `Flag`) VALUES
(1, 'ana', 'bojovic', 'ana.bojovic@gmial.com', 'bojovicana', 'ana123', 2),
(2, 'pera', 'peric', 'pera.peric@gmail.com', 'pericpera', 'pera123', 1),
(3, 'jovan', 'jovanovic', 'jovan.jovanovic@gmail.com', 'jovazmaj', 'jovan123', 1),
(4, 'Zika', 'Zikic', 'zika.zikic@gmail.com', 'zikiczika', 'zika123', 0),
(5, 'Mika', 'Mikic', 'mika.mikic@gmail.com', 'mikicmika', 'mika123', 0),
(6, 'marko', 'markovic', 'marko.markovic@gmail.com', 'markomarkovic', 'marko123', 0);

-- --------------------------------------------------------

--
-- Table structure for table `materijal`
--

DROP TABLE IF EXISTS `materijal`;
CREATE TABLE IF NOT EXISTS `materijal` (
  `IdMat` int NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(45) NOT NULL,
  `Cena` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdMat`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `materijal`
--

INSERT INTO `materijal` (`IdMat`, `Naziv`, `Cena`) VALUES
(1, 'hrast', '1500.00'),
(2, 'univer aluminijum', '3000.00'),
(3, 'medijapan', '2000.00'),
(4, 'oplemenjeni medijapan', '3000.00'),
(5, 'medijapan visokog sjaja', '5000.00'),
(6, 'sirovi medijapan', '2000.00'),
(7, 'oplemenjena iverica', '3000.00'),
(25, 'sirova iverica', '1300.00');

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
CREATE TABLE IF NOT EXISTS `model` (
  `IdMod` int NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(45) NOT NULL,
  `IdTip` int NOT NULL,
  `Slika` varchar(200) NOT NULL,
  PRIMARY KEY (`IdMod`),
  KEY `FK_TIP_MODEL_idx` (`IdTip`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`IdMod`, `Naziv`, `IdTip`, `Slika`) VALUES
(1, 'INDUSTRIJSKI STO', 1, 'slike/sto.jpg'),
(2, 'STO ZA RUCAVANJE', 1, 'slike/sto4a.jpg'),
(3, 'NISKI STO', 1, 'slike/sto3a.jpg'),
(4, 'SOFA', 3, 'slike/sofa1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `namestaj_po_meri`
--

DROP TABLE IF EXISTS `namestaj_po_meri`;
CREATE TABLE IF NOT EXISTS `namestaj_po_meri` (
  `IdNPM` int NOT NULL AUTO_INCREMENT,
  `IdMod` int NOT NULL,
  `DodatnaCenaUsluga` decimal(10,2) NOT NULL,
  `Naziv` varchar(45) NOT NULL,
  `Opis` varchar(70) NOT NULL,
  PRIMARY KEY (`IdNPM`),
  KEY `FK_Model_NPM_idx` (`IdMod`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `namestaj_po_meri`
--

INSERT INTO `namestaj_po_meri` (`IdNPM`, `IdMod`, `DodatnaCenaUsluga`, `Naziv`, `Opis`) VALUES
(1, 3, '2000.00', '', ''),
(2, 3, '2000.00', '', ''),
(3, 3, '2000.00', 'sto3', ''),
(4, 3, '6000.00', '', ''),
(5, 3, '6000.00', '', ''),
(7, 4, '9000.00', 'sofa1', ''),
(8, 1, '2000.00', 'sto1', '');

-- --------------------------------------------------------

--
-- Table structure for table `narucen_namestaj_po_meri`
--

DROP TABLE IF EXISTS `narucen_namestaj_po_meri`;
CREATE TABLE IF NOT EXISTS `narucen_namestaj_po_meri` (
  `IdNNPM` int NOT NULL AUTO_INCREMENT,
  `IdMat` int NOT NULL,
  `IdBoj` int NOT NULL,
  `Visina` int NOT NULL,
  `Sirina` int NOT NULL,
  `Dubina` int NOT NULL,
  `IdNPM` int NOT NULL,
  `Cena` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdNNPM`),
  KEY `FkNPM_nam_idx` (`IdNPM`),
  KEY `Fk_Boja_nar_idx` (`IdBoj`),
  KEY `FK_mt-nar_idx` (`IdMat`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `narucen_namestaj_po_meri`
--

INSERT INTO `narucen_namestaj_po_meri` (`IdNNPM`, `IdMat`, `IdBoj`, `Visina`, `Sirina`, `Dubina`, `IdNPM`, `Cena`) VALUES
(1, 3, 5, 100, 100, 100, 7, '99999999.99'),
(2, 3, 5, 100, 150, 200, 7, '99999999.99'),
(3, 3, 5, 100, 150, 200, 7, '99999999.99');

-- --------------------------------------------------------

--
-- Table structure for table `porudzbine`
--

DROP TABLE IF EXISTS `porudzbine`;
CREATE TABLE IF NOT EXISTS `porudzbine` (
  `IdPor` int NOT NULL AUTO_INCREMENT,
  `Status` char(1) NOT NULL,
  `Opis` varchar(200) NOT NULL,
  `IdKor` int NOT NULL,
  `Iznos` decimal(10,2) NOT NULL,
  `Adresa` varchar(100) NOT NULL,
  PRIMARY KEY (`IdPor`),
  KEY `FK_KOR_POR_idx` (`IdKor`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `porudzbine`
--

INSERT INTO `porudzbine` (`IdPor`, `Status`, `Opis`, `IdKor`, `Iznos`, `Adresa`) VALUES
(1, 'p', 'kvalitetno', 1, '1000.00', 'Veselin Nikolic 24'),
(2, 'p', 'kvalitetno', 1, '99999999.99', 'Veselin Nikolic 24'),
(3, 'p', 'kvalitetno', 1, '99999999.99', 'Veselin Nikolic 24'),
(4, 'p', 'kvalitetno', 1, '10000.00', 'Kosovska 100');

-- --------------------------------------------------------

--
-- Table structure for table `recenzija`
--

DROP TABLE IF EXISTS `recenzija`;
CREATE TABLE IF NOT EXISTS `recenzija` (
  `IdRec` int NOT NULL AUTO_INCREMENT,
  `Ocena` int NOT NULL,
  `Komentar` char(200) NOT NULL,
  `IdKor` int NOT NULL,
  PRIMARY KEY (`IdRec`),
  KEY `FK_REC_KOR_idx` (`IdKor`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recenzija`
--

INSERT INTO `recenzija` (`IdRec`, `Ocena`, `Komentar`, `IdKor`) VALUES
(1, 4, 'ocena za sto1', 1),
(2, 10, 'odlicna cena proizvoda', 2),
(3, 10, 'administratorka dala ocenu', 1),
(4, 10, 'administratorka ocenila ormar', 1),
(5, 10, 'zikica dao naj ocenu', 4),
(6, 5, 'ana Bojovic ocenila', 1),
(7, 7, 'Zmaj ocenio', 3);

-- --------------------------------------------------------

--
-- Table structure for table `slika_boja`
--

DROP TABLE IF EXISTS `slika_boja`;
CREATE TABLE IF NOT EXISTS `slika_boja` (
  `IdSlB` int NOT NULL AUTO_INCREMENT,
  `Link` varchar(400) NOT NULL,
  `IdBoj` int NOT NULL,
  `IdKor` int NOT NULL,
  PRIMARY KEY (`IdSlB`),
  KEY `FK_KOR_SLIKB_idx` (`IdKor`),
  KEY `FK_BOJA_SLIKABOJA_idx` (`IdBoj`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `slika_boja`
--

INSERT INTO `slika_boja` (`IdSlB`, `Link`, `IdBoj`, `IdKor`) VALUES
(1, 'slike/braon.webp', 1, 1),
(2, 'slike/crna.jpg', 2, 1),
(3, 'slike/bela.jpg', 3, 1),
(4, 'slike/siva.jpg', 4, 1),
(5, 'slike/tamno-braon.jpeg', 5, 1),
(6, 'slike/zuta.jpg', 6, 1),
(7, 'slike/crvena.png', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `slika_gotov_namestaj`
--

DROP TABLE IF EXISTS `slika_gotov_namestaj`;
CREATE TABLE IF NOT EXISTS `slika_gotov_namestaj` (
  `IdSlGN` int NOT NULL AUTO_INCREMENT,
  `Link` varchar(400) NOT NULL,
  `IdGN` int NOT NULL,
  `IdKor` int NOT NULL,
  PRIMARY KEY (`IdSlGN`),
  KEY `FK_GN_SLIKA_idx` (`IdGN`),
  KEY `FK_KOR_SLIKA_idx` (`IdKor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `slika_gotov_namestaj`
--

INSERT INTO `slika_gotov_namestaj` (`IdSlGN`, `Link`, `IdGN`, `IdKor`) VALUES
(1, 'slike/vitrina1.jpg', 9, 1),
(2, 'slike/sofa2.jpg', 10, 1),
(3, 'slike/sto4a.jpg', 5000, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `slika_materijal`
--

DROP TABLE IF EXISTS `slika_materijal`;
CREATE TABLE IF NOT EXISTS `slika_materijal` (
  `IdSlM` int NOT NULL AUTO_INCREMENT,
  `Link` varchar(400) NOT NULL,
  `IdMat` int NOT NULL,
  `IdKor` int NOT NULL,
  PRIMARY KEY (`IdSlM`),
  KEY `FK_MAT_SLM_idx` (`IdMat`),
  KEY `FK_KR_SLM_idx` (`IdKor`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `slika_materijal`
--

INSERT INTO `slika_materijal` (`IdSlM`, `Link`, `IdMat`, `IdKor`) VALUES
(1, 'slike/hrast.jpg', 1, 1),
(2, 'slike/univerAluminijum.webp', 2, 1),
(3, 'slike/matMedijapan.webp', 3, 1),
(4, 'slike/oplemenjeniMedijapan.webp', 4, 1),
(5, 'slike/medijapanSjaj.webp', 5, 1),
(6, 'slike/siroviMedijapan.webp', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `slika_namestaj_po_meri`
--

DROP TABLE IF EXISTS `slika_namestaj_po_meri`;
CREATE TABLE IF NOT EXISTS `slika_namestaj_po_meri` (
  `IdSlNPM` int NOT NULL AUTO_INCREMENT,
  `Link` varchar(400) NOT NULL,
  `IdNPM` int NOT NULL,
  `IdKor` int NOT NULL,
  PRIMARY KEY (`IdSlNPM`),
  KEY `FK_NPM_slika_idx` (`IdNPM`),
  KEY `FK_korisnik_slika_poMeri_idx` (`IdKor`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `slika_namestaj_po_meri`
--

INSERT INTO `slika_namestaj_po_meri` (`IdSlNPM`, `Link`, `IdNPM`, `IdKor`) VALUES
(3, 'slike/sofa1.jpg', 7, 1),
(4, 'slike/sto2a.jpg', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stavka_gotov_namestaj`
--

DROP TABLE IF EXISTS `stavka_gotov_namestaj`;
CREATE TABLE IF NOT EXISTS `stavka_gotov_namestaj` (
  `IdSGN` int NOT NULL,
  `IdGN` int NOT NULL,
  PRIMARY KEY (`IdSGN`),
  KEY `FK_SGNN_idx` (`IdGN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stavka_namestaj_po_meri`
--

DROP TABLE IF EXISTS `stavka_namestaj_po_meri`;
CREATE TABLE IF NOT EXISTS `stavka_namestaj_po_meri` (
  `IdSNPM` int NOT NULL,
  `IDNNPM` int NOT NULL,
  PRIMARY KEY (`IdSNPM`),
  KEY `FK_ST_NNPM_idx` (`IDNNPM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stavka_porudzbine`
--

DROP TABLE IF EXISTS `stavka_porudzbine`;
CREATE TABLE IF NOT EXISTS `stavka_porudzbine` (
  `IdSP` int NOT NULL AUTO_INCREMENT,
  `IdPor` int NOT NULL,
  `Iznos` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdSP`),
  KEY `FK_POr_st_idx` (`IdPor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `stavka_porudzbine`
--

INSERT INTO `stavka_porudzbine` (`IdSP`, `IdPor`, `Iznos`) VALUES
(1, 2, '99999999.99'),
(2, 3, '99999999.99'),
(3, 4, '10000.00');

-- --------------------------------------------------------

--
-- Table structure for table `tip`
--

DROP TABLE IF EXISTS `tip`;
CREATE TABLE IF NOT EXISTS `tip` (
  `IdTip` int NOT NULL AUTO_INCREMENT,
  `Kategorija` varchar(45) NOT NULL,
  `Slika` varchar(200) NOT NULL,
  PRIMARY KEY (`IdTip`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tip`
--

INSERT INTO `tip` (`IdTip`, `Kategorija`, `Slika`) VALUES
(1, 'STOLOVI', 'slike/sto.jpg'),
(2, 'ORMARI', 'slike/ormar1a.jpg'),
(3, 'UGAONA GARNITURA', 'slike/ug1.jpg');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `narucen_namestaj_po_meri`
--
ALTER TABLE `narucen_namestaj_po_meri`
  ADD CONSTRAINT `Fk_Boja_nar` FOREIGN KEY (`IdBoj`) REFERENCES `boja` (`IdBoj`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_mt-nar` FOREIGN KEY (`IdMat`) REFERENCES `materijal` (`IdMat`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FkNPM_nam` FOREIGN KEY (`IdNPM`) REFERENCES `namestaj_po_meri` (`IdNPM`) ON UPDATE CASCADE;

--
-- Constraints for table `porudzbine`
--
ALTER TABLE `porudzbine`
  ADD CONSTRAINT `FK_KOR_POR` FOREIGN KEY (`IdKor`) REFERENCES `korisnik` (`IdKor`) ON UPDATE CASCADE;

--
-- Constraints for table `recenzija`
--
ALTER TABLE `recenzija`
  ADD CONSTRAINT `FK_REC_KOR` FOREIGN KEY (`IdKor`) REFERENCES `korisnik` (`IdKor`) ON UPDATE CASCADE;

--
-- Constraints for table `slika_boja`
--
ALTER TABLE `slika_boja`
  ADD CONSTRAINT `FK_BOJA_SLIKABOJA` FOREIGN KEY (`IdBoj`) REFERENCES `boja` (`IdBoj`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_KOR_SLIKB` FOREIGN KEY (`IdKor`) REFERENCES `korisnik` (`IdKor`) ON UPDATE CASCADE;

--
-- Constraints for table `slika_materijal`
--
ALTER TABLE `slika_materijal`
  ADD CONSTRAINT `FK_KR_SLM` FOREIGN KEY (`IdKor`) REFERENCES `korisnik` (`IdKor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_MAT_SLM` FOREIGN KEY (`IdMat`) REFERENCES `materijal` (`IdMat`) ON UPDATE CASCADE;

--
-- Constraints for table `slika_namestaj_po_meri`
--
ALTER TABLE `slika_namestaj_po_meri`
  ADD CONSTRAINT `FK_korisnik_slika_poMeri` FOREIGN KEY (`IdKor`) REFERENCES `korisnik` (`IdKor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_NPM_slika` FOREIGN KEY (`IdNPM`) REFERENCES `namestaj_po_meri` (`IdNPM`) ON UPDATE CASCADE;

--
-- Constraints for table `stavka_gotov_namestaj`
--
ALTER TABLE `stavka_gotov_namestaj`
  ADD CONSTRAINT `Fk-STAVKA_ZA_GOTN` FOREIGN KEY (`IdSGN`) REFERENCES `stavka_porudzbine` (`IdSP`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_SGNN` FOREIGN KEY (`IdGN`) REFERENCES `gotov_namestaj` (`IdGN`) ON UPDATE CASCADE;

--
-- Constraints for table `stavka_namestaj_po_meri`
--
ALTER TABLE `stavka_namestaj_po_meri`
  ADD CONSTRAINT `FK_ST_NNPM` FOREIGN KEY (`IDNNPM`) REFERENCES `narucen_namestaj_po_meri` (`IdNNPM`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_STNNPM` FOREIGN KEY (`IdSNPM`) REFERENCES `stavka_porudzbine` (`IdSP`) ON UPDATE CASCADE;

--
-- Constraints for table `stavka_porudzbine`
--
ALTER TABLE `stavka_porudzbine`
  ADD CONSTRAINT `FK_POr_st` FOREIGN KEY (`IdPor`) REFERENCES `porudzbine` (`IdPor`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
