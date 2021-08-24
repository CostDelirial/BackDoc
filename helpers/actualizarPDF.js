const fs = require('fs');
const Docs = require('../models/doc.model');

const actualizarPDF = async (uid, nombreArchivo) => {

    const doc = await Docs.findById(uid);

    if (!doc) {
        console.log("no es un id valido de documento");
        return false;
    }


    const pathViejo = `./uploads/docs/${doc.dirDoc}`;


    if (doc.dirDoc === "SIN_DOCUMENTO.pdf") {
        doc.dirDoc = nombreArchivo;
        await doc.save();

        return true;
    } else {
        if (fs.existsSync(pathViejo)) {
            //borrar pdf viejo
            fs.unlinkSync(pathViejo);
        }

        doc.dirDoc = nombreArchivo;
        await doc.save();

        return true;
    }





}

module.exports = {
    actualizarPDF,
}