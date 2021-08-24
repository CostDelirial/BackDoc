/*

        Ruta: /api/busquedas

*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusquedaGeneral } = require('../controllers/busquedas.controllers');

const router = Router();

router.get('/:busqueda',validarJWT,getBusquedaGeneral);



module.exports = router;