/*
            RUTA: /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
[
 check('control', 'El control es oligatorio').not().isEmpty(),
 check('password','El Password es obligatorio').not().isEmpty(),
validarCampos
],
login
)


//login de usuario 
// renovar token
router.get( '/renew',
    validarJWT,
    renewToken
)



module.exports = router;