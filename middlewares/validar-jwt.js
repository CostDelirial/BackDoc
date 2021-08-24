const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {
//console.log(req.headers);
    //leer el token
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({ ok: false, msg: 'Token invalido' })
    }

    try {
        const { uid, role } = jwt.verify(token, process.env.JWT_SECRET);
        
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({ ok: false, msg: 'Token no valido' })
    }

}


module.exports = {
    validarJWT,
}