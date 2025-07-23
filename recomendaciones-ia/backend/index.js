// ✅ Se agregan las librerías necesarias
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose'); // 🟡 Nueva línea: se importa mongoose para conectar a MongoDB
require('dotenv').config();

// ✅ Importación de rutas de películas
const rutasPeliculas = require('./routes/peliculas');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// ✅ Conexión a MongoDB Atlas (sustituye a la llamada a ./db)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// ✅ Ruta para obtener películas desde MongoDB
app.use('/api/peliculas', rutasPeliculas); // 🎯 Se mantiene esta línea

// 🔁 Ruta proxy para OpenRouter
app.post('/api/recomendaciones', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'tencent/hunyuan-a13b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const recomendacion = response.data.choices[0].message.content;
    res.json({ recomendacion });

  } catch (error) {
    console.error('❌ Error en la API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error en el servidor proxy' });
  }
});

// ✅ Iniciar servidor backend
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});

/*
❌ Las siguientes dos líneas se deben eliminar:

const connectDB = require('./db');
connectDB();

🔎 Motivo:
Ya que ahora usamos directamente mongoose.connect(...) dentro del mismo archivo, 
la función connectDB del archivo db.js ya no es necesaria y puede eliminarse para evitar duplicidad.
*/
