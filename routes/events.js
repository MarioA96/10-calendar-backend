/*
    Rutas de Usuarios / Auth
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/valiar-jwt");

const router = Router();


// Todas tienen que pasar por la validacion del JWT
// Podemos subir de nivel la validacion del JWT
// Todas las rutas que esten abajo de esta linea, tienen que pasar por la validacion del JWT
// Y las demas rutas que esten por encima de esta linea, no tienen que pasar por la validacion del JWT
router.use( validarJWT ); 

//Obtener Eventos
router.get(
    '/', 
    getEventos
);

//Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

//Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
);

//Borrar evento
router.delete(
    '/:id',
    eliminarEvento
);

module.exports = router;