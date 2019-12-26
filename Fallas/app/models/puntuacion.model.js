const mongoose= require('mongoose');

// Declaramos la estructura interna de la base de datos
const PuntuacionSchema = mongoose.Schema({
    idFalla:String,
    ip:String,
    puntuacion:Number
},{
    timestamps:true
});


module.exports = mongoose.model('Puntuacion',PuntuacionSchema);
