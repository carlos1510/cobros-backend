import app from './app';
import sequelize from './config/database';


const PORT = process.env.PORT || 3000;

/*async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
    } finally {
        console.log('Finalizando prueba de conexión.');
      //await sequelize.close(); // Cierra la conexión después de probarla
    }
  }*/

app.listen(PORT, () => {
    sequelize.sync();
    console.log(`Server running on port ${PORT}`);
});