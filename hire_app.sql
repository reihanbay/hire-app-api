-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Okt 2020 pada 19.19
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hire_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `experience`
--

CREATE TABLE `experience` (
  `idExperience` int(11) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `workPosition` varchar(50) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `idWorker` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `hire`
--

CREATE TABLE `hire` (
  `idHire` int(11) NOT NULL,
  `projectJob` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `statusConfirm` tinyint(1) NOT NULL,
  `dateConfirm` date NOT NULL,
  `price` int(200) NOT NULL,
  `idWorker` int(11) NOT NULL,
  `idProject` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `portfolio`
--

CREATE TABLE `portfolio` (
  `idPortfolio` int(11) NOT NULL,
  `namePortfolio` varchar(100) NOT NULL,
  `linkRepository` varchar(200) NOT NULL,
  `typePortfolio` enum('mobile','web') NOT NULL,
  `image` varchar(200) NOT NULL,
  `idWorker` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `projects`
--

CREATE TABLE `projects` (
  `idProject` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `nameProject` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `deadline` date NOT NULL,
  `idRecruiter` int(11) NOT NULL,
  `idWorker` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `recruiter`
--

CREATE TABLE `recruiter` (
  `idRecruiter` int(11) NOT NULL,
  `nameRecruiter` varchar(100) NOT NULL,
  `nameCompany` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `sectorCompany` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(200) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `linkedin` varchar(100) NOT NULL,
  `website` varchar(100) NOT NULL,
  `idAccount` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `skill`
--

CREATE TABLE `skill` (
  `idSkill` int(11) NOT NULL,
  `idWorker` int(11) NOT NULL,
  `skill` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `idAccount` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `noHp` int(20) NOT NULL,
  `role` enum('admin','recruiter','worker') NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `worker`
--

CREATE TABLE `worker` (
  `idWorker` int(11) NOT NULL,
  `nameWorker` varchar(100) NOT NULL,
  `jobTitle` varchar(100) NOT NULL,
  `statusJob` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `workPlace` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL,
  `idAccount` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`idExperience`),
  ADD KEY `idWorker` (`idWorker`);

--
-- Indeks untuk tabel `hire`
--
ALTER TABLE `hire`
  ADD PRIMARY KEY (`idHire`),
  ADD KEY `idProject` (`idProject`),
  ADD KEY `idWorker` (`idWorker`);

--
-- Indeks untuk tabel `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`idPortfolio`),
  ADD KEY `idWorker` (`idWorker`);

--
-- Indeks untuk tabel `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`idProject`),
  ADD KEY `idWorker` (`idWorker`),
  ADD KEY `idRecruiter` (`idRecruiter`);

--
-- Indeks untuk tabel `recruiter`
--
ALTER TABLE `recruiter`
  ADD PRIMARY KEY (`idRecruiter`),
  ADD KEY `idAccount` (`idAccount`);

--
-- Indeks untuk tabel `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`idSkill`),
  ADD KEY `idWorker` (`idWorker`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idAccount`);

--
-- Indeks untuk tabel `worker`
--
ALTER TABLE `worker`
  ADD PRIMARY KEY (`idWorker`),
  ADD KEY `idAccount` (`idAccount`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `experience`
--
ALTER TABLE `experience`
  MODIFY `idExperience` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `hire`
--
ALTER TABLE `hire`
  MODIFY `idHire` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `idPortfolio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `projects`
--
ALTER TABLE `projects`
  MODIFY `idProject` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `recruiter`
--
ALTER TABLE `recruiter`
  MODIFY `idRecruiter` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `skill`
--
ALTER TABLE `skill`
  MODIFY `idSkill` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `idAccount` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `worker`
--
ALTER TABLE `worker`
  MODIFY `idWorker` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`idWorker`) REFERENCES `worker` (`idWorker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `hire`
--
ALTER TABLE `hire`
  ADD CONSTRAINT `hire_ibfk_1` FOREIGN KEY (`idWorker`) REFERENCES `worker` (`idWorker`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hire_ibfk_2` FOREIGN KEY (`idProject`) REFERENCES `projects` (`idProject`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`idWorker`) REFERENCES `worker` (`idWorker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`idRecruiter`) REFERENCES `recruiter` (`idRecruiter`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`idWorker`) REFERENCES `worker` (`idWorker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `recruiter`
--
ALTER TABLE `recruiter`
  ADD CONSTRAINT `recruiter_ibfk_1` FOREIGN KEY (`idAccount`) REFERENCES `user` (`idAccount`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`idWorker`) REFERENCES `worker` (`idWorker`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `worker`
--
ALTER TABLE `worker`
  ADD CONSTRAINT `worker_ibfk_1` FOREIGN KEY (`idAccount`) REFERENCES `user` (`idAccount`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
