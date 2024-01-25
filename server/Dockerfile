FROM php:8.2-apache AS build-php

RUN --mount=type=cache,target=/var/cache/apt apt update && apt full-upgrade -qy && apt clean -qy && apt autoremove -qy
RUN mount=type=cache,target='/usr/local/lib/php' \
  pecl install xdebug \
  && docker-php-ext-enable xdebug
RUN docker-php-ext-install mysqli pdo_mysql && docker-php-ext-enable mysqli pdo_mysql
