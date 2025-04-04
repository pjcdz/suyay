# Use PHP-FPM as base image
FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    vim \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install and enable mysqli extension
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

# Copy Nginx configuration
COPY nginx-site.conf /etc/nginx/conf.d/default.conf

# Create web directory
RUN mkdir -p /var/www/html

# Copy PHP files
COPY ./src /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && find /var/www/html -type f -exec chmod 644 {} \;

# Expose port 80
EXPOSE 80

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Start Nginx and PHP-FPM
ENTRYPOINT ["docker-entrypoint.sh"]