// Importa la librería mongoose
const mongoose = require('mongoose');

// Crea un nuevo esquema para películas
const peliculaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  }
}, { collection: 'peliculas' }); // 🔴 AQUÍ está la corrección clave

// Exporta el modelo
module.exports = mongoose.model('Pelicula', peliculaSchema);
