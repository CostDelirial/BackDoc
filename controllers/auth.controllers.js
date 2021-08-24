const { response } = require('express');
const crypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');

const {getMenuFrontEnd} = require('../helpers/menu-frontend');


const login = async (req, res = response) => {
    const { control, password } = req.body;

    try {
        //verificar control
        const usuarioDB = await Usuario.findOne({ control });
      

        if (!usuarioDB) {
            return res.status(404).json({ ok: false, msg: 'El usuario no existe' })
        }

        // verificar contraseña
        const validPassword = crypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({ ok: false, msg: 'La contraseña es incorrecta' })
        }

        //verificar que este activo el usuario
        if( usuarioDB.status === 'DESACTIVADO'){
            return res.status(302).json({ ok: false, msg: 'Comunicate con el Admin no estas activo en sistema'});
        }

        //generar token JWT
        const token = await generarJWT(usuarioDB.id,usuarioDB.nombre,usuarioDB.control, usuarioDB.status,usuarioDB.role );



        return res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role),
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Comunicate con el Administrador' });
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////
//              renovar token
////////////////////////////////////////////////////////////////////////////////////////////////

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    //]Obtener usuario por UID
const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        token,
        usuario
    });

}

module.exports = {
    login,
    renewToken,
}