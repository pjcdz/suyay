-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2024 at 06:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `suyay`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password_hash`) VALUES
(1, 'ade', '$2y$10$j3DLwOSe44dAyytfJcZN8u4F2/KiCAeySmWuM/U.18ONpZpqFYQwm');

-- --------------------------------------------------------

--
-- Table structure for table `consultorios`
--

CREATE TABLE `consultorios` (
  `codConsultorio` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultorios`
--

INSERT INTO `consultorios` (`codConsultorio`, `descripcion`) VALUES
(1, 'Consultorio 1'),
(2, 'Consultorio 2'),
(3, 'Consultorio 3'),
(4, 'Consultorio 4'),
(5, 'Consultorio 5'),
(6, 'Consultorio 6');

-- --------------------------------------------------------

--
-- Table structure for table `horas`
--

CREATE TABLE `horas` (
  `codHora` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horas`
--

INSERT INTO `horas` (`codHora`, `descripcion`) VALUES
(10809, 'Lunes 08 - 09'),
(10910, 'Lunes 09 - 10'),
(11011, 'Lunes 10 - 11'),
(11112, 'Lunes 11 - 12'),
(11213, 'Lunes 12 - 13'),
(11314, 'Lunes 13 - 14'),
(11415, 'Lunes 14 - 15'),
(11516, 'Lunes 15 - 16'),
(11617, 'Lunes 16 - 17'),
(11718, 'Lunes 17 - 18'),
(11819, 'Lunes 18 - 19'),
(11920, 'Lunes 19 - 20'),
(12021, 'Lunes 20 - 21'),
(12122, 'Lunes 21 - 22'),
(20809, 'Martes 08 - 09'),
(20910, 'Martes 09 - 10'),
(21011, 'Martes 10 - 11'),
(21112, 'Martes 11 - 12'),
(21213, 'Martes 12 - 13'),
(21314, 'Martes 13 - 14'),
(21415, 'Martes 14 - 15'),
(21516, 'Martes 15 - 16'),
(21617, 'Martes 16 - 17'),
(21718, 'Martes 17 - 18'),
(21819, 'Martes 18 - 19'),
(21920, 'Martes 19 - 20'),
(22021, 'Martes 20 - 21'),
(22122, 'Martes 21 - 22'),
(30809, 'Miércoles 08 - 09'),
(30910, 'Miércoles 09 - 10'),
(31011, 'Miércoles 10 - 11'),
(31112, 'Miércoles 11 - 12'),
(31213, 'Miércoles 12 - 13'),
(31314, 'Miércoles 13 - 14'),
(31415, 'Miércoles 14 - 15'),
(31516, 'Miércoles 15 - 16'),
(31617, 'Miércoles 16 - 17'),
(31718, 'Miércoles 17 - 18'),
(31819, 'Miércoles 18 - 19'),
(31920, 'Miércoles 19 - 20'),
(32021, 'Miércoles 20 - 21'),
(32122, 'Miércoles 21 - 22'),
(40809, 'Jueves 08 - 09'),
(40910, 'Jueves 09 - 10'),
(41011, 'Jueves 10 - 11'),
(41112, 'Jueves 11 - 12'),
(41213, 'Jueves 12 - 13'),
(41314, 'Jueves 13 - 14'),
(41415, 'Jueves 14 - 15'),
(41516, 'Jueves 15 - 16'),
(41617, 'Jueves 16 - 17'),
(41718, 'Jueves 17 - 18'),
(41819, 'Jueves 18 - 19'),
(41920, 'Jueves 19 - 20'),
(42021, 'Jueves 20 - 21'),
(42122, 'Jueves 21 - 22'),
(50809, 'Viernes 08 - 09'),
(50910, 'Viernes 09 - 10'),
(51011, 'Viernes 10 - 11'),
(51112, 'Viernes 11 - 12'),
(51213, 'Viernes 12 - 13'),
(51314, 'Viernes 13 - 14'),
(51415, 'Viernes 14 - 15'),
(51516, 'Viernes 15 - 16'),
(51617, 'Viernes 16 - 17'),
(51718, 'Viernes 17 - 18'),
(51819, 'Viernes 18 - 19'),
(51920, 'Viernes 19 - 20'),
(52021, 'Viernes 20 - 21'),
(52122, 'Viernes 21 - 22'),
(60809, 'Sábado 08 - 09'),
(60910, 'Sábado 09 - 10'),
(61011, 'Sábado 10 - 11'),
(61112, 'Sábado 11 - 12'),
(61213, 'Sábado 12 - 13'),
(61314, 'Sábado 13 - 14'),
(61415, 'Sábado 14 - 15'),
(61516, 'Sábado 15 - 16'),
(61617, 'Sábado 16 - 17'),
(61718, 'Sábado 17 - 18'),
(61819, 'Sábado 18 - 19'),
(61920, 'Sábado 19 - 20'),
(62021, 'Sábado 20 - 21'),
(62122, 'Sábado 21 - 22');

-- --------------------------------------------------------

--
-- Table structure for table `horasalquiladas`
--

CREATE TABLE `horasalquiladas` (
  `codConsultorio` int(11) NOT NULL,
  `codHora` int(11) NOT NULL,
  `dni` int(11) DEFAULT NULL,
  `isOcupado` tinyint(1) DEFAULT NULL,
  `isPagado` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horasalquiladas`
--

INSERT INTO `horasalquiladas` (`codConsultorio`, `codHora`, `dni`, `isOcupado`, `isPagado`) VALUES
(1, 10809, 0, 0, 0),
(1, 10910, 0, 0, 0),
(1, 11011, 0, 0, 0),
(1, 11112, 0, 0, 0),
(1, 11213, 0, 0, 0),
(1, 11314, 0, 0, 0),
(1, 11415, 0, 0, 0),
(1, 11516, 0, 0, 0),
(1, 11617, 0, 0, 0),
(1, 11718, 0, 0, 0),
(1, 11819, 0, 0, 0),
(1, 11920, 0, 0, 0),
(1, 12021, 0, 0, 0),
(1, 12122, 0, 0, 0),
(1, 20809, 0, 0, 0),
(1, 20910, 0, 0, 0),
(1, 21011, 0, 0, 0),
(1, 21112, 0, 0, 0),
(1, 21213, 0, 0, 0),
(1, 21314, 0, 0, 0),
(1, 21415, 0, 0, 0),
(1, 21516, 0, 0, 0),
(1, 21617, 0, 0, 0),
(1, 21718, 0, 0, 0),
(1, 21819, 0, 0, 0),
(1, 21920, 0, 0, 0),
(1, 22021, 0, 0, 0),
(1, 22122, 0, 0, 0),
(1, 30809, 0, 0, 0),
(1, 30910, 0, 0, 0),
(1, 31011, 0, 0, 0),
(1, 31112, 0, 0, 0),
(1, 31213, 0, 0, 0),
(1, 31314, 0, 0, 0),
(1, 31415, 0, 0, 0),
(1, 31516, 0, 0, 0),
(1, 31617, 0, 0, 0),
(1, 31718, 0, 0, 0),
(1, 31819, 0, 0, 0),
(1, 31920, 0, 0, 0),
(1, 32021, 0, 0, 0),
(1, 32122, 0, 0, 0),
(1, 40809, 0, 0, 0),
(1, 40910, 0, 0, 0),
(1, 41011, 0, 0, 0),
(1, 41112, 0, 0, 0),
(1, 41213, 0, 0, 0),
(1, 41314, 0, 0, 0),
(1, 41415, 0, 0, 0),
(1, 41516, 0, 0, 0),
(1, 41617, 0, 0, 0),
(1, 41718, 0, 0, 0),
(1, 41819, 0, 0, 0),
(1, 41920, 0, 0, 0),
(1, 42021, 0, 0, 0),
(1, 42122, 0, 0, 0),
(1, 50809, 0, 0, 0),
(1, 50910, 0, 0, 0),
(1, 51011, 0, 0, 0),
(1, 51112, 0, 0, 0),
(1, 51213, 0, 0, 0),
(1, 51314, 0, 0, 0),
(1, 51415, 0, 0, 0),
(1, 51516, 0, 0, 0),
(1, 51617, 0, 0, 0),
(1, 51718, 0, 0, 0),
(1, 51819, 0, 0, 0),
(1, 51920, 0, 0, 0),
(1, 52021, 0, 0, 0),
(1, 52122, 0, 0, 0),
(1, 60809, 0, 0, 0),
(1, 60910, 0, 0, 0),
(1, 61011, 0, 0, 0),
(1, 61112, 0, 0, 0),
(1, 61213, 0, 0, 0),
(1, 61314, 0, 0, 0),
(1, 61415, 0, 0, 0),
(1, 61516, 0, 0, 0),
(1, 61617, 0, 0, 0),
(1, 61718, 0, 0, 0),
(1, 61819, 0, 0, 0),
(1, 61920, 0, 0, 0),
(1, 62021, 0, 0, 0),
(1, 62122, 0, 0, 0),
(2, 10809, 0, 0, 0),
(2, 10910, 0, 0, 0),
(2, 11011, 0, 0, 0),
(2, 11112, 0, 0, 0),
(2, 11213, 0, 0, 0),
(2, 11314, 0, 0, 0),
(2, 11415, 0, 0, 0),
(2, 11516, 0, 0, 0),
(2, 11617, 0, 0, 0),
(2, 11718, 0, 0, 0),
(2, 11819, 0, 0, 0),
(2, 11920, 0, 0, 0),
(2, 12021, 0, 0, 0),
(2, 12122, 0, 0, 0),
(2, 20809, 0, 0, 0),
(2, 20910, 0, 0, 0),
(2, 21011, 0, 0, 0),
(2, 21112, 0, 0, 0),
(2, 21213, 0, 0, 0),
(2, 21314, 0, 0, 0),
(2, 21415, 0, 0, 0),
(2, 21516, 0, 0, 0),
(2, 21617, 0, 0, 0),
(2, 21718, 0, 0, 0),
(2, 21819, 0, 0, 0),
(2, 21920, 0, 0, 0),
(2, 22021, 0, 0, 0),
(2, 22122, 0, 0, 0),
(2, 30809, 0, 0, 0),
(2, 30910, 0, 0, 0),
(2, 31011, 0, 0, 0),
(2, 31112, 0, 0, 0),
(2, 31213, 0, 0, 0),
(2, 31314, 0, 0, 0),
(2, 31415, 0, 0, 0),
(2, 31516, 0, 0, 0),
(2, 31617, 0, 0, 0),
(2, 31718, 0, 0, 0),
(2, 31819, 0, 0, 0),
(2, 31920, 0, 0, 0),
(2, 32021, 0, 0, 0),
(2, 32122, 0, 0, 0),
(2, 40809, 0, 0, 0),
(2, 40910, 0, 0, 0),
(2, 41011, 0, 0, 0),
(2, 41112, 0, 0, 0),
(2, 41213, 0, 0, 0),
(2, 41314, 0, 0, 0),
(2, 41415, 0, 0, 0),
(2, 41516, 0, 0, 0),
(2, 41617, 0, 0, 0),
(2, 41718, 0, 0, 0),
(2, 41819, 0, 0, 0),
(2, 41920, 0, 0, 0),
(2, 42021, 0, 0, 0),
(2, 42122, 0, 0, 0),
(2, 50809, 0, 0, 0),
(2, 50910, 0, 0, 0),
(2, 51011, 0, 0, 0),
(2, 51112, 0, 0, 0),
(2, 51213, 0, 0, 0),
(2, 51314, 0, 0, 0),
(2, 51415, 0, 0, 0),
(2, 51516, 0, 0, 0),
(2, 51617, 0, 0, 0),
(2, 51718, 0, 0, 0),
(2, 51819, 0, 0, 0),
(2, 51920, 0, 0, 0),
(2, 52021, 0, 0, 0),
(2, 52122, 0, 0, 0),
(2, 60809, 0, 0, 0),
(2, 60910, 0, 0, 0),
(2, 61011, 0, 0, 0),
(2, 61112, 0, 0, 0),
(2, 61213, 0, 0, 0),
(2, 61314, 0, 0, 0),
(2, 61415, 0, 0, 0),
(2, 61516, 0, 0, 0),
(2, 61617, 0, 0, 0),
(2, 61718, 0, 0, 0),
(2, 61819, 0, 0, 0),
(2, 61920, 0, 0, 0),
(2, 62021, 0, 0, 0),
(2, 62122, 0, 0, 0),
(3, 10809, 0, 0, 0),
(3, 10910, 0, 0, 0),
(3, 11011, 0, 0, 0),
(3, 11112, 0, 0, 0),
(3, 11213, 0, 0, 0),
(3, 11314, 0, 0, 0),
(3, 11415, 0, 0, 0),
(3, 11516, 0, 0, 0),
(3, 11617, 0, 0, 0),
(3, 11718, 0, 0, 0),
(3, 11819, 0, 0, 0),
(3, 11920, 0, 0, 0),
(3, 12021, 0, 0, 0),
(3, 12122, 0, 0, 0),
(3, 20809, 0, 0, 0),
(3, 20910, 0, 0, 0),
(3, 21011, 0, 0, 0),
(3, 21112, 0, 0, 0),
(3, 21213, 0, 0, 0),
(3, 21314, 0, 0, 0),
(3, 21415, 0, 0, 0),
(3, 21516, 0, 0, 0),
(3, 21617, 0, 0, 0),
(3, 21718, 0, 0, 0),
(3, 21819, 0, 0, 0),
(3, 21920, 0, 0, 0),
(3, 22021, 0, 0, 0),
(3, 22122, 0, 0, 0),
(3, 30809, 0, 0, 0),
(3, 30910, 0, 0, 0),
(3, 31011, 0, 0, 0),
(3, 31112, 0, 0, 0),
(3, 31213, 0, 0, 0),
(3, 31314, 0, 0, 0),
(3, 31415, 0, 0, 0),
(3, 31516, 0, 0, 0),
(3, 31617, 0, 0, 0),
(3, 31718, 0, 0, 0),
(3, 31819, 0, 0, 0),
(3, 31920, 0, 0, 0),
(3, 32021, 0, 0, 0),
(3, 32122, 0, 0, 0),
(3, 40809, 0, 0, 0),
(3, 40910, 0, 0, 0),
(3, 41011, 0, 0, 0),
(3, 41112, 0, 0, 0),
(3, 41213, 0, 0, 0),
(3, 41314, 0, 0, 0),
(3, 41415, 0, 0, 0),
(3, 41516, 0, 0, 0),
(3, 41617, 0, 0, 0),
(3, 41718, 0, 0, 0),
(3, 41819, 0, 0, 0),
(3, 41920, 0, 0, 0),
(3, 42021, 0, 0, 0),
(3, 42122, 0, 0, 0),
(3, 50809, 0, 0, 0),
(3, 50910, 0, 0, 0),
(3, 51011, 0, 0, 0),
(3, 51112, 0, 0, 0),
(3, 51213, 0, 0, 0),
(3, 51314, 0, 0, 0),
(3, 51415, 0, 0, 0),
(3, 51516, 0, 0, 0),
(3, 51617, 0, 0, 0),
(3, 51718, 0, 0, 0),
(3, 51819, 0, 0, 0),
(3, 51920, 0, 0, 0),
(3, 52021, 0, 0, 0),
(3, 52122, 0, 0, 0),
(3, 60809, 0, 0, 0),
(3, 60910, 0, 0, 0),
(3, 61011, 0, 0, 0),
(3, 61112, 0, 0, 0),
(3, 61213, 0, 0, 0),
(3, 61314, 0, 0, 0),
(3, 61415, 0, 0, 0),
(3, 61516, 0, 0, 0),
(3, 61617, 0, 0, 0),
(3, 61718, 0, 0, 0),
(3, 61819, 0, 0, 0),
(3, 61920, 0, 0, 0),
(3, 62021, 0, 0, 0),
(3, 62122, 0, 0, 0),
(4, 10809, 0, 0, 0),
(4, 10910, 0, 0, 0),
(4, 11011, 0, 0, 0),
(4, 11112, 0, 0, 0),
(4, 11213, 0, 0, 0),
(4, 11314, 0, 0, 0),
(4, 11415, 0, 0, 0),
(4, 11516, 0, 0, 0),
(4, 11617, 0, 0, 0),
(4, 11718, 0, 0, 0),
(4, 11819, 0, 0, 0),
(4, 11920, 0, 0, 0),
(4, 12021, 0, 0, 0),
(4, 12122, 0, 0, 0),
(4, 20809, 0, 0, 0),
(4, 20910, 0, 0, 0),
(4, 21011, 0, 0, 0),
(4, 21112, 0, 0, 0),
(4, 21213, 0, 0, 0),
(4, 21314, 0, 0, 0),
(4, 21415, 0, 0, 0),
(4, 21516, 0, 0, 0),
(4, 21617, 0, 0, 0),
(4, 21718, 0, 0, 0),
(4, 21819, 0, 0, 0),
(4, 21920, 0, 0, 0),
(4, 22021, 0, 0, 0),
(4, 22122, 0, 0, 0),
(4, 30809, 0, 0, 0),
(4, 30910, 0, 0, 0),
(4, 31011, 0, 0, 0),
(4, 31112, 0, 0, 0),
(4, 31213, 0, 0, 0),
(4, 31314, 0, 0, 0),
(4, 31415, 0, 0, 0),
(4, 31516, 0, 0, 0),
(4, 31617, 0, 0, 0),
(4, 31718, 0, 0, 0),
(4, 31819, 0, 0, 0),
(4, 31920, 0, 0, 0),
(4, 32021, 0, 0, 0),
(4, 32122, 0, 0, 0),
(4, 40809, 0, 0, 0),
(4, 40910, 0, 0, 0),
(4, 41011, 0, 0, 0),
(4, 41112, 0, 0, 0),
(4, 41213, 0, 0, 0),
(4, 41314, 0, 0, 0),
(4, 41415, 0, 0, 0),
(4, 41516, 0, 0, 0),
(4, 41617, 0, 0, 0),
(4, 41718, 0, 0, 0),
(4, 41819, 0, 0, 0),
(4, 41920, 0, 0, 0),
(4, 42021, 0, 0, 0),
(4, 42122, 0, 0, 0),
(4, 50809, 0, 0, 0),
(4, 50910, 0, 0, 0),
(4, 51011, 0, 0, 0),
(4, 51112, 0, 0, 0),
(4, 51213, 0, 0, 0),
(4, 51314, 0, 0, 0),
(4, 51415, 0, 0, 0),
(4, 51516, 0, 0, 0),
(4, 51617, 0, 0, 0),
(4, 51718, 0, 0, 0),
(4, 51819, 0, 0, 0),
(4, 51920, 0, 0, 0),
(4, 52021, 0, 0, 0),
(4, 52122, 0, 0, 0),
(4, 60809, 0, 0, 0),
(4, 60910, 0, 0, 0),
(4, 61011, 0, 0, 0),
(4, 61112, 0, 0, 0),
(4, 61213, 0, 0, 0),
(4, 61314, 0, 0, 0),
(4, 61415, 0, 0, 0),
(4, 61516, 0, 0, 0),
(4, 61617, 0, 0, 0),
(4, 61718, 0, 0, 0),
(4, 61819, 0, 0, 0),
(4, 61920, 0, 0, 0),
(4, 62021, 0, 0, 0),
(4, 62122, 0, 0, 0),
(5, 10809, 0, 0, 0),
(5, 10910, 0, 0, 0),
(5, 11011, 0, 0, 0),
(5, 11112, 0, 0, 0),
(5, 11213, 0, 0, 0),
(5, 11314, 0, 0, 0),
(5, 11415, 0, 0, 0),
(5, 11516, 0, 0, 0),
(5, 11617, 0, 0, 0),
(5, 11718, 0, 0, 0),
(5, 11819, 0, 0, 0),
(5, 11920, 0, 0, 0),
(5, 12021, 0, 0, 0),
(5, 12122, 0, 0, 0),
(5, 20809, 0, 0, 0),
(5, 20910, 0, 0, 0),
(5, 21011, 0, 0, 0),
(5, 21112, 0, 0, 0),
(5, 21213, 0, 0, 0),
(5, 21314, 0, 0, 0),
(5, 21415, 0, 0, 0),
(5, 21516, 0, 0, 0),
(5, 21617, 0, 0, 0),
(5, 21718, 0, 0, 0),
(5, 21819, 0, 0, 0),
(5, 21920, 0, 0, 0),
(5, 22021, 0, 0, 0),
(5, 22122, 0, 0, 0),
(5, 30809, 0, 0, 0),
(5, 30910, 0, 0, 0),
(5, 31011, 0, 0, 0),
(5, 31112, 0, 0, 0),
(5, 31213, 0, 0, 0),
(5, 31314, 0, 0, 0),
(5, 31415, 0, 0, 0),
(5, 31516, 0, 0, 0),
(5, 31617, 0, 0, 0),
(5, 31718, 0, 0, 0),
(5, 31819, 0, 0, 0),
(5, 31920, 0, 0, 0),
(5, 32021, 0, 0, 0),
(5, 32122, 0, 0, 0),
(5, 40809, 0, 0, 0),
(5, 40910, 0, 0, 0),
(5, 41011, 0, 0, 0),
(5, 41112, 0, 0, 0),
(5, 41213, 0, 0, 0),
(5, 41314, 0, 0, 0),
(5, 41415, 0, 0, 0),
(5, 41516, 0, 0, 0),
(5, 41617, 0, 0, 0),
(5, 41718, 0, 0, 0),
(5, 41819, 0, 0, 0),
(5, 41920, 0, 0, 0),
(5, 42021, 0, 0, 0),
(5, 42122, 0, 0, 0),
(5, 50809, 0, 0, 0),
(5, 50910, 0, 0, 0),
(5, 51011, 0, 0, 0),
(5, 51112, 0, 0, 0),
(5, 51213, 0, 0, 0),
(5, 51314, 0, 0, 0),
(5, 51415, 0, 0, 0),
(5, 51516, 0, 0, 0),
(5, 51617, 0, 0, 0),
(5, 51718, 0, 0, 0),
(5, 51819, 0, 0, 0),
(5, 51920, 0, 0, 0),
(5, 52021, 0, 0, 0),
(5, 52122, 0, 0, 0),
(5, 60809, 0, 0, 0),
(5, 60910, 0, 0, 0),
(5, 61011, 0, 0, 0),
(5, 61112, 0, 0, 0),
(5, 61213, 0, 0, 0),
(5, 61314, 0, 0, 0),
(5, 61415, 0, 0, 0),
(5, 61516, 0, 0, 0),
(5, 61617, 0, 0, 0),
(5, 61718, 0, 0, 0),
(5, 61819, 0, 0, 0),
(5, 61920, 0, 0, 0),
(5, 62021, 0, 0, 0),
(5, 62122, 0, 0, 0),
(6, 10809, 0, 0, 0),
(6, 10910, 0, 0, 0),
(6, 11011, 0, 0, 0),
(6, 11112, 0, 0, 0),
(6, 11213, 0, 0, 0),
(6, 11314, 0, 0, 0),
(6, 11415, 0, 0, 0),
(6, 11516, 0, 0, 0),
(6, 11617, 0, 0, 0),
(6, 11718, 0, 0, 0),
(6, 11819, 0, 0, 0),
(6, 11920, 0, 0, 0),
(6, 12021, 0, 0, 0),
(6, 12122, 0, 0, 0),
(6, 20809, 0, 0, 0),
(6, 20910, 0, 0, 0),
(6, 21011, 0, 0, 0),
(6, 21112, 0, 0, 0),
(6, 21213, 0, 0, 0),
(6, 21314, 0, 0, 0),
(6, 21415, 0, 0, 0),
(6, 21516, 0, 0, 0),
(6, 21617, 0, 0, 0),
(6, 21718, 0, 0, 0),
(6, 21819, 0, 0, 0),
(6, 21920, 0, 0, 0),
(6, 22021, 0, 0, 0),
(6, 22122, 0, 0, 0),
(6, 30809, 0, 0, 0),
(6, 30910, 0, 0, 0),
(6, 31011, 0, 0, 0),
(6, 31112, 0, 0, 0),
(6, 31213, 0, 0, 0),
(6, 31314, 0, 0, 0),
(6, 31415, 0, 0, 0),
(6, 31516, 0, 0, 0),
(6, 31617, 0, 0, 0),
(6, 31718, 0, 0, 0),
(6, 31819, 0, 0, 0),
(6, 31920, 0, 0, 0),
(6, 32021, 0, 0, 0),
(6, 32122, 0, 0, 0),
(6, 40809, 0, 0, 0),
(6, 40910, 0, 0, 0),
(6, 41011, 0, 0, 0),
(6, 41112, 0, 0, 0),
(6, 41213, 0, 0, 0),
(6, 41314, 0, 0, 0),
(6, 41415, 0, 0, 0),
(6, 41516, 0, 0, 0),
(6, 41617, 0, 0, 0),
(6, 41718, 0, 0, 0),
(6, 41819, 0, 0, 0),
(6, 41920, 0, 0, 0),
(6, 42021, 0, 0, 0),
(6, 42122, 0, 0, 0),
(6, 50809, 0, 0, 0),
(6, 50910, 0, 0, 0),
(6, 51011, 0, 0, 0),
(6, 51112, 0, 0, 0),
(6, 51213, 0, 0, 0),
(6, 51314, 0, 0, 0),
(6, 51415, 0, 0, 0),
(6, 51516, 0, 0, 0),
(6, 51617, 0, 0, 0),
(6, 51718, 0, 0, 0),
(6, 51819, 0, 0, 0),
(6, 51920, 0, 0, 0),
(6, 52021, 0, 0, 0),
(6, 52122, 0, 0, 0),
(6, 60809, 0, 0, 0),
(6, 60910, 0, 0, 0),
(6, 61011, 0, 0, 0),
(6, 61112, 0, 0, 0),
(6, 61213, 0, 0, 0),
(6, 61314, 0, 0, 0),
(6, 61415, 0, 0, 0),
(6, 61516, 0, 0, 0),
(6, 61617, 0, 0, 0),
(6, 61718, 0, 0, 0),
(6, 61819, 0, 0, 0),
(6, 61920, 0, 0, 0),
(6, 62021, 0, 0, 0),
(6, 62122, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `personas`
--

CREATE TABLE `personas` (
  `dni` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `credito` int(11) DEFAULT NULL,
  `deuda` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personas`
--

INSERT INTO `personas` (`dni`, `nombre`, `credito`, `deuda`) VALUES
(0, '', 0, 0),
(45178142, 'Pablo Cardozo', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consultorios`
--
ALTER TABLE `consultorios`
  ADD PRIMARY KEY (`codConsultorio`);

--
-- Indexes for table `horas`
--
ALTER TABLE `horas`
  ADD PRIMARY KEY (`codHora`);

--
-- Indexes for table `horasalquiladas`
--
ALTER TABLE `horasalquiladas`
  ADD PRIMARY KEY (`codConsultorio`,`codHora`);

--
-- Indexes for table `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`dni`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
