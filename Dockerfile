# Usa la imagen oficial de PHP 8.2 con Apache sobre Debian Bookworm
FROM php:8.2.12-apache-bookworm

# Actualiza paquetes e instala dependencias mínimas (ej: cliente mysql por si acaso)
# Limpia caché de apt para reducir tamaño de imagen
RUN apt-get update && apt-get upgrade -y && apt-get install -y default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Instala y habilita la extensión mysqli de PHP (necesaria para tu database.php)
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

# Copia el código fuente de la aplicación (preferible COPY sobre ADD para archivos/directorios locales)
COPY ./src /var/www/html/

# Copia el archivo .htaccess (importante si usas reglas de reescritura)
COPY ./src/.htaccess /var/www/html/

# Copia la configuración personalizada de Apache (si la usas)
COPY my-apache-config.conf /etc/apache2/sites-available/

# Configura Apache:
# - Define ServerName para evitar warnings.
# - Habilita módulos necesarios (rewrite, headers).
# - Deshabilita el sitio por defecto.
# - Habilita tu sitio personalizado 'my-apache-config'.
# - IMPORTANTE: NO reinicies Apache aquí. Se iniciará con CMD.
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    a2enmod rewrite headers && \
    a2dissite 000-default && \
    a2ensite my-apache-config

# *** Permiso Clave para Leer Secretos ***
# Agrega el usuario 'www-data' (con el que corre Apache) al grupo 'root'.
# Esto le otorga permiso de lectura sobre los archivos en /run/secrets/,
# que son propiedad de root:root por defecto cuando Docker los monta.
RUN usermod -a -G root www-data

# Cambia la propiedad del directorio web a www-data para que Apache pueda escribir si es necesario
# (ej: uploads, cache). Asegúrate que sea después de copiar los archivos.
RUN chown -R www-data:www-data /var/www/html

# Expone el puerto 80 (estándar para HTTP)
EXPOSE 80

# Comando por defecto para iniciar Apache en primer plano (correcto para Docker)
CMD ["apache2-foreground"]