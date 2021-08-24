const path = require('path');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarPDF } = require('../helpers/actualizarPDF');
const { audita } = require('../helpers/auditoria');


//////////////////////////////////////////////////////////////////////////////////
//                              BUSQUEDA GENERAL
/////////////////////////////////////////////////////////////////////////////////
const putSubirPDF = async (req, res = response) => {

    const uid = req.params.id;
    const uid_user = req.uid;
    //VALIDAR QUE EXISTA UN ARCHIVO EN EL LA PETICION
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ ok: false, msg: 'No hay archivo para subir' });
    }

    //PORCESAR EL PDF

    const file = req.files.dirDoc;


    const nombreCortado = file.name.split('.'); //separar por puntos en nombre
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const nombreOriginal = nombreCortado[nombreCortado.length -2];
    console.log(nombreOriginal);

    //validar extension
    if (extensionArchivo != 'pdf') {
        return res.status(400).json({ ok: false, msg: 'El formato de archivo no es valido debe ser PDF' });
    }

    //generar el nombre del archivo
    //const  nombreArchivo = `${uuidv4}.${extensionArchivo}`;
    //con nombre original
    const nombreArchivo = `${nombreOriginal}.${extensionArchivo}`;
   
    //Path para guardar PDF
    const path = `./uploads/docs/${nombreArchivo}`

    //mover la imagen a path
    file.mv(path, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).json({ ok: false, msg: 'El path donde quieres guardar no existe' });
        }

        //actualizar base de datos 
        //no funciona la funcion revisar para asignar pdf a un doc 

        actualizarPDF(uid, nombreArchivo);


        //guardar auditoria
        audita('Subir PDF del registro (folio SSE)',
            new Date(),
            nombreArchivo,
            uid_user);//cambiar UID por id dle usuario que registra  mediante el token

        res.json({
            ok: true,
            msg: 'archivo guardado con exito',
            nombreArchivo
        })

    })



}

///////////////////////////////////////////////////////////////////////////////
//              ver PDF
///////////////////////////////////////////////////////////////////////////////
const verPDF = (req, res) => {
    const pdf = req.params.pdf;


    const pathPdf = path.join(__dirname, `../uploads/docs/${pdf}`);


    res.sendFile(pathPdf);
}



module.exports = {

    putSubirPDF,
    verPDF,

}