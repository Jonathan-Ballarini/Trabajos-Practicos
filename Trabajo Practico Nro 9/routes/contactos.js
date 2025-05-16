const express = require('express');
const router = express.Router();
const Contacto = require('../models/contacto');

router.get('/', async (req, res) => {
    try {
        const contactos = await Contacto.find();
        res.status(200).json(contactos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener contactos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, email, fechaNacimiento } = req.body;
        const nuevoContacto = new Contacto({ nombre, email, fechaNacimiento });
        await nuevoContacto.save();
        res.status(201).json(nuevoContacto);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar contacto' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, fechaNacimiento } = req.body;
        const contactoActualizado = await Contacto.findByIdAndUpdate(id, { nombre, email, fechaNacimiento }, { new: true });

        if (!contactoActualizado) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json(contactoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar contacto' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const contactoEliminado = await Contacto.findByIdAndDelete(id);

        if (!contactoEliminado) {
            return res.status(404).json({ message: 'Contacto no encontrado' });
        }

        res.status(200).json({ message: 'Contacto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar contacto' });
    }
});

module.exports = router;
