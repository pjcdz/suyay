# Use the official PHP 8.0 Apache image from Docker Hub
FROM php:8.2.12-apache-bookworm
# Enable Apache mod_rewrite
RUN a2enmod rewrite

RUN apt-get update && apt upgrade -y

# Install and enable mysqli extension
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

# Crear directorio web y copiar archivos
RUN mkdir -p /var/www/html
COPY src/ /var/www/html/

# Copy the .htaccess file to the container's /var/www/html directory
COPY src/.htaccess /var/www/html/
# Copy the custom Apache configuration file to the container's Apache configuration directory
COPY my-apache-config.conf /etc/apache2/sites-available/
# Enable the custom Apache configuration
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf &&\
    a2enmod rewrite &&\
    a2enmod headers &&\
    a2dissite 000-default &&\
    a2ensite my-apache-config &&\
    service apache2 restart

# Fix permissions to ensure Apache can access all files
RUN chown -R www-data:www-data /var/www/html &&\
    chmod -R 755 /var/www/html &&\
    find /var/www/html -type f -exec chmod 644 {} \;

# Configurar shell script para ajustar permisos al inicio del contenedor
COPY <<-"EOF" /docker-entrypoint-custom.sh
#!/bin/bash
set -e
# Aplicar permisos adecuados a los archivos montados
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html
find /var/www/html -type f -exec chmod 644 {} \;

# No crear archivos de redirección adicionales para evitar bucles
echo "Verificando configuración para evitar bucles de redirección..."

# Ejecutar Apache en primer plano
exec apache2-foreground
EOF

RUN chmod +x /docker-entrypoint-custom.sh

# Expose the necessary ports
EXPOSE 80

# Healthcheck para que Coolify pueda monitorear el estado del contenedor
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

# Usar el script personalizado como punto de entrada
ENTRYPOINT ["/docker-entrypoint-custom.sh"]