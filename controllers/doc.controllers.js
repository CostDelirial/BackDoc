const Doc = require('../models/doc.model');
const { response } = require('express');

const { audita } = require('../helpers/auditoria');


///////////////////////////////////////////////////////////////////////////////////
//                              consulta todos los Docs
///////////////////////////////////////////////////////////////////////////////////
const getDocumentos = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    try {

        const [documentos, total] = await Promise.all([
            Doc
                .find({}, 'fecha expediente asunto numeroGESSM numeroSSM numeroSSS areaResponsable respuesta numeroResultado  estatus dirDoc').sort({ $natural: -1 })
                .populate('usuario', 'nombre')
                .skip(desde),


            Doc.countDocuments()
        ]);

        res.json({
            ok: true,
            documentos,
            total,
        })

    } catch (error) {
        console.log(erorr);
        res.status(500).json({ ok: false, msg: 'Error inesperado' });
    }

}
///////////////////////////////////////////////////////////////////////////////////
//                              consulta¿ Doc por id
///////////////////////////////////////////////////////////////////////////////////
const getDocumentoId = async( req, res ) => {
    const did = req.params.id;
    try{

        const documento = await Doc.findById({ _id: did });

        
        res.status(200).json({ok: true, documento});

    }catch(error){
        console.log(error);
        res.status(500).json({ ok: false, msg:' Error inesperado'});
    }
}


///////////////////////////////////////////////////////////////////////////////////
//                              consulta todos los Docs por estatus
///////////////////////////////////////////////////////////////////////////////////
const getDocumentosStatus = async (req, res) => {

    const status = req.params.status;
    


    try {
        const documentos = await Doc.find({ estatus: status.toUpperCase() }, 'fecha expediente asunto numeroGESSM numeroSSM numeroSSS areaResponsable respuesta numeroResultado  estatus dirDoc');

        res.json({
            ok: true,
            documentos
        })

    } catch (error) {
        console.log(erorr);
        res.status(500).json({ ok: false, msg: 'Error inesperado' });
    }

}
///////////////////////////////////////////////////////////////////////////////////
//                              crear datos del archivo
///////////////////////////////////////////////////////////////////////////////////
const postDocumento = async (req, res = response) => {

    const uid = req.uid;
    const body = new Doc({ usuario: uid, ...req.body });
    const uid_user = req.uid;

    try {

        const existeFolio = await Doc.findOne({ folioSSE: body.folioSSE });
        //validar que  los campos sean unicos
        if (existeFolio) {
            return res.status(404
            ).json({ ok: false, msg: 'El número de detonante debe ser unico' })
        }
        const docs = new Doc(body);


        //guardar datos de documentos
        await docs.save();

        //guardar auditoria
        audita('creación de Documentación nueva (folio SSE)',
            new Date(),
            body.folioSSE,
            uid_user);//cambiar UID por id dle usuario que registra  mediante el token


        res.json({
            ok: true,
            docs
        })
    } catch (error) {
        console.log(error);
        res.status(500).jsno({ ok: false, msg: 'Error inesperado' })
    }
}
///////////////////////////////////////////////////////////////////////////////////
//                              datos del user_resp en documento
///////////////////////////////////////////////////////////////////////////////////
const putDocumentoResultado = async (req, res = response) => {
    ////validar si el usuario es USER_RESP
    const uid = req.params.id;

    const uid_user = req.uid;
    try {

        const docDB = await Doc.findById(uid);
        //validar que exista el documento
        if (!docDB) {
            return res.status(404).json({ ok: false, msg: 'No existe el documento con ese ID' });
        }
        //actualizar el documento seleccionado
        const {
            fecha,
            expediente,
            documento,
            folioSSE,
            numeroGESSM,
            numeroSSM,
            numeroSSS,
            asunto,
            atencionAcuerdo,
            areaResponsable,
            estatus,
            dirDoc,
            depto,
            supervisor,
            administrador,
            usuario, ...campos } = req.body;

        const docResultado = await Doc.findByIdAndUpdate(uid, campos, { new: true })


        //guardar auditoria
        audita('Respuesta del documento (folio SSE)',
            new Date(),
            docDB.folioSSE,
            uid_user);//cambiar UID por id dle usuario que registra  mediante el token

        res.json({ ok: true, docResultado });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


///////////////////////////////////////////////////////////////////////////////////
//                              datos del user_vali en documento
///////////////////////////////////////////////////////////////////////////////////
const putDocumentoValidacion = async (req, res = response) => {
    ////validar si el usuario es USER_RESP
    const uid = req.params.id;
    const uid_user = req.uid;
    try {

        const docDB = await Doc.findById(uid);
        //validar que exista el documento
        if (!docDB) {
            return res.status(404).json({ ok: false, msg: 'No existe el documento con ese ID' });
        }
        //actualizar el documento seleccionado
        const {
            fecha,
            expediente,
            documento,
            folioSSE,
            numeroGESSM,
            numeroSSM,
            numeroSSS,
            asunto,
            atencionAcuerdo,
            areaResponsable,
            dirDoc,
            respuesta,
            numeroResultado,
            fechaResultado, ...campos } = req.body;

        const docValidacion = await Doc.findByIdAndUpdate(uid, campos, { new: true });

        //guardar auditoria
        audita('Validación del documento (folio SSE)',
            new Date(),
            docDB.folioSSE,
            uid_user);//cambiar UID por id dle usuario que registra  mediante el token


        res.json({ ok: true, docValidacion });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}





module.exports = {
    getDocumentos,
    getDocumentoId,
    getDocumentosStatus,
    postDocumento,
    putDocumentoResultado,
    putDocumentoValidacion,
}