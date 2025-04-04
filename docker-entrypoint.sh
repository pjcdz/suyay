#!/bin/sh
set -e

# Start PHP-FPM
php-fpm -D

# Start Nginx in foreground mode
nginx -g 'daemon off;'