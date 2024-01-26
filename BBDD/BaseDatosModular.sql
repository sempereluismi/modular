-- Creación de la base de datos

drop database Institutos;

create database Institutos
	character set utf8
	collate utf8_spanish_ci;
    
use Institutos;

-- Creación de las tablas

drop table if exists tematica;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table tematica(
	id int not null auto_increment comment 'Id de la temática',
	color varchar(20) comment 'Color de la temática',
	primary key (id)
)ENGINE=InnoDB;

drop table if exists especializacion;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table especializacion(
	id int not null auto_increment comment 'Id de la especialización',
	tipo varchar(20) not null comment 'Tipo de la especialización',
	primary key (id)
)ENGINE=InnoDB;

drop table if exists modulo;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table modulo(
	id int not null auto_increment comment 'Id del módulo',
	nombre varchar(20) not null comment 'Nombre del módulo',
    horas_adulto int not null comment 'Número de horas que se imparten en adulto',
    horas_ordinario int not null comment 'Número de horas que se imparten en ordinario',
    id_tematica int not null ,
    id_especializacion int not null,
    primary key (id),
    constraint `fk_id_tematica` foreign key (`id_tematica`) references `tematica` (`id`) ON UPDATE CASCADE,
	constraint `fk_id_especializacion` foreign key (`id_especializacion`) references `especializacion` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists ciclo;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table ciclo(
	id int not null auto_increment comment 'Id del ciclo',
	nombre varchar(20) not null comment 'nombre del ciclo',
    primary key (id)
)ENGINE=InnoDB;

drop table if exists regimen;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table regimen(
	id int not null auto_increment comment 'Id del régimen',
	tipo varchar(20) not null comment 'Tipo del régimen ej:Ordinario o Adulto',
    primary key (id)
)ENGINE=InnoDB;

drop table if exists relaciones;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table relaciones(
	id int not null,
	id_regimen int not null,
    id_ciclo int not null,
    id_modulo int not null,
    primary key (id)
    -- primary key (id_regimen,id_ciclo,id_módulo),
    -- constraint `fk_id_regimen` foreign key (`id_regimen`) references `regimen` (`id`) ON UPDATE CASCADE,
    -- constraint `fk_id_ciclo` foreign key (`id_ciclo`) references `ciclo` (`id`) ON UPDATE CASCADE,
    -- constraint `fk_id_modulo` foreign key (`id_regimen`) references `regimen` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;

drop table if exists instituto;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table instituto(
	id int not null auto_increment comment 'Id que usaremos nosotros',
	nombre varchar(50) not null comment 'Nombre del instituto',
    email varchar(50) not null comment 'Correo de contacto',
    telefono int not null comment 'Número del instituto',
    id_admin int not null comment 'Codigo del adminitrador',
	primary key (id)
)ENGINE=InnoDB;

drop table if exists profesor;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table profesor(
	id int not null auto_increment comment 'Código del profesor',
	nombre varchar(50) not null comment 'Nombre del profesor',
	fecha_inicio date not null comment 'Fecha en la que empezó el profesor',
    tipo varchar(20) not null,
    id_especializacion int not null,
	primary key (id)
)ENGINE=InnoDB;

drop table if exists imparte;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table imparte(
    id_profesor int not null,
    id_regimen int not null,
    primary key (id_profesor,id_regimen),
     constraint `fk_id_profesor` foreign key (`id_profesor`) references `profesor` (`id`) ON UPDATE CASCADE,
	 constraint `fk_id_regimen` foreign key (`id_regimen`) references `regimen` (`id`) ON UPDATE CASCADE
)ENGINE=InnoDB;