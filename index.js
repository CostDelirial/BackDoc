require('dotenv').config();

const express = require('express');
const cors = require('cors');


const { dbConection } = require('./database/config');
const path = require('path');

//CREAR EL SERVIDOR EXTRESS
const app = express();

//CONFIGURACION CORS
app.use(cors());

//LECTURA Y PARSEO DE BODY
app.use(express.json());


//CONECCION A BD
dbConection();

//RUTAS
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/docs', require('./routes/doc.routes'));
app.use('/api/login', require('./routes/auth.router'));
app.use('/api/upload', require('./routes/uploads.routes'));
app.use('/api/busqueda', require('./routes/busqueda.routes'));


//servidor en la escucha
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto  ' + process.env.PORT);
})



