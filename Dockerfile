# Use the official PHP 8.0 Apache image from Docker Hub
FROM php:8.2.12-apache-bookworm

# Actualizar paquetes e instalar extensiones necesarias
RUN apt-get update && apt-get upgrade -y && \
    docker-php-ext-install mysqli && \
    docker-php-ext-enable mysqli && \
    a2enmod rewrite headers

# Copiar archivos de la aplicación
COPY src/ /var/www/html/
COPY src/.htaccess /var/www/html/
COPY my-apache-config.conf /etc/apache2/sites-available/

# Configurar Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    a2dissite 000-default && \
    a2ensite my-apache-config && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html && \
    find /var/www/html -type f -exec chmod 644 {} \;

# Puerto y healthcheck
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/ || exit 1

# Comando para iniciar Apache
CMD ["apache2-foreground"]