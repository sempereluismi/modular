-- Insertar datos en la tabla 'tematica'
INSERT INTO tematica (color) VALUES
('#b0f2c2'),
('#fdfd96'),
('#ffcba4'),
('#b0c2f2'),
('#55d6c2'),
('#ffc0cb'),
('#f9b7ff'),
('#ffcba4'),
('#f9b7ff');

-- Insertar datos en la tabla 'instituto'
INSERT INTO instituto (nombre, email, telefono) VALUES
('Instituto IES de Teis', 'info@itcr.com', 123456789),
('Instituto IES da Guía', 'info@sanagustin.com', 987654321);

-- Insertar datos en la tabla 'departamento'
INSERT INTO departamento (nombre, id_instituto) VALUES
('Departamento de Informática', 1);

-- Insertar datos en la tabla 'especialidad'
INSERT INTO especialidad (tipo) VALUES
('Programación'),
('Sistemas');

-- Insertar datos en la tabla 'regimen'
INSERT INTO regimen (tipo, id_departamento) VALUES 
('Ordinario', 1),
('Adulto', 1);

-- Insertar datos en la tabla 'modulo'
INSERT INTO modulo (nombre, id_departamento, id_tematica, id_especialidad) VALUES
('DWCS', 1, 1, 1),
('DWCC', 1, 2, 2),
('DIW', 1, 3, 1),
('DAW', 1, 4, 2);

-- Insertar datos en la tabla 'ciclo'
INSERT INTO ciclo (nombre) VALUES
('DAW'),
('DAM');

-- Insertar datos en la tabla 'regimen_ciclo_modulo'
INSERT INTO regimen_ciclo_modulo (id_regimen, id_ciclo, id_modulo, horas_semanales) VALUES
(1, 1, 1, 10),
(2, 1, 2, 10),
(1, 1, 3, 10),
(1, 2, 4, 8);

-- Insertar datos en la tabla 'profesor'
INSERT INTO profesor (email, password, nombre, fecha_inicio, id_departamento, id_especialidad) VALUES
('marta@iesteis.com', '$2y$10$lcuHHjAN0NuOu0ZW/vSvOuohclx4SaHn/YaFM4EqdEn26KuuRMkGG', 'Marta Rey', '2020-01-15', 1, 1),
('juanca@iesteis.com', '$2y$10$lcuHHjAN0NuOu0ZW/vSvOuohclx4SaHn/YaFM4EqdEn26KuuRMkGG', 'Juan Carlos Pérez', '2019-01-15', 1, 1),
('marcos@iesteis.com', '$2y$10$lcuHHjAN0NuOu0ZW/vSvOuohclx4SaHn/YaFM4EqdEn26KuuRMkGG', 'Marcos Alonso', '2016-09-20', 1, 2),
('adelina@iesteis.com', '$2y$10$lcuHHjAN0NuOu0ZW/vSvOuohclx4SaHn/YaFM4EqdEn26KuuRMkGG', 'Adelina Cobo', '2020-01-15', 1, 1),
('patricia@iesteis.com', '$2y$10$lcuHHjAN0NuOu0ZW/vSvOuohclx4SaHn/YaFM4EqdEn26KuuRMkGG', 'Patricia González', '2018-09-20', 1, 2);


-- Insertar datos en la tabla 'profesor_admin'
INSERT INTO profesor_admin (id_profesor) VALUES
(1),
(3);

-- Insertar datos en la tabla 'imparte'
INSERT INTO imparte (id_profesor, id_regimen) VALUES
(1, 1),
(2, 2);

-- Insertar datos en la tabla 'instituto_profesor'
INSERT INTO instituto_profesor (id_profesor, id_instituto) VALUES
(1, 1),
(2, 1);

-- Insertar datos en la tabla 'modulo_tematica'
INSERT INTO modulo_tematica (id_modulo, id_tematica) VALUES
(1, 1),
(2, 3),
(3, 2);

-- Insertar datos en la tabla 'reduccion'
INSERT INTO reduccion (horas, nombre) VALUES
(4, 'Reducción por experiencia laboral'),
(6, 'Reducción por formación complementaria');

-- Insertar datos en la tabla 'reduccion_profesor'
INSERT INTO reduccion_profesor (id_reduccion, id_profesor) VALUES
(1, 1),
(2, 2);

-- Insertar datos en la tabla 'afin'
INSERT INTO afin (id_profesor, id_especialidad) VALUES
(1, 1),
(2, 2);
