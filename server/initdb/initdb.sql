-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
-- Servidor: modular-mariadb:3306
-- Tiempo de generación: 17-06-2024 a las 12:06:24
-- Versión del servidor: 11.4.2-MariaDB-ubu2404
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

drop database if exists Modular;

create database Modular
	character set utf8
	collate utf8_spanish_ci;
	
use Modular;

--
-- Base de datos: Modular
--
-- Estructura de tabla para la tabla afin
CREATE TABLE afin (
id int(11) NOT NULL COMMENT 'Id de la especialización',
id_profesor int(11) NOT NULL,
id_especialidad int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla afin
INSERT INTO afin (id, id_profesor, id_especialidad) VALUES
(3, 1, 1);

--
-- Estructura de tabla para la tabla ciclo
CREATE TABLE ciclo (
id int(11) NOT NULL COMMENT 'Id del ciclo',
nombre varchar(100) NOT NULL COMMENT 'nombre del ciclo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla ciclo
INSERT INTO ciclo (id, nombre) VALUES
(1, 'CS-DAW'),
(2, 'CS-DAM'),
(3, 'CB-IO'),
(4, 'CM-SMR'),
(5, 'CS-ASIR'),
(6, 'CE-IABD'),
(7, 'CE-CS');

--
-- Estructura de tabla para la tabla departamento
CREATE TABLE departamento (
id int(11) NOT NULL COMMENT 'Id que usaremos nosotros',
nombre varchar(100) NOT NULL COMMENT 'Nombre del instituto',
id_instituto int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla departamento
INSERT INTO departamento (id, nombre, id_instituto) VALUES
(1, 'Departamento de Informática', 1);

--
-- Estructura de tabla para la tabla especialidad
CREATE TABLE especialidad (
id int(11) NOT NULL COMMENT 'Id de la especialización',
tipo varchar(100) NOT NULL COMMENT 'Tipo de la especialización'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla especialidad
INSERT INTO especialidad (id, tipo) VALUES
(1, 'Programación'),
(2, 'Sistemas');

--
-- Estructura de tabla para la tabla imparte
CREATE TABLE imparte (
id int(11) NOT NULL,
id_profesor int(11) NOT NULL,
id_regimen int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Estructura de tabla para la tabla instituto
CREATE TABLE instituto (
id int(11) NOT NULL COMMENT 'Id que usaremos nosotros',
nombre varchar(100) NOT NULL COMMENT 'Nombre del instituto',
email varchar(100) NOT NULL COMMENT 'Correo de contacto',
telefono int(11) NOT NULL COMMENT 'Número del instituto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla instituto
INSERT INTO instituto (id, nombre, email, telefono) VALUES
(1, 'Instituto IES de Teis', '', 886120464);

--
-- Estructura de tabla para la tabla modelo
CREATE TABLE modelo (
id int(11) NOT NULL,
nombre varchar(100) NOT NULL DEFAULT curdate(),
file longblob NOT NULL,
id_profesor int(11) NOT NULL,
create_date datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Estructura de tabla para la tabla modulo
CREATE TABLE modulo (
id int(11) NOT NULL COMMENT 'Id del módulo',
nombre varchar(100) NOT NULL COMMENT 'Nombre del módulo',
id_departamento int(11) NOT NULL,
id_tematica int(11) NOT NULL,
id_especialidad int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla modulo
INSERT INTO modulo (id, nombre, id_departamento, id_tematica, id_especialidad) VALUES
(1, 'DAW', 1, 1, 1);

--
-- Estructura de tabla para la tabla modulo_tematica
CREATE TABLE modulo_tematica (
id int(11) NOT NULL,
id_modulo int(11) NOT NULL,
id_tematica int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla modulo_tematica
INSERT INTO modulo_tematica (id, id_modulo, id_tematica) VALUES
(1, 1, 1);

--
-- Estructura de tabla para la tabla profesor
CREATE TABLE profesor (
id int(11) NOT NULL COMMENT 'Código del profesor',
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
nombre varchar(100) NOT NULL COMMENT 'Nombre del profesor',
fecha_inicio date NOT NULL COMMENT 'Fecha en la que empezó el profesor',
id_departamento int(11) NOT NULL,
id_especialidad int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla profesor
INSERT INTO profesor (id, email, password, nombre, fecha_inicio, id_departamento, id_especialidad) VALUES
(1, 'admin@admin.com', '$2y$10$lcuHHjAN0NuOu0ZW/vSvOuohclx4SaHn/YaFM4EqdEn26KuuRMkGG', 'admin', '2020-01-15', 1, 1);

--
-- Estructura de tabla para la tabla profesor_admin
CREATE TABLE profesor_admin (
id int(11) NOT NULL,
id_profesor int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla profesor_admin
INSERT INTO profesor_admin (id, id_profesor) VALUES
(1, 1);

--
-- Estructura de tabla para la tabla profesor_regimen
CREATE TABLE profesor_regimen (
id int(11) NOT NULL,
id_profesor int(11) NOT NULL,
id_regimen int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Estructura de tabla para la tabla reduccion
CREATE TABLE reduccion (
id int(11) NOT NULL,
horas int(11) NOT NULL,
nombre varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Estructura de tabla para la tabla reduccion_profesor
CREATE TABLE reduccion_profesor (
id int(11) NOT NULL,
id_reduccion int(11) NOT NULL,
id_profesor int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Estructura de tabla para la tabla regimen
CREATE TABLE regimen (
id int(11) NOT NULL COMMENT 'Id del régimen',
tipo varchar(100) NOT NULL COMMENT 'Tipo del régimen ej
o Adulto',
id_departamento int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla regimen
INSERT INTO regimen (id, tipo, id_departamento) VALUES
(1, 'Ordinario', 1),
(2, 'Adulto', 1);

--
-- Estructura de tabla para la tabla regimen_ciclo_modulo
CREATE TABLE regimen_ciclo_modulo (
id int(11) NOT NULL,
id_regimen int(11) NOT NULL,
id_ciclo int(11) NOT NULL,
id_modulo int(11) NOT NULL,
horas_semanales int(11) NOT NULL COMMENT 'Número de horas que se imparten'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla regimen_ciclo_modulo
INSERT INTO regimen_ciclo_modulo (id, id_regimen, id_ciclo, id_modulo, horas_semanales) VALUES
(6, 1, 1, 1, 5);

--
-- Estructura de tabla para la tabla tematica
CREATE TABLE tematica (
id int(11) NOT NULL COMMENT 'Id de la temática',
color varchar(50) DEFAULT NULL COMMENT 'Color de la temática'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla tematica
INSERT INTO tematica (id, color) VALUES
(1, '#b0f2c2'),
(2, '#fdfd96'),
(3, '#ffcba4'),
(4, '#b0c2f2'),
(5, '#55d6c2'),
(6, '#ffc0cb'),
(7, '#f9b7ff'),
(8, '#ffcba4'),
(9, '#f9b7ff');

--
-- Índices para tablas volcadas
--
-- Indices de la tabla afin
ALTER TABLE afin
ADD PRIMARY KEY (id),
ADD KEY fk_id_especialidad_afin (id_especialidad),
ADD KEY fk_id_profesor_afin (id_profesor);

--
-- Indices de la tabla ciclo
ALTER TABLE ciclo
ADD PRIMARY KEY (id);

--
-- Indices de la tabla departamento
ALTER TABLE departamento
ADD PRIMARY KEY (id),
ADD KEY fk_id_instituto_departamento (id_instituto);

--
-- Indices de la tabla especialidad
ALTER TABLE especialidad
ADD PRIMARY KEY (id);

--
-- Indices de la tabla imparte
ALTER TABLE imparte
ADD PRIMARY KEY (id,id_profesor,id_regimen),
ADD KEY fk_id_profesor_imparte (id_profesor),
ADD KEY fk_id_regimen_imparte (id_regimen);

--
-- Indices de la tabla instituto
ALTER TABLE instituto
ADD PRIMARY KEY (id);

--
-- Indices de la tabla modelo
ALTER TABLE modelo
ADD PRIMARY KEY (id),
ADD KEY fk_id_profesor_modelo (id_profesor);

--
-- Indices de la tabla modulo
ALTER TABLE modulo
ADD PRIMARY KEY (id),
ADD KEY fk_id_tematica (id_tematica),
ADD KEY fk_id_modulo_departamento (id_departamento),
ADD KEY fk_id_especialidad (id_especialidad);

--
-- Indices de la tabla modulo_tematica
ALTER TABLE modulo_tematica
ADD PRIMARY KEY (id,id_modulo,id_tematica),
ADD KEY fk_id_modulo_mt (id_modulo),
ADD KEY fk_id_tematica_mt (id_tematica);

--
-- Indices de la tabla profesor
ALTER TABLE profesor
ADD PRIMARY KEY (id),
ADD UNIQUE KEY email (email),
ADD KEY fk_id_departamento_profesor (id_departamento),
ADD KEY fk_id_especialidad_profesor (id_especialidad);

--
-- Indices de la tabla profesor_admin
ALTER TABLE profesor_admin
ADD PRIMARY KEY (id),
ADD KEY fk_id_profesor_admin (id_profesor);

--
-- Indices de la tabla profesor_regimen
ALTER TABLE profesor_regimen
ADD PRIMARY KEY (id),
ADD UNIQUE KEY id_profesor (id_profesor),
ADD KEY fk_id_regimen_profesor_regimen (id_regimen);

--
-- Indices de la tabla reduccion
ALTER TABLE reduccion
ADD PRIMARY KEY (id);

--
-- Indices de la tabla reduccion_profesor
ALTER TABLE reduccion_profesor
ADD PRIMARY KEY (id,id_profesor,id_reduccion),
ADD KEY fk_id_profesor_rp (id_profesor),
ADD KEY fk_id_reduccion_rp (id_reduccion);

--
-- Indices de la tabla regimen
ALTER TABLE regimen
ADD PRIMARY KEY (id),
ADD KEY fk_id_departamento_regimen (id_departamento);

--
-- Indices de la tabla regimen_ciclo_modulo
ALTER TABLE regimen_ciclo_modulo
ADD PRIMARY KEY (id,id_regimen,id_ciclo,id_modulo),
ADD KEY fk_id_regimen (id_regimen),
ADD KEY fk_id_ciclo (id_ciclo),
ADD KEY fk_id_modulo (id_modulo);

--
-- Indices de la tabla tematica
ALTER TABLE tematica
ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT de las tablas volcadas
--
-- AUTO_INCREMENT de la tabla afin
ALTER TABLE afin
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la especialización', AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla ciclo
ALTER TABLE ciclo
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id del ciclo', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla departamento
ALTER TABLE departamento
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id que usaremos nosotros', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla especialidad
ALTER TABLE especialidad
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la especialización', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla imparte
ALTER TABLE imparte
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla instituto
ALTER TABLE instituto
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id que usaremos nosotros', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla modelo
ALTER TABLE modelo
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla modulo
ALTER TABLE modulo
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id del módulo', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla modulo_tematica
ALTER TABLE modulo_tematica
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla profesor
ALTER TABLE profesor
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Código del profesor', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla profesor_admin
ALTER TABLE profesor_admin
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla profesor_regimen
ALTER TABLE profesor_regimen
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla reduccion
ALTER TABLE reduccion
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla reduccion_profesor
ALTER TABLE reduccion_profesor
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla regimen
ALTER TABLE regimen
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id del régimen', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla regimen_ciclo_modulo
ALTER TABLE regimen_ciclo_modulo
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla tematica
ALTER TABLE tematica
MODIFY id int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la temática', AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--
-- Filtros para la tabla afin
ALTER TABLE afin
ADD CONSTRAINT fk_id_especialidad_afin FOREIGN KEY (id_especialidad) REFERENCES especialidad (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_profesor_afin FOREIGN KEY (id_profesor) REFERENCES profesor (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla departamento
ALTER TABLE departamento
ADD CONSTRAINT fk_id_instituto_departamento FOREIGN KEY (id_instituto) REFERENCES instituto (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla imparte
ALTER TABLE imparte
ADD CONSTRAINT fk_id_profesor_imparte FOREIGN KEY (id_profesor) REFERENCES profesor (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_regimen_imparte FOREIGN KEY (id_regimen) REFERENCES regimen (id) ON UPDATE CASCADE;
-- Filtros para la tabla modelo
ALTER TABLE modelo
ADD CONSTRAINT fk_id_profesor_modelo FOREIGN KEY (id_profesor) REFERENCES profesor (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla modulo
ALTER TABLE modulo
ADD CONSTRAINT fk_id_especialidad FOREIGN KEY (id_especialidad) REFERENCES especialidad (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_modulo_departamento FOREIGN KEY (id_departamento) REFERENCES departamento (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_tematica FOREIGN KEY (id_tematica) REFERENCES tematica (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla modulo_tematica
ALTER TABLE modulo_tematica
ADD CONSTRAINT fk_id_modulo_mt FOREIGN KEY (id_modulo) REFERENCES modulo (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_tematica_mt FOREIGN KEY (id_tematica) REFERENCES tematica (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla profesor
ALTER TABLE profesor
ADD CONSTRAINT fk_id_departamento_profesor FOREIGN KEY (id_departamento) REFERENCES departamento (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_especialidad_profesor FOREIGN KEY (id_especialidad) REFERENCES especialidad (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla profesor_admin
ALTER TABLE profesor_admin
ADD CONSTRAINT fk_id_profesor_admin FOREIGN KEY (id_profesor) REFERENCES profesor (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla profesor_regimen
ALTER TABLE profesor_regimen
ADD CONSTRAINT fk_id_profesor_profesor_regimen FOREIGN KEY (id_profesor) REFERENCES profesor (id),
ADD CONSTRAINT fk_id_regimen_profesor_regimen FOREIGN KEY (id_regimen) REFERENCES regimen (id);

--
-- Filtros para la tabla reduccion_profesor
ALTER TABLE reduccion_profesor
ADD CONSTRAINT fk_id_profesor_rp FOREIGN KEY (id_profesor) REFERENCES profesor (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_reduccion_rp FOREIGN KEY (id_reduccion) REFERENCES reduccion (id) ON UPDATE CASCADE;

--
-- Filtros para la tabla regimen
ALTER TABLE regimen
ADD CONSTRAINT fk_id_departamento_regimen FOREIGN KEY (id_departamento) REFERENCES departamento (id);

--
-- Filtros para la tabla regimen_ciclo_modulo
ALTER TABLE regimen_ciclo_modulo
ADD CONSTRAINT fk_id_ciclo FOREIGN KEY (id_ciclo) REFERENCES ciclo (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_modulo FOREIGN KEY (id_modulo) REFERENCES modulo (id) ON UPDATE CASCADE,
ADD CONSTRAINT fk_id_regimen FOREIGN KEY (id_regimen) REFERENCES regimen (id) ON UPDATE CASCADE;
COMMIT;
