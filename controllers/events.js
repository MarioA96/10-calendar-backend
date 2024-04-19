

// const Event = require('../models/Evento');
const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    //Aqui podemos hacer la paginacion
    const eventos = await Evento.find()
                                .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    });

};

const crearEvento = async (req, res = response) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;

    try {
        
        const evento = await Evento.findById( eventoId );

        //Verificar si el evento existe
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            });
        }

        //Verificar si el evento pertenece al usuario
        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        };

        // { new: true } -> Para que devuelva el evento actualizado
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
        res.json({
            ok: true,
            evento: eventoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};


const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;

    try {
        
        const evento = await Evento.findById( eventoId );

        //Verificar si el evento existe
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id'
            });
        }

        //Verificar si el evento pertenece al usuario
        if ( evento.user.toString() !== req.uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId );
        res.json({
            ok: true,
            'msg': 'Evento eliminado'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};