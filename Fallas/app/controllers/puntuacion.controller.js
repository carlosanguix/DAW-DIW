/*
Comandos útiles mongo
    - db.puntuacions.find()
    - db.puntuacions.remove({'ip':'127.0.0.1'})
*/

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

// Obtener una puntuación a partir de dos campos (idFalla, IP)
exports.existe = (req, res) => {
    // Buscamos dicha puntuación
    Puntuacion.find({ "idFalla": req.params.idFalla, "ip": req.params.ip })
        .then(puntuacion => {
            // Devolvemos o la puntuación encontrada o un booleano
            res.send(puntuacion);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error al recuperar un dato a partir de dos campos"
            });
        });
};


// Crear y salvar
exports.create = (req, res) => {

    // Validamos la puntuacion
    if (!req.body) {
        return res.status(400).send({
            message: "La puntuación está vacía o faltan campos"
        });
    }

    // Creamos la nueva puntuación
    const puntuacion = new Puntuacion({
        idFalla: req.body.idFalla,
        ip: req.body.ip,
        puntuacion: req.body.puntuacion
    })

    // Guardamos la puntuación recibida
    puntuacion.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error al crear una nueva puntuación"
            });
        });
};

// Modificar una puntuación en base al id de puntuación
exports.update = (req, res) => {

    // (id, puntuacion)
    let idPuntuacion = { _id: req.params.puntuacionId };
    let nuevaPuntuacion = { puntuacion: req.body.puntuacion };

    Puntuacion.updateOne(idPuntuacion, nuevaPuntuacion)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error al modificar una nueva puntuación"
            });
        });
};