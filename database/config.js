const mongoose = require('mongoose');
require('dotenv').config();

const dbConection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Conectado a BD :)')
    } catch (error) {
        console.log(error);
        throw new Error('Erorr en la conexion a la BD');
    }
}

module.exports = {
    dbConection
}