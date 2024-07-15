# Use the official PHP 8.0 Apache image from Docker Hub
FROM php:8.2.12-apache-bookworm
# Enable Apache mod_rewrite
RUN a2enmod rewrite

RUN apt-get update && apt upgrade -y

# Install and enable mysqli extension
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

ADD ./src /var/www/html
# Set ServerName directive globally

# Copy the .htaccess file to the container's /var/www/html directory
COPY src/.htaccess /var/www/html/
# Copy the custom Apache configuration file to the container's Apache configuration directory
COPY my-apache-config.conf /etc/apache2/sites-available/
# Enable the custom Apache configuration
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf &&\
    a2enmod rewrite &&\
    a2enmod headers &&\
    a2enmod rewrite &&\
    a2dissite 000-default &&\
    a2ensite my-apache-config &&\
    service apache2 restart

# Change the ownership of the /var/www/html directory to www-data
RUN chown -R www-data:www-data /var/www/html
# Expose the necessary ports
EXPOSE 80 3000