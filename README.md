# Modular

Proyecto creado por:
* Luis M. Sempere Gómez (@sempereluismi)
* Manuel A. Chaves Herrera (@mmanuch)
* David Villar Durán (@davidvillard)
* Andrea Tena Fernández (@a22andreatf)


## Index. 

- [Modular](#modular)
  - [Index.](#index)
  - [Overview](#overview)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Run with docker in development enviroment](#run-with-docker-in-development-enviroment)
  - [Deployment](#deployment)
  - [ Project Organization](#-project-organization)

## <a name="overview">Overview</a>
Este repositorio contiene el código para crear un programa que permite la repartición de módulos. Hay que insertar un CSV para la creación en la base de datos de los profesores y los módulos; al finalizar la asignación de módulos se obtiene otro CSV.

## <a name="requirements">Requirements</a>

Este proyecto ha sido desarrollado usando [Vite](https://es.vitejs.dev/guide/).
Así que es necesario instalar `npm` y `node 20`.

## <a name="installation">Installation</a>

Todas las demás librerías que son requeridas puden instalarse usando el comando:

```bash
    npm install
```

## <a name="rundocker">Run with docker in development enviroment</a>
Para poder lanzar el proyecto es necesario instalar los contenedores de docker.
Nos situamos en la carpeta principal (modular) y creamos el docker.

Puedes hacerlo con:
```commandline
 docker compose up -d .
```

Una vez creado enciendelo y listo.

Para poder acceder a la parte del frontend (cliente) nos servimos del puerto 80:


## <a name="deployment">Deployment</a>

Limpiar el cache de docker para no llenar la memoria de la máquina 

```
docker container prune -f
docker image prune -a -f
docker volume prune -f
docker network prune -f
```

Lanzar el docker
```
docker compose up -d --force-recreate --build
```

## <a name="folders"> Project Organization</a>


```
├── BBDD
│   ├── MER
│   ├── CSV
|   └── archivos
├── client
│   ├── public
│   ├── archivos
│   └── src
│       ├── assets
│       ├── components
│       ├── context
│       ├── helpers
│       ├── hooks
│       ├── layouts
│       ├── routes
│       ├── views
│       └── archivos
├── server
│   ├── app
│   |   ├── app
│   |   ├── docs
│   |   ├── logs
│   |   ├── public
│   |   ├── src
│   |   ├── test
│   |   ├── var
│   |   ├── vendor
│   │   └── archivos
│   ├── config
│   |   ├── sites-available
│   │   └── php.ini
│   └── Dockerfile
├── .gitignore
├── README.md
└── docker-compose.yml

```

* *BBDD*: Archivos necesarios para la utlización de la base de datos
* *client*: La parte frontend del proyecto
* *server*: La parte backend del proyecto
* *archivos*: Hace referencia a diferentes archivos que pueden estar dentro de la carpeta

Cabe recalcar que este es solo es el esqueleto de la primera capa, dentro de las subcarpetas hay más contenido impotante
