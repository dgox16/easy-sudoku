FROM composer:2 as builder

WORKDIR /app
COPY . .

RUN composer install --no-interaction --no-plugins --no-scripts --no-dev --prefer-dist

FROM php:8.2-fpm-alpine

WORKDIR /var/www

RUN apk add --no-cache postgresql-dev
RUN docker-php-ext-install pdo pdo_pgsql

COPY --from=builder /app .

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
