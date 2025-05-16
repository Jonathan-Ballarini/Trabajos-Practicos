const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: Number
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/info', async (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || isNaN(edad) || Number(edad) <= 0) {
    return res.status(400).json({ error: 'Nombre vacío o edad inválida' });
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, edad });
    await nuevoUsuario.save();

    res.status(200).json({ mensaje: 'Usuario guardado con éxito' });
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/info', (req, res) => {
  const { nombre, edad } = req.query;
  res.render('info', { nombre, edad });
});

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find().lean();
    res.render('usuarios', { usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Usuario.findByIdAndDelete(id);
    res.json({ mensaje: 'Usuario borrado correctamente' });
  } catch (error) {
    console.error('Error al borrar usuario:', error);
    res.status(500).json({ error: 'Error al borrar usuario' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
