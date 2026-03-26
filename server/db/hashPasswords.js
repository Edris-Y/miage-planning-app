const { getDbConnection } = require('./database');
const bcrypt = require('bcryptjs');

async function hashAllPasswords() {
  let db;
  try {
    db = await getDbConnection();
    const users = await db.all('SELECT id, mot_de_passe FROM Utilisateur');

    console.log(`Hachage de ${users.length} mots de passe...`);

    for (const user of users) {
      if (typeof user.mot_de_passe === 'string' && user.mot_de_passe.startsWith('$2')) {
        continue;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.mot_de_passe, salt);

      await db.run('UPDATE Utilisateur SET mot_de_passe = ? WHERE id = ?', [
        hashedPassword,
        user.id
      ]);
    }

    console.log("Tous les mots de passe ont été sécurisés !");
  } catch (error) {
    console.error("Erreur :", error);
  } finally {
    if (db) {
      await db.close();
    }
  }
}

hashAllPasswords();