
//Ignoramos el error de CommonJS module ya que estamos en node
const express = require('express'); 
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');


// Crear una instancia/servidor de express
const app = express();


//Base de datos
dbConnection();


//CORS
app.use( cors() );


//Directorio público
app.use( express.static('public') );


// Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Ruta estatic de entrada a la aplicacion
app.get('*', (req, res) => {
    // res.sendFile('/public/index.html', { root: __dirname });
    res.sendFile( __dirname + '/public/index.html' );
} )


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
} )
