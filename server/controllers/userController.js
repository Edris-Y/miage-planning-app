const { getDbConnection } = require('../db/database');

exports.getUsers = async (req, res) => {
  let db;
  try {
    db = await getDbConnection();
    const users = await db.all('SELECT id, nom, prenom, email, role, created_at FROM Utilisateur ORDER BY id ASC');
    console.log("Voici les données de USERS :", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (db) {
      await db.close();
    }
  }
};