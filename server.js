const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Asegúrate de tener este archivo configurando tu pool

const app = express();

app.use(cors());
app.use(express.json());

// ENDPOINTS ========================

// Login seguro
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    // ¡Login OK!
    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        username: user.username,
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Otras rutas (ejemplo)
app.get('/api/clientes', async (req, res) => {
  const result = await pool.query('SELECT * FROM clientes');
  res.json(result.rows);
});

// Levanta el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
