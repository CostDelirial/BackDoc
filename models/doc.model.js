
const { Schema, model } = require('mongoose');


const DocSchema = Schema({
    //////////////////////////////////////////////////////////detonante,numero de acuerdo y seguimineto
    fecha: { type: String, required: true },
    expediente: { type: String, required: true },
    documento: { type: String, required: true },//combo box  ya definido
    folioSSE: { type: String, required: true, unique: true },
    numeroGESSM: { type: Number, required: true,default: 0 },
    numeroSSM: { type: Number, required: true, default: 0 },
    numeroSSS: { type: Number, required: true, default: 0 },
    asunto: { type: String, required: true },
    atencionAcuerdo: { type: String, required: true },//combo box ya definido
    areaResponsable: { type: String, required: true }, //combo box ya definido 
    estatus: { type: String, default: 'PENDIENTE' },//combo box ya definido
    dirDoc: { type: String, default: 'SIN_DOCUMENTO.pdf' },
    //////////////////////////////////////////////////////resultado
    respuesta: { type: String, default:"NUL"},//combo box ya definido
    numeroResultado: { type: Number,default:0 },
    fechaResultado: { type: String, default: "NULL" },
    //////////////////////////////////////////////////////validación
    depto: { type: String, default: "NULL" },
    supervisor: { type: String, default: "NULL" },
    administrador: { type: String, default: "NULL" },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

DocSchema.method('toJSON', function () {

    const { __v, ...object } = this.toObject();

    return object;

});

module.exports = model('Doc', DocSchema);
