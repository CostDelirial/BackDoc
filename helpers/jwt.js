
const jwt = require('jsonwebtoken');

const generarJWT = (uid,nombre,control,status,role) =>{

    return new Promise( ( resolve, reject ) => {
        const payload = {
            uid,
            nombre,
            control,
            status,
            role
        }
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
            if ( err){
                console.log(err);
                reject( 'No se pueod generar el JWT' );
            }else{
                resolve(token);
            }
    
    
    
        });
    })
    
}

module.exports = {
    generarJWT,
}