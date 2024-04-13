
const { response } = require('express'); //Esto lo hago para cargar desde memoria el intellisense


const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    //* Hay que asegurarnos que la respuesta solo se envie una vez
    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    });
};

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}

const revalidarToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    });
};


module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario
}