FROM php:latest

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN docker-php-ext-install pdo_mysql && docker-php-ext-install mysqli

WORKDIR /app/backend
COPY . .
RUN composer install

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 && php artisan migrate