// Importando librerias
const express = require('express');
const fetch = require("node-fetch");
const path = require('path');

// Inicializamos la app
const app = express();


// Sirviendo ficheros desde el servidor
app.use(express.static(path.join(__dirname,'sirviendo')));


app.listen(3000,()=>{
    console.log(" * Miniserver is Running at 4242");
});
