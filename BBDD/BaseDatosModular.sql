	drop database if exists Modular;

	create database Modular
		character set utf8
		collate utf8_spanish_ci;
		
	use Modular;

	-- Creación de las tablas

	drop table if exists tematica;
	create table tematica(
		id int not null auto_increment comment 'Id de la temática',
		color varchar(50) comment 'Color de la temática',
		primary key (id)
	)ENGINE=InnoDB;
    
drop table if exists instituto;
	create table instituto(
		id int not null auto_increment comment 'Id que usaremos nosotros',
		nombre varchar(100) not null comment 'Nombre del instituto',
		email varchar(100) not null comment 'Correo de contacto',
		telefono int not null comment 'Número del instituto',
		primary key (id)
	)ENGINE=InnoDB;

	drop table if exists departamento;
	create table departamento(
		id int auto_increment not null comment 'Id que usaremos nosotros',
		nombre varchar(100) not null comment 'Nombre del instituto',
		id_instituto int not null,
		primary key (id),
		constraint `fk_id_instituto_departamento` foreign key (`id_instituto`) references `instituto` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;

	drop table if exists especialidad;
	create table especialidad(
		id int not null comment 'Id de la especialización' auto_increment,
		tipo varchar(100) not null comment 'Tipo de la especialización',
		primary key (id)
	)ENGINE=InnoDB;

	drop table if exists regimen;
	create table regimen(
		id int not null auto_increment comment 'Id del régimen',
		tipo varchar(100) not null comment 'Tipo del régimen ej:Ordinario o Adulto',
        id_departamento int not null,
        constraint fk_id_departamento_regimen foreign key (id_departamento) references departamento (id),
		primary key (id)
	)ENGINE=InnoDB;

	drop table if exists modulo;
	CREATE TABLE modulo(
		id INT NOT NULL AUTO_INCREMENT COMMENT 'Id del módulo',
		nombre VARCHAR(100) NOT NULL COMMENT 'Nombre del módulo',
        id_departamento int not null,
		id_tematica INT NOT NULL,
		id_especialidad INT NOT NULL,
		PRIMARY KEY (id),
		CONSTRAINT fk_id_tematica FOREIGN KEY (id_tematica) REFERENCES tematica (id) ON UPDATE CASCADE,
        CONSTRAINT fk_id_modulo_departamento FOREIGN KEY (id_departamento) REFERENCES departamento (id) ON UPDATE CASCADE,
		CONSTRAINT fk_id_especialidad FOREIGN KEY (id_especialidad) REFERENCES especialidad (id) ON UPDATE CASCADE
	)ENGINE=InnoDB;


	drop table if exists ciclo;
	create table ciclo(
		id int not null auto_increment comment 'Id del ciclo',
		nombre varchar(100) not null comment 'nombre del ciclo',
		primary key (id)
	)ENGINE=InnoDB;



	drop table if exists regimen_ciclo_modulo;
	create table regimen_ciclo_modulo(
		id int not null auto_increment,
		id_regimen int not null,
		id_ciclo int not null,
		id_modulo int not null,
		horas_semanales int not null comment 'Número de horas que se imparten',
		primary key (id, id_regimen, id_ciclo, id_modulo),
		constraint `fk_id_regimen` foreign key (`id_regimen`) references `regimen` (`id`) ON UPDATE CASCADE,
		constraint `fk_id_ciclo` foreign key (`id_ciclo`) references `ciclo` (`id`) ON UPDATE CASCADE,
		constraint `fk_id_modulo` foreign key (`id_modulo`) references `modulo` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;


	drop table if exists profesor;
	create table profesor(
		id int not null auto_increment comment 'Código del profesor',
        email varchar(255) unique not null,
        password varchar(255) not null,
		nombre varchar(100) not null comment 'Nombre del profesor',
		fecha_inicio date not null comment 'Fecha en la que empezó el profesor',
		id_departamento int not null,
        id_especialidad int not null,
		primary key (id),
		constraint `fk_id_departamento_profesor` foreign key (`id_departamento`) references `departamento` (`id`) ON UPDATE CASCADE,
        constraint `fk_id_especialidad_profesor` foreign key (`id_especialidad`) references `especialidad` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;
    
    drop table if exists profesor_admin;
    create table profesor_admin(
		id int not null auto_increment,
        id_profesor int not null,
        
        primary key (id),
        constraint `fk_id_profesor_admin` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE
    )ENGINE=InnoDB;

	drop table if exists imparte;
	create table imparte(
		id int not null auto_increment,
		id_profesor int not null,
		id_regimen int not null,
		primary key (id, id_profesor, id_regimen),
		 constraint `fk_id_profesor_imparte` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE,
		 constraint `fk_id_regimen_imparte` foreign key (`id_regimen`) references `regimen` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;

	drop table if exists instituto_profesor;
	create table instituto_profesor(
		id int not null auto_increment,
		id_profesor int not null,
		id_instituto int not null,
		primary key (id, id_profesor, id_instituto),
		 constraint `fk_id_profesor` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE,
		 constraint `fk_id_instituto` foreign key (`id_instituto`) references `instituto` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;

	drop table if exists modulo_tematica;
	create table modulo_tematica(
		id int not null auto_increment,
		id_modulo int not null,
		id_tematica int not null,
		primary key (id, id_modulo,id_tematica),
		 constraint `fk_id_modulo_mt` foreign key (`id_modulo`) references `modulo` (`id`) ON UPDATE CASCADE,
		 constraint `fk_id_tematica_mt` foreign key (`id_tematica`) references `tematica` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;

	drop table if exists reduccion;
	create table reduccion(
		id int auto_increment not null,
		horas int not null,
		nombre varchar(100) not null,
		primary key (id)
	)ENGINE=InnoDB;

	drop table if exists reduccion_profesor;
	create table reduccion_profesor(
		id int not null auto_increment,
		id_reduccion int not null ,
		id_profesor int not null,
		primary key (id, id_profesor, id_reduccion),
		 constraint `fk_id_profesor_rp` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE,
		 constraint `fk_id_reduccion_rp` foreign key (`id_reduccion`) references `reduccion` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;

	drop table if exists afin;
	create table afin(
		id int auto_increment not null comment 'Id de la especialización',
		id_profesor int not null,
		id_especialidad int not null,
		primary key (id),
		constraint `fk_id_especialidad_afin` foreign key (`id_especialidad`) references `especialidad` (`id`) ON UPDATE CASCADE,
		constraint `fk_id_profesor_afin` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE
	)ENGINE=InnoDB;
    
    drop table if exists profesor_regimen;
    create table profesor_regimen (
		id int auto_increment not null,
        id_profesor int not null unique,
        id_regimen int not null,
		primary key (id),
        constraint fk_id_profesor_profesor_regimen foreign key (id_profesor) references profesor (id),
        constraint fk_id_regimen_profesor_regimen foreign key (id_regimen) references regimen (id)
    );