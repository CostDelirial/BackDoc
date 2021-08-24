const Usuario = require('../models/usuario.model');
const { response } = require('express');
const crypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              consulta d etodos los usuarios
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getUsuarios = async (req, res) => {

    const usuario = await Usuario.find({}, 'nombre control status role');

    res.json({
        ok: true,
        usuario,
        uid: req.uid
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              crear usuario
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const crearUsuario = async (req, res = response) => {

    const { nombre, control, password, role, fechaInicio, status } = req.body;

    try {
        const existeControl = await Usuario.findOne({ control });

        //validar que el control o ficha  no se repita
        if (existeControl) {
            return res.status(400).json({ ok: false, msg: 'El número de control ya existe en BD' });
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = crypt.genSaltSync();
        usuario.password = crypt.hashSync(password, salt);

        //guardar usuario
        await usuario.save();

        //generar token JWT
        const token = await generarJWT(usuario.id,usuario.nombre,usuario.control, usuario.status );
        

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error inesperado' });
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              actualizar sol perfil de usuario propio
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const actualizarPerfil = async( req, res = response ) => {
//TODO: validar tken si el usuario es correcto 

    const uid = req.params.id;
    


    try{

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(404).json({ ok: false,msg:'No existe un usuario con ese ID'})
        }

        //Actualizacion de perfil 
        const { password, control, status, role, ...campos } = req.body;
       
    
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );
        

        res.json({ ok:true, usuario: usuarioActualizado });

    }catch(error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg:'Error al actualizar perfil' });
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              desactivar un usuario
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const statusUsuario = async(req, res=response) => {
    
    const uid = req.params.id;
    const stat = req.params.stat;

    try{
        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB){
            return res.status(404).json({ ok: false, msg: 'No existe el usuario con ese ID'});
        }

        //Actualizacion de perfil 
        const { password, control, role, nombre, ...campos } = req.body;

        const usuarioStatus = await Usuario.findByIdAndUpdate( { _id: uid},{ status: stat}, {new: true});

        return res.json({ ok: true, usuarioStatus });

    }catch(error){
        console.log(error);
        return res.json({ok: false, msg: 'Error inesperado'});
    }
  
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              buscar usuario por id
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buscarUsuario = async( req, res = response) => {
    const uid = req.params.id;
    

    try{
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({ok: false, msg:'El usuario que busca no existe'});
        }
        return res.status(200).json({ ok: true, usuarioDB });
    }catch(error){
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error inesperado'});
    }
    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              buscar role de usuario  por id
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const RoleUsuario = async (req, res ) => {
    const uid = req.params.id;
    
    try{
        const roleDB = await Usuario.findById(uid,'role');
        if(!roleDB){
            return res.status(400).jsno({ok: false, msg: 'El role del usuairo que busca no existe'});
        }
        return res.status(200).json({ok:true, roleDB});
    }catch( error ){
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Error inesperado'})
    }
}

const CambiarRole = async( req, res)=>{
    const uid = req.params.uid;
    const body = req.body.role;
    console.log(body);
    try{
        const rol = await Usuario.findByIdAndUpdate({ _id: uid},{ role: body}, {new: true});
        return res.status(200).json({
            ok: false,
            msg: 'cambio con exito',
            rol
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Error inesperado'})
    }
return res.status(200).json({ok:true})

} 



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarPerfil,
    statusUsuario,
    RoleUsuario,
    CambiarRole,
    buscarUsuario
}