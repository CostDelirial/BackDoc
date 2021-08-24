/*

        RUTA: /api/upload

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { putSubirPDF, verPDF } = require('../controllers/uploads.controllers');
const expressFileupload = require('express-fileupload');


const router = Router();

router.use( expressFileupload() );

///////////////////////////////////////////////////////////////
//                      subida de PDF 
//////////////////////////////////////////////////////////////
router.put('/:id',
[
    validarJWT,
],
putSubirPDF )


///////////////////////////////////////////////////////////////
//                      mostrar DOCUMENTO
///////////////////////////////////////////////////////////////
router.get('/:pdf',verPDF);



module.exports = router;