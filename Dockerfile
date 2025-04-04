# Use PHP-FPM as base image
FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    vim \
    curl \
    procps \
    net-tools \
    iputils-ping \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install and enable mysqli extension and other PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql && \
    docker-php-ext-enable mysqli

# Create directories
RUN mkdir -p /var/log/nginx && \
    mkdir -p /var/www/html

# Set up PHP configuration
RUN echo "display_errors = On" >> /usr/local/etc/php/conf.d/error-reporting.ini && \
    echo "error_reporting = E_ALL" >> /usr/local/etc/php/conf.d/error-reporting.ini

# Copy Nginx configuration
COPY nginx-site.conf /etc/nginx/conf.d/default.conf

# Remove default nginx configuration
RUN rm -f /etc/nginx/sites-enabled/default

# Copy PHP files
COPY ./src /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html && \
    chown -R www-data:www-data /var/log/nginx && \
    chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]