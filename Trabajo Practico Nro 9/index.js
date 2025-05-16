const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const contactosRoutes = require('./routes/contactos');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT;;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB Atlas', err);
    });

app.use('/contactos', contactosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
