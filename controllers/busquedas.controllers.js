const { response } = require('express');

const  Docs = require('../models/doc.model');


//////////////////////////////////////////////////////////////////////////////////
//                              BUSQUEDA GENERAL
/////////////////////////////////////////////////////////////////////////////////
const getBusquedaGeneral = async(req, res=response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i');
    
    const [documentos] = await Promise.all([
        
        docs = await Docs.find({ folioSSE: regex }),

    ])


    res.json({ok: true, documentos});

}


module.exports = {
    getBusquedaGeneral,
}