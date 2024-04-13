
//Ignoramos el error de CommonJS module ya que estamos en node
const express = require('express'); 
require('dotenv').config();
const { dbConnection } = require('./database/config');


// Crear una instancia/servidor de express
const app = express();


//Base de datos
dbConnection();


//Directorio público
app.use( express.static('public') );


// Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Eventos


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
} )
