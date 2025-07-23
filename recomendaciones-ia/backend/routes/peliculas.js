const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Pelicula');

// Ruta GET para obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas' });
  }
});

module.exports = router;
