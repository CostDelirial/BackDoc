const Audita = require('../models/audita.model');


const audita =  async ( que, cuando, folioDoc, uid_user )  => {

    const body = { que,cuando,folioDoc,uid_user};

    const auditar = new Audita(body);
    await auditar.save();
    return true;

 
   

}

module.exports = {
    audita,
}