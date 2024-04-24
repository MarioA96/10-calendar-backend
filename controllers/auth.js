
const { response } = require('express'); //Esto lo hago para cargar desde memoria el intellisense
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email }); //Esto es para buscar un usuario en la base de datos
        
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        usuario = new Usuario( req.body ); //Esto es para crear una nueva instancia de usuario

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync(10); //Esto es para generar un salt - para la encriptacion aleatoria
        usuario.password = bcrypt.hashSync( password, salt ); //Esto es para encriptar la contraseña

       
        await usuario.save(); // Promesa, esto es para guardar en la base de datos


        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name ); //Esto es para generar el token


        //* Hay que asegurarnos que la respuesta solo se envie una vez
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email }); //Esto es para buscar un usuario en la base de datos
        
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password ); //Esto es para comparar la contraseña

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id, usuario.name ); //Esto es para generar el token


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    // Generamos un nuevo JWT y lo retornamos en la respuesta/peticion
    const token = await generarJWT( uid, name ); //Esto es para generar el token

    res.json({
        ok: true,
        uid,
        name,
        token
    });
};


module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario
}