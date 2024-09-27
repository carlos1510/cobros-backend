# Paso 1
Clona el proyecto del repositorio github
# Paso 2
ingresa al directorio del proyecto clonado, mediante la consola de su sistema operativo
# Paso 3
Instala las dependencias necesarias para el proyecto, mediante el comando npm install
# Paso 4 
  # Duplica el archivo env
  copia el archivo .env.example y renombrar como .env y agregas tus variables de entorno local

  # Duplica el archivo configExample.json
  copia el archivo /src/config/configExample.json y pegas en la misma ruta, luego renombra como /src/config/config.json y agrega tus valores de conexion local para las migraciones

  # Generar modelo de migracion con sequelize
    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

  # Ejecutar la migracion
    
    npx sequelize-cli db:migrate
    
  # Des-hacer una Migración
    - Retroceder la última migración realizada:
      ```bash
      npx sequelize-cli db:migrate:undo
      ```