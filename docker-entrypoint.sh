#!/bin/sh
set -e

echo "Starting container..."

# Ensure proper permissions
echo "Setting permissions..."
chmod -R 755 /var/www/html
chown -R www-data:www-data /var/www/html

# Create log directory if it doesn't exist
mkdir -p /var/log/nginx
chown -R www-data:www-data /var/log/nginx

# Display directory contents for debugging
echo "Contents of web root directory:"
ls -la /var/www/html

# Start PHP-FPM
echo "Starting PHP-FPM..."
php-fpm -D

# Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

# Start Nginx in foreground mode
echo "Starting Nginx..."
exec nginx -g 'daemon off;'