# Usa una imagen base que soporte Docker Compose
FROM docker/compose:1.29.2

# Copia tu código de la aplicación al contenedor
COPY . /app

# Define el directorio de trabajo
WORKDIR /app

# Instala cualquier dependencia específica si es necesario
# RUN npm install

# Expone los puertos necesarios
EXPOSE 80

# Comando por defecto para ejecutar tu aplicación
CMD ["docker-compose", "up"]
