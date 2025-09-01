FROM composer:2.8 AS vendor

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-dev --optimize-autoloader --no-scripts


FROM php:8.4-fpm-alpine

WORKDIR /var/www
RUN apk add --no-cache --virtual .build-deps postgresql-dev \
    && apk add --no-cache libpq \
    && docker-php-ext-install pdo pdo_pgsql \
    && apk del .build-deps

COPY --from=vendor /app/vendor ./vendor
COPY --chown=www-data:www-data . .
RUN mkdir -p /var/www/storage /var/www/bootstrap/cache \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

RUN php artisan config:clear \
    && php artisan route:clear \
    && php artisan config:cache \
    && php artisan route:cache

EXPOSE 9000
USER www-data
CMD ["php-fpm"]
