const { dbAll, dbGet, dbRun } = require("../db/dbAsync");


const JOURS_SEMAINE = ['2026-04-06', '2026-04-07', '2026-04-08', '2026-04-09', '2026-04-10'];
const CRENEAUX = ['08:00', '10:00', '14:00', '16:00'];
const DUREE_STANDARD = 120;

exports.genererEDTGlouton = async (req, res) => {
  try {
    console.log("🚀 Démarrage de l'algorithme Glouton...");


    const salles = await dbAll("SELECT * FROM Salle ORDER BY capacite DESC");



    let coursAPlacer = await dbAll(`
      SELECT r.*, c.effectif 
      FROM Reservation r
      JOIN Cohorte c ON r.cohorte_id = c.id
      WHERE r.statut = 'EN_ATTENTE' AND r.type_demande = 'AJOUT'
    `);



    const PRIORITY = { "EXAMEN": 4, "CM": 3, "TD": 2, "TP": 1 };

    coursAPlacer.sort((a, b) => {
      const prioA = PRIORITY[a.type_seance_souhaitee] || 0;
      const prioB = PRIORITY[b.type_seance_souhaitee] || 0;
      if (prioB !== prioA) return prioB - prioA;
      return b.effectif - a.effectif;
    });

    const succes = [];
    const echecs = [];


    for (const cours of coursAPlacer) {
      let estPlace = false;


      for (const jour of JOURS_SEMAINE) {
        if (estPlace) break;

        for (const heure of CRENEAUX) {
          if (estPlace) break;

          for (const salle of salles) {

            if (salle.capacite < cours.effectif) continue;


            const conflit = await dbGet(`
              SELECT id FROM Seance 
              WHERE dateSeance = ? AND heureDebut = ? AND statut = 'VALIDE'
              AND (salle_id = ? OR enseignant_id = ? OR cohorte_id = ?)
            `, [jour, heure, salle.id, cours.enseignant_id, cours.cohorte_id]);

            if (!conflit) {

              const result = await dbRun(`
                INSERT INTO Seance (dateSeance, heureDebut, duree, typeSeance, statut, description, cohorte_id, enseignant_id, salle_id, matiere_id)
                VALUES (?, ?, ?, ?, 'VALIDE', ?, ?, ?, ?, ?)
              `, [
              jour, heure, DUREE_STANDARD, cours.type_seance_souhaitee,
              "Généré auto (Glouton)", cours.cohorte_id, cours.enseignant_id, salle.id, cours.matiere_id]
              );


              await dbRun("UPDATE Reservation SET statut = 'VALIDEE', seance_id = ? WHERE id = ?", [result.lastID, cours.id]);

              estPlace = true;
              succes.push({ ...cours, jour, heure, salle: salle.nom });
              break;
            }
          }
        }
      }


      if (!estPlace) {
        echecs.push(cours);
      }
    }

    console.log(`✅ Génération terminée : ${succes.length} placés, ${echecs.length} échecs.`);

    res.json({
      message: "Algorithme glouton exécuté avec succès",
      stats: { places: succes.length, echecs: echecs.length },
      succes,
      echecs
    });

  } catch (error) {
    console.error("❌ ERREUR GLOUTON :", error);
    res.status(500).json({ message: error.message });
  }
};