module.exports = (app) => {
    
    const puntuaciones = require('../controllers/puntuacion.controller.js');

    // Crear una nueva puntuacion
    app.post('/puntuaciones', puntuaciones.create);

    // Obtener todas las puntuaciones
    app.get('/puntuaciones', puntuaciones.findAll);

    // Obtener una sola puntuación por su ID
    //app.get('/puntuaciones/:puntuacionId', puntuaciones.findOne);

    // Modificar una puntuación por su ID
    //app.put('/puntuaciones/:puntuacionId', puntuaciones.update);

    // Eliminar una puntuación por su ID
    //app.delete('/puntuaciones/:puntuacionId', puntuaciones.delete);
}