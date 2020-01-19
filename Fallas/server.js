/*****************/
/* Palabras clave*/
/* -MONGO        */
/*****************/

// Importando librerias
const express = require('express');
const path = require('path');
const proj4 = require('proj4');

// MONGO
const bodyParser = require('body-parser');

// Inicializamos la app
const app = express();

// MONGO Conexión a la BBDD
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');


// MONGO Parseamos las peticiones
app.use(bodyParser.urlencoded({
    extended: true
}));


// MONGO Parseamos lo jsons
app.use(bodyParser.json());

// MONGO Otra cosa.....
mongoose.Promise = global.Promise;

// MONGO Conexión
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log(" * BDD Mongo cargada");
}).catch(err => {
    console.log(" Error en la conexión con la BBDD : ", err);
    process.exit();
});

// MONGO Vamos a definir un "punto de inicio"
app.get('/api/', (req, res) => {
    res.json({ "message": "API de MongoFallero" });
});

// Sirviendo ficheros desde el servidor
app.use(express.static(path.join(__dirname, 'sirviendo')));

// Require Puntuaciones routes
require('./app/routes/puntuaciones.routes.js')(app);

// Puerto de escucha
app.listen(3000, () => {
    console.log(" * Corriendo en el puerto 3000");
});
