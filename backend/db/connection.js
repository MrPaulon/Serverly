const mariadb = require('mariadb');
require('dotenv').config(); // Charge les variables depuis le .env

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // 👈 Correction ici (DB_PASSWORD au lieu de DB_PASS)
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // 👈 (Optionnel mais recommandé d'ajouter le port aussi)
  connectionLimit: 5
});

// Fonction pour obtenir une connexion (ex: dans un routeur)
async function getConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    console.error("ERREUR SQL BRUTE :", err); // 👈 Utile pour afficher la vraie erreur si ça persiste
    throw err;
  }
}

module.exports = {
  pool,
  getConnection
};