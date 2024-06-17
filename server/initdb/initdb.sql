-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: modular-mariadb:3306
-- Tiempo de generación: 17-06-2024 a las 12:06:24
-- Versión del servidor: 11.4.2-MariaDB-ubu2404
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

create database if not exists Modular
  character set utf8
  collate utf8_spanish_ci;

use Modular;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Modular`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afin`
--

CREATE TABLE IF NOT EXISTS `afin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la especialización',
  `id_profesor` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_especialidad_afin` (`id_especialidad`),
  KEY `fk_id_profesor_afin` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `afin`
--
INSERT INTO `afin` (`id`, `id_profesor`, `id_especialidad`)
SELECT * FROM (SELECT 3, 1, 1) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `afin` WHERE `id` = 3
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciclo`
--

CREATE TABLE IF NOT EXISTS `ciclo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id del ciclo',
  `nombre` varchar(100) NOT NULL COMMENT 'nombre del ciclo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `ciclo`
--
INSERT INTO `ciclo` (`id`, `nombre`)
SELECT * FROM (SELECT 1, 'CS-DAW') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `ciclo` WHERE `id` = 1
);
INSERT INTO `ciclo` (`id`, `nombre`)
SELECT * FROM (SELECT 2, 'CS-DAM') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `ciclo` WHERE `id` = 2
);
INSERT INTO `ciclo` (`id`, `nombre`)
SELECT * FROM (SELECT 3, 'CB-IO') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `ciclo` WHERE `id` = 3
);
INSERT INTO `ciclo` (`id`, `nombre`)
SELECT * FROM (SELECT 4, 'CM-SMR') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `ciclo` WHERE `id` = 4
);
INSERT INTO `ciclo` (`id`, `nombre`)
SELECT * FROM (SELECT 5, 'CS-ASIR') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `ciclo` WHERE `id` = 5
);
INSERT INTO `ciclo` (`id`, `nombre`)
SELECT * FROM (SELECT 6, 'CE-IABD') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `ciclo` WHERE `id` = 6
);
INSERT INTO `ciclo` (`id`, `nombre`)
SELECT * FROM (SELECT 7, 'CE-CS') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `ciclo` WHERE `id` = 7
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE IF NOT EXISTS `departamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id que usaremos nosotros',
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre del instituto',
  `id_instituto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_instituto_departamento` (`id_instituto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `departamento`
--
INSERT INTO `departamento` (`id`, `nombre`, `id_instituto`)
SELECT * FROM (SELECT 1, 'Departamento de Informática', 1) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `departamento` WHERE `id` = 1
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE IF NOT EXISTS `especialidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la especialización',
  `tipo` varchar(100) NOT NULL COMMENT 'Tipo de la especialización',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `especialidad`
--
INSERT INTO `especialidad` (`id`, `tipo`)
SELECT * FROM (SELECT 1, 'Programación') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `especialidad` WHERE `id` = 1
);
INSERT INTO `especialidad` (`id`, `tipo`)
SELECT * FROM (SELECT 2, 'Sistemas') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `especialidad` WHERE `id` = 2
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imparte`
--

CREATE TABLE IF NOT EXISTS `imparte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_profesor` int(11) NOT NULL,
  `id_regimen` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_profesor`,`id_regimen`),
  KEY `fk_id_profesor_imparte` (`id_profesor`),
  KEY `fk_id_regimen_imparte` (`id_regimen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instituto`
--

CREATE TABLE IF NOT EXISTS `instituto` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id que usaremos nosotros',
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre del instituto',
  `email` varchar(100) NOT NULL COMMENT 'Correo de contacto',
  `telefono` int(11) NOT NULL COMMENT 'Número del instituto',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `instituto`
--
INSERT INTO `instituto` (`id`, `nombre`, `email`, `telefono`)
SELECT * FROM (SELECT 1, 'Instituto IES de Teis', '', 886120464) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `instituto` WHERE `id` = 1
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE IF NOT EXISTS `modelo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL DEFAULT curdate(),
  `file` longblob NOT NULL,
  `id_profesor` int(11) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_id_profesor_modelo` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--

CREATE TABLE IF NOT EXISTS `modulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id del módulo',
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre del módulo',
  `id_departamento` int(11) NOT NULL,
  `id_tematica` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_tematica` (`id_tematica`),
  KEY `fk_id_modulo_departamento` (`id_departamento`),
  KEY `fk_id_especialidad` (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `modulo`
--
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 1, 'Implantación de Sistemas Operativos', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 1
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 2, 'Redes Locales', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 2
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 3, 'Fundamentos de Hardware', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 3
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 4, 'Sistemas Operativos Monopuesto', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 4
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 5, 'Aplicaciones Ofimáticas', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 5
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 6, 'Formación y Orientación Laboral', 1, 1, 1) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 6
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 7, 'Empresa e Iniciativa Emprendedora', 1, 1, 1) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 7
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 8, 'Seguridad Informática', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 8
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 9, 'Servicios en Red', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 9
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 10, 'Implantación de Aplicaciones Web', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 10
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 11, 'Administración de Sistemas Gestores de Bases de Datos', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 11
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 12, 'Planificación y Administración de Redes', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 12
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 13, 'Gestión de Bases de Datos', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 13
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 14, 'Lenguajes de Marcas y Sistemas de Gestión de Información', 1, 1, 1) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 14
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 15, 'Administración de Sistemas Operativos', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 15
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 16, 'Fundamentos de Hardware', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 16
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 17, 'Implantación de Sistemas Operativos', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 17
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 18, 'Planificación y Administración de Redes', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 18
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 19, 'Gestión de Bases de Datos', 1, 1, 2) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 19
);
INSERT INTO `modulo` (`id`, `nombre`, `id_departamento`, `id_tematica`, `id_especialidad`)
SELECT * FROM (SELECT 20, 'Programación Básica', 1, 1, 1) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `modulo` WHERE `id` = 20
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE IF NOT EXISTS `profesor` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id del profesor',
  `dni` varchar(9) NOT NULL COMMENT 'DNI del profesor',
  `nombre` varchar(50) NOT NULL COMMENT 'Nombre del profesor',
  `apellido1` varchar(50) NOT NULL COMMENT 'Apellido1 del profesor',
  `apellido2` varchar(50) NOT NULL COMMENT 'Apellido2 del profesor',
  `email` varchar(100) DEFAULT NULL COMMENT 'Correo electrónico del profesor',
  `id_departamento` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_departamento_profesor` (`id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `profesor`
--
INSERT INTO `profesor` (`id`, `dni`, `nombre`, `apellido1`, `apellido2`, `email`, `id_departamento`)
SELECT * FROM (SELECT 1, '000000001', 'Nombre1', 'Apellido1', 'Apellido2', 'email1', 1) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `profesor` WHERE `id` = 1
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regimen`
--

CREATE TABLE IF NOT EXISTS `regimen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `regimen`
--
INSERT INTO `regimen` (`id`, `tipo`)
SELECT * FROM (SELECT 1, 'Ordinario') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `regimen` WHERE `id` = 1
);
INSERT INTO `regimen` (`id`, `tipo`)
SELECT * FROM (SELECT 2, 'Dual') AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM `regimen` WHERE `id` = 2
);
INSERT INTO `regimen` (`id`, `
