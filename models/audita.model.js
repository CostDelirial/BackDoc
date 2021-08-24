const { Schema, model } = require('mongoose');

const AuditaSchema = Schema({
    que: { type: String, required: true},
    cuando: { type: String, required: true},
    folioDoc: {type: String, required: true},
    uid_user:{ type: Schema.Types.ObjectId, ref:'Usuario'}
});

module.exports = model('Audita', AuditaSchema);