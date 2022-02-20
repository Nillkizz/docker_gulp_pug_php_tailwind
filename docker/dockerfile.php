FROM php:7.4-apache
RUN pecl install xdebug-2.8.1 \
  && docker-php-ext-enable xdebug

RUN sed -i "s/\(DocumentRoot \/var\/www\/html\)/\1\/dist/" /etc/apache2/sites-enabled/000-default.conf