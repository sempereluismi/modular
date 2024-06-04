FROM php:8.2-apache AS build-php

# Use cache for apt packages
RUN --mount=type=cache,target=/var/cache/apt apt update && apt full-upgrade -qy && apt clean -qy && apt autoremove -qy


# Install required extensions
RUN pecl install xdebug \
&& docker-php-ext-enable xdebug
RUN docker-php-ext-install mysqli pdo_mysql && docker-php-ext-enable mysqli pdo_mysql

# Install Doxygen
RUN apt-get update && apt-get install -y doxygen graphviz nano && apt-get clean -qy && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Expose the port
EXPOSE 80

