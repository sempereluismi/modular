-- Creación de la base de datos

drop database if exists Institutos;

create database Institutos
	character set utf8
	collate utf8_spanish_ci;
    
use Institutos;

-- Creación de las tablas

drop table if exists tematica;
create table tematica(
	id int not null auto_increment comment 'Id de la temática',
	color varchar(50) comment 'Color de la temática',
	primary key (id)
)ENGINE=InnoDB;

drop table if exists especializacion;
create table especializacion(
	id int not null comment 'Id de la especialización',
	tipo varchar(100) not null comment 'Tipo de la especialización',
	primary key (id)
)ENGINE=InnoDB;

drop table if exists modulo;
create table modulo(
	id int not null auto_increment comment 'Id del módulo',
	nombre varchar(100) not null comment 'Nombre del módulo',
    descripción varchar(200) not null comment 'Descripción del módulo',
    id_tematica int not null ,
    id_especializacion int not null,
    primary key (id),
    constraint `fk_id_tematica` foreign key (`id_tematica`) references `tematica` (`id`) ON UPDATE CASCADE,
	constraint `fk_id_especializacion` foreign key (`id_especializacion`) references `especializacion` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists ciclo;
create table ciclo(
	id int not null auto_increment comment 'Id del ciclo',
	nombre varchar(100) not null comment 'nombre del ciclo',
    primary key (id)
)ENGINE=InnoDB;

drop table if exists regimen;
create table regimen(
	id int not null auto_increment comment 'Id del régimen',
	tipo varchar(100) not null comment 'Tipo del régimen ej:Ordinario o Adulto',
    primary key (id)
)ENGINE=InnoDB;

drop table if exists regimen_ciclo_modulo;
create table regimen_ciclo_modulo(
	id_regimen int not null,
    id_ciclo int not null,
    id_modulo int not null,
    horas_semanales int not null comment 'Número de horas que se imparten',
    primary key (id_regimen,id_ciclo,id_modulo),
	constraint `fk_id_regimen` foreign key (`id_regimen`) references `regimen` (`id`) ON UPDATE CASCADE,
	constraint `fk_id_ciclo` foreign key (`id_ciclo`) references `ciclo` (`id`) ON UPDATE CASCADE,
	constraint `fk_id_modulo` foreign key (`id_modulo`) references `modulo` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists instituto;
create table instituto(
	id int not null comment 'Id que usaremos nosotros',
	nombre varchar(100) not null comment 'Nombre del instituto',
    email varchar(100) not null comment 'Correo de contacto',
    telefono int not null comment 'Número del instituto',
	primary key (id)
)ENGINE=InnoDB;

drop table if exists profesor;
create table profesor(
	id int not null comment 'Código del profesor',
	nombre varchar(100) not null comment 'Nombre del profesor',
	fecha_inicio date not null comment 'Fecha en la que empezó el profesor',
    tipo varchar(100) not null,
    id_especializacion int not null,
    id_instituto int not null,
	primary key (id),
    constraint `fk_id_instituto_profesor` foreign key (`id_instituto`) references `instituto` (`id`) ON UPDATE CASCADE,
    constraint `fk_id_especializacion_profesor` foreign key (`id_especializacion`) references `especializacion` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists imparte;
create table imparte(
    id_profesor int not null,
    id_regimen int not null,
    primary key (id_profesor,id_regimen),
     constraint `fk_id_profesor_imparte` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE,
	 constraint `fk_id_regimen_imparte` foreign key (`id_regimen`) references `regimen` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists instituto_profesor;
create table instituto_profesor(
    id_profesor int not null,
    id_instituto int not null,
    primary key (id_profesor, id_instituto),
     constraint `fk_id_profesor` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE,
	 constraint `fk_id_instituto` foreign key (`id_instituto`) references `instituto` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists modulo_tematica;
create table modulo_tematica(
    id_modulo int not null,
    id_tematica int not null,
    primary key (id_modulo,id_tematica),
     constraint `fk_id_modulo_mt` foreign key (`id_modulo`) references `modulo` (`id`) ON UPDATE CASCADE,
	 constraint `fk_id_tematica_mt` foreign key (`id_tematica`) references `tematica` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists reduccion;
create table reduccion(
    id int auto_increment not null,
    horas varchar(100) not null,
    nombre int not null,
    primary key (id)
)ENGINE=InnoDB;

drop table if exists reduccion_profesor;
create table reduccion_profesor(
    id_reduccion int not null,
    id_profesor int not null,
    primary key (id_profesor, id_reduccion),
     constraint `fk_id_profesor_rp` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE,
	 constraint `fk_id_reduccion_rp` foreign key (`id_reduccion`) references `reduccion` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;
