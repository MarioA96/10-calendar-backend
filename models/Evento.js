

const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});


EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

// MongoDB crea una coleccion llamada eventos, si no existe la crea, si existe la usa
// Se deberia llamar Evento, pero MongoDB lo pluraliza
module.exports = model('Evento', EventoSchema); 
