const Puntuacion = require('../models/puntuacion.model.js');

// Obtener todas las puntuaciones (no la utilizaremos)
exports.findAll = (req, res) => {

    Puntuacion.find().then(puntuaciones => {
        res.send(puntuaciones);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al recuperar todos los datos"
        });
    });
};

// Obtener una puntuación a partir de dos campos (diFalla, IP)
exports.existe = (req, res) => {

    console.info(req.params.idFalla);
    console.info(req.params.ip);

    // Buscamos dicha puntuación
    Puntuacion.find({ "idFalla": req.params.idFalla, "ip": req.params.ip })
        .then(puntuacion => {
            // Devolvemos o la puntuación encontrada o un booleano
            res.send(puntuacion._id);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar un dato a partir de dos campos"
            });
        });
};

// Crear y salvar
exports.create = (req, res) => {

    console.log(req.body);

    // Validamos el puntuacion
    if (!req.body) {
        console.log(req.body);
        return res.status(400).send({
            message: "La puntuación está vacía o faltan campos"
        });
    }

    // Después de validar la puntuación debemos preguntarle a la BBDD si ya existe ese campo que queremos introducir



    // En caso de que no exista, lo introducimos
    // Guardamos la puntuación recibida
    puntuacion.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error al crear una nueva puntuación"
        });
    });

    // En caso de que si exista...
    // ...Buscar esa coincidencia y modificarla en base a la id de la puntuación



    // En cualquiera de los dos casos, debemos devolver la puntuación y modificarsela al cliente (modificar las estrellas)...
    // ... Tal vez no es necesario porque el cliente la modifica antes de validarla (está bien).



    /* En principio esto no lo necesitamos ya porque la puntuación recibida o es correcta o no la introducimos.
    const puntuacion = new Puntuacion({
        idFalla: req.body.idFalla || "idFallaVacio",
        ip: req.body.ip || "127.0.0.1",
        puntuacion: req.body.puntuacion || 42
    })*/
};

// Modificar una puntuación en base al id de puntuación
exports.update = (req, res) => {


};