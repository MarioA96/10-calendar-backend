

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

// MongoDB crea una coleccion llamada usuarios, si no existe la crea, si existe la usa
// Se deberia llamar Usuario, pero MongoDB lo pluraliza
module.exports = model('Usuario', UsuarioSchema); 