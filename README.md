# Modular

## Index. 

1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Installation](#installation)
6. [Run](#run)
7. [Project Organization](#folders)

## <a name="overview">Overview</a>
Este repositorio contiene el código para crear un programa de asignaión de módulos. Hay que insertar un CSV para la creació en la base de datos de los profesores y los módulos, y se obtiene otro CSV al finalizar la tarea.

## <a name="requirements">Requirements</a>

Este proyecto ha sido desarrollado usando [Vite](https://es.vitejs.dev/guide/).
Así que es necesario instalar `npm` y `node 20`.

## <a name="installation">Installation</a>

Todo lo demás demás librerías que son requeridas puden instalarse usando el comando:

```bash
    npm install
```

## <a name="run">Run</a>

Para poder lanzar la parte del frontend (cliente) sirve con lanzar el siguiente comando:

```
npm run dev
```

## <a name="rundocker">Run with docker</a>
Para poder lanzar la parte del backend (servidor) es necesario crear el contenedor en Docker
Puedes hacerlo con:
```commandline
 docker compose up -d .
```

Una vez creado enciendelo y listo.

## <a name="folders"> Project Organization</a>

This template project contains a python module *example_package*:

```
example_package
├── BBDD
│   ├── MER
│   ├── CSV
|   └── archivos
├── client
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
└──server
   ├── app
   |   ├── app
   |   ├── logs
   |   ├── public
   |   ├── src
   |   ├── test
   |   ├── var
   |   ├── vendor
   │   └── archivos
   ├── config
   │   └── php.ini
   └── logs
```

* *BBDD*: Archivos necesarios para la utlización de la base de datos
* *client*: La parte frontend del proyecto
* *server*: La parte backend del proyecto
* *archivos*: Hace referencia a diferentes archivos que pueden estar dentro de la carpeta

- Cabe recalcar que solo es el esqueleto de la primera capa, dentro de las subcarpetas hay más contenido impotante