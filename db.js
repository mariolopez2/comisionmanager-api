const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_dtAgSP7K6bel@ep-cool-resonance-a8q07foy-pooler.eastus2.azure.neon.tech/neondb?sslmode=require', // Copia tu string de Neon aquí
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;