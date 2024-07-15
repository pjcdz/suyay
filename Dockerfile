# Use the official PHP 8.0 Apache image from Docker Hub
FROM php:8.0-apache
# Enable Apache mod_rewrite
RUN a2enmod rewrite
# Install wget
RUN apt-get update && apt-get install -y wget
# Copy the local src directory to the container's /var/www/html directory
COPY src/ /var/www/html/
# Copy the .htaccess file to the container's /var/www/html directory
COPY src/.htaccess /var/www/html/
# Copy the custom Apache configuration file to the container's Apache configuration directory
COPY my-apache-config.conf /etc/apache2/sites-available/
# Enable the custom Apache configuration
RUN a2ensite my-apache-config
# Change the ownership of the /var/www/html directory to www-data
RUN chown -R www-data:www-data /var/www/html
# Expone los puertos necesarios
EXPOSE 80 3000