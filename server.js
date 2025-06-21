const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM usuarios WHERE username = $1 AND password = crypt($2, password)`, 
      [username, password]
    );
    if (result.rows.length > 0) {
      // Login OK, puedes devolver los datos del usuario (sin password)
      const user = result.rows[0];
      delete user.password;
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error de servidor' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));