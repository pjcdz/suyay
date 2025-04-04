#!/bin/sh
set -e

echo "Starting container..."

# Ensure proper permissions
echo "Setting permissions..."
chown -R www-data:www-data /var/www/html
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f -exec chmod 644 {} \;

# List files to verify
echo "Checking web root contents..."
ls -la /var/www/html

# Start PHP-FPM
echo "Starting PHP-FPM..."
php-fpm -D

# Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

# Start Nginx in foreground mode
echo "Starting Nginx..."
nginx -g 'daemon off;'