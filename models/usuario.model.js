
const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: { type: String, required: true },
    control: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'USER' },
    fechaInicio: { type: Date,default: new Date},
    status: { type: String, required: true, default: 'DESACTIVADO' },

});

UsuarioSchema.method('toJSON', function () {

    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id; //sustituir _id por uid

    return object;

});

module.exports = model('Usuario', UsuarioSchema);
