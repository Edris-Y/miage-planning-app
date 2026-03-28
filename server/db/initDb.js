const { getDbConnection } = require("./database.js");

async function init() {
  try {
    const db = await getDbConnection();

    await db.exec(`PRAGMA foreign_keys = ON;`);

    // ============================================================
    // 1. UTILISATEUR
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Utilisateur (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        mot_de_passe TEXT NOT NULL DEFAULT 'changeme',
        role TEXT NOT NULL CHECK(role IN ('etudiant', 'enseignant', 'administratif')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ============================================================
    // 2. COHORTE
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Cohorte (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        effectif INTEGER NOT NULL DEFAULT 0 CHECK(effectif >= 0),
        niveau TEXT
      );
    `);

    // ============================================================
    // 3. MATIERE
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Matiere (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        volumeHoraireTotal INTEGER DEFAULT 0 CHECK(volumeHoraireTotal >= 0)
      );
    `);

    // ============================================================
    // 4. SALLE
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Salle (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL UNIQUE,
        capacite INTEGER NOT NULL CHECK(capacite > 0),
        type TEXT NOT NULL CHECK(type IN ('AMPHI', 'TD', 'TP', 'LABO', 'INFO')),
        accessibilitePMR INTEGER NOT NULL DEFAULT 0 CHECK(accessibilitePMR IN (0,1)),
        isActive INTEGER NOT NULL DEFAULT 1 CHECK(isActive IN (0,1))
      );
    `);

    // ============================================================
    // 5. EQUIPEMENT
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Equipement (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        salle_id INTEGER REFERENCES Salle(id) ON DELETE CASCADE
      );
    `);

    // ============================================================
    // 6. MAINTENANCE SALLE
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS MaintenanceSalle (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        salle_id INTEGER NOT NULL REFERENCES Salle(id) ON DELETE CASCADE,
        dateDebut TEXT NOT NULL,
        dateFin TEXT NOT NULL,
        description TEXT,
        statut TEXT NOT NULL DEFAULT 'PLANIFIEE'
          CHECK(statut IN ('PLANIFIEE','TERMINEE','ANNULEE')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ============================================================
    // 7. ETUDIANT
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Etudiant (
        id INTEGER PRIMARY KEY REFERENCES Utilisateur(id) ON DELETE CASCADE,
        numeroEtudiant TEXT NOT NULL UNIQUE,
        annee INTEGER,
        filiere TEXT,
        cohorte_id INTEGER REFERENCES Cohorte(id) ON DELETE SET NULL
      );
    `);

    // ============================================================
    // 8. ENSEIGNANT
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Enseignant (
        id INTEGER PRIMARY KEY REFERENCES Utilisateur(id) ON DELETE CASCADE,
        grade TEXT,
        service TEXT
      );
    `);

    // ============================================================
    // 9. DISPONIBILITE
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Disponibilite (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        enseignant_id INTEGER NOT NULL REFERENCES Enseignant(id) ON DELETE CASCADE,
        jour TEXT NOT NULL CHECK(jour IN ('Lundi','Mardi','Mercredi','Jeudi','Vendredi')),
        heureDebut TEXT NOT NULL,
        heureFin TEXT NOT NULL,
        disponible INTEGER NOT NULL DEFAULT 1 CHECK(disponible IN (0,1))
      );
    `);

    // ============================================================
    // 10. SEANCE
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Seance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dateSeance DATE NOT NULL,
        heureDebut TEXT NOT NULL,
        duree INTEGER NOT NULL CHECK(duree > 0),
        typeSeance TEXT NOT NULL CHECK(typeSeance IN ('CM','TD','TP','EXAMEN','EVENEMENT','REUNION')),
        statut TEXT NOT NULL DEFAULT 'PLANIFIE'
          CHECK(statut IN ('PLANIFIE','VALIDE','ANNULE')),
        matiere_id INTEGER REFERENCES Matiere(id) ON DELETE SET NULL,
        cohorte_id INTEGER REFERENCES Cohorte(id) ON DELETE SET NULL,
        enseignant_id INTEGER REFERENCES Utilisateur(id) ON DELETE SET NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ============================================================
    // 11. RESERVATION
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Reservation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seance_id INTEGER NOT NULL REFERENCES Seance(id) ON DELETE CASCADE,
        salle_id INTEGER NOT NULL REFERENCES Salle(id) ON DELETE RESTRICT,
        demandeur_id INTEGER REFERENCES Utilisateur(id) ON DELETE SET NULL,
        priorite INTEGER NOT NULL DEFAULT 2,
        statut TEXT NOT NULL DEFAULT 'EN_ATTENTE'
          CHECK(statut IN ('PLANIFIEE','VALIDEE','ANNULEE','EN_ATTENTE')),
        motif TEXT,
        version INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ============================================================
    // 12. CONFLIT
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Conflit (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        resolu INTEGER NOT NULL DEFAULT 0 CHECK(resolu IN (0,1)),
        reservation_id INTEGER REFERENCES Reservation(id) ON DELETE SET NULL,
        seance_id_1 INTEGER REFERENCES Seance(id) ON DELETE CASCADE,
        seance_id_2 INTEGER REFERENCES Seance(id) ON DELETE CASCADE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ============================================================
    // 13. HISTORIQUE
    // ============================================================
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Historique (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        auteur_id INTEGER REFERENCES Utilisateur(id) ON DELETE SET NULL,
        entite TEXT NOT NULL,
        entite_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        detail TEXT,
        date_action DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // ============================================================
    // 14. TRIGGER Reservation
    // ============================================================
    await db.exec(`
      CREATE TRIGGER IF NOT EXISTS trg_reservation_updated_at
      AFTER UPDATE ON Reservation
      FOR EACH ROW
      BEGIN
        UPDATE Reservation
        SET updated_at = CURRENT_TIMESTAMP,
            version = OLD.version + 1
        WHERE id = NEW.id;
      END;
    `);

    // ============================================================
    // 15. INDEX
    // ============================================================
    await db.exec(`
      CREATE INDEX IF NOT EXISTS idx_seance_date
      ON Seance(dateSeance);

      CREATE INDEX IF NOT EXISTS idx_seance_salle
      ON Reservation(salle_id, seance_id);

      CREATE INDEX IF NOT EXISTS idx_seance_enseignant
      ON Seance(enseignant_id, dateSeance);

      CREATE INDEX IF NOT EXISTS idx_seance_cohorte
      ON Seance(cohorte_id, dateSeance);

      CREATE INDEX IF NOT EXISTS idx_conflit_resolu
      ON Conflit(resolu);

      CREATE INDEX IF NOT EXISTS idx_maintenance_salle
      ON MaintenanceSalle(salle_id, dateDebut, dateFin);
    `);

    // ============================================================
    // DONNEES DE TEST
    // ============================================================
    const count = await db.get("SELECT COUNT(*) as total FROM Utilisateur");
    if (count.total === 0) {
      console.log("🚀 Lancement du méga-remplissage de la base de données...");

      await db.exec(`
        -- ==========================================
        -- 1. COHORTES
        -- ==========================================
        INSERT INTO Cohorte (nom, effectif, niveau) VALUES
        ('L3 MIAGE', 45, 'Licence 3'),
        ('M1 MIAGE', 35, 'Master 1'),
        ('M2 MIAGE', 30, 'Master 2');

        -- ==========================================
        -- 2. UTILISATEURS
        -- ==========================================
        -- Admins (ID 1 à 2)
        INSERT INTO Utilisateur (nom, prenom, email, role) VALUES
        ('Admin', 'Principal', 'admin@univ.fr', 'administratif'),
        ('Admin', 'Scolarite', 'scolarite@univ.fr', 'administratif');

        -- Enseignants (ID 3 à 7)
        INSERT INTO Utilisateur (nom, prenom, email, role) VALUES
        ('Beduneau', 'Jean', 'prof.beduneau@univ.fr', 'enseignant'),
        ('Dubois', 'Marie', 'prof.dubois@univ.fr', 'enseignant'),
        ('Martin', 'Paul', 'prof.martin@univ.fr', 'enseignant'),
        ('Leroy', 'Sophie', 'prof.leroy@univ.fr', 'enseignant'),
        ('Moreau', 'Luc', 'prof.moreau@univ.fr', 'enseignant');

        -- Étudiants (ID 8 à 17)
        INSERT INTO Utilisateur (nom, prenom, email, role) VALUES
        ('Youssef', 'Edris', 'edris.youssef@univ.fr', 'etudiant'),
        ('El Hathout', 'Lina', 'lina.elhathout@univ.fr', 'etudiant'),
        ('Belkacemi', 'Cirine', 'cirine.belkacemi@univ.fr', 'etudiant'),
        ('Adjaz', 'Ryma', 'ryma.adjaz@univ.fr', 'etudiant'),
        ('Dupont', 'Alice', 'alice.dupont@univ.fr', 'etudiant'),
        ('Durand', 'Lucas', 'lucas.durand@univ.fr', 'etudiant'),
        ('Bernard', 'Emma', 'emma.bernard@univ.fr', 'etudiant'),
        ('Thomas', 'Hugo', 'hugo.thomas@univ.fr', 'etudiant'),
        ('Petit', 'Chloé', 'chloe.petit@univ.fr', 'etudiant'),
        ('Robert', 'Louis', 'louis.robert@univ.fr', 'etudiant');

        -- ==========================================
        -- 3. PROFILS SPECIFIQUES (Liés aux Utilisateurs)
        -- ==========================================
        -- Enseignants (ID Utilisateur 3 à 7)
        INSERT INTO Enseignant (id, grade, service) VALUES
        (3, 'Maitre de Conferences', 'Informatique'),
        (4, 'Professeur des Universites', 'Mathematiques'),
        (5, 'PRAG', 'Gestion'),
        (6, 'Maitre de Conferences', 'Bases de donnees'),
        (7, 'Vacataire', 'Droit');

        -- Etudiants (ID Utilisateur 8 à 17, liés aux cohortes)
        -- Les 4 fondateurs en M1 (cohorte_id = 2)
        INSERT INTO Etudiant (id, numeroEtudiant, annee, filiere, cohorte_id) VALUES
        (8, '20260001', 2026, 'MIAGE', 2),
        (9, '20260002', 2026, 'MIAGE', 2),
        (10, '20260003', 2026, 'MIAGE', 2),
        (11, '20260004', 2026, 'MIAGE', 2),
        (12, '20260005', 2026, 'MIAGE', 1), -- L3
        (13, '20260006', 2026, 'MIAGE', 1),
        (14, '20260007', 2026, 'MIAGE', 1),
        (15, '20260008', 2026, 'MIAGE', 3), -- M2
        (16, '20260009', 2026, 'MIAGE', 3),
        (17, '20260010', 2026, 'MIAGE', 3);

        -- ==========================================
        -- 4. MATIERES
        -- ==========================================
        INSERT INTO Matiere (nom, volumeHoraireTotal) VALUES
        ('Developpement Web (React/Node)', 40),
        ('Conception de Bases de Donnees', 30),
        ('Algorithmique Avancee', 35),
        ('Gestion de Projet Agile', 20),
        ('Architecture des Reseaux', 25),
        ('Droit de l''Informatique', 15),
        ('Intelligence Artificielle', 30);

        -- ==========================================
        -- 5. SALLES & EQUIPEMENTS
        -- ==========================================
        INSERT INTO Salle (code, capacite, type, accessibilitePMR) VALUES
        ('AMPHI-A', 250, 'AMPHI', 1),
        ('AMPHI-B', 150, 'AMPHI', 1),
        ('TD-101', 40, 'TD', 1),
        ('TD-102', 40, 'TD', 0),
        ('TD-103', 40, 'TD', 0),
        ('TP-201', 25, 'TP', 1),
        ('TP-202', 25, 'TP', 0),
        ('LABO-MAC', 20, 'LABO', 1),
        ('INFO-1', 30, 'INFO', 1),
        ('INFO-2', 30, 'INFO', 0);

        INSERT INTO Equipement (nom, salle_id) VALUES
        ('Videoprojecteur 4K', 1),
        ('Microphone sans fil', 1),
        ('Tableau Blanc Interactif', 3),
        ('20 iMac M3', 8),
        ('30 PC Dell', 9);

        -- ==========================================
        -- 6. SEANCES (Emploi du temps d'une semaine)
        -- ==========================================
        -- Lundi
        INSERT INTO Seance (dateSeance, heureDebut, duree, typeSeance, matiere_id, cohorte_id, enseignant_id) VALUES
        ('2026-03-30', '08:00', 120, 'CM', 1, 2, 3), -- M1: Dev Web (Beduneau) 2h
        ('2026-03-30', '10:30', 180, 'TP', 1, 2, 3), -- M1: Dev Web TP (Beduneau) 3h
        ('2026-03-30', '14:00', 120, 'CM', 2, 1, 6); -- L3: BDD (Leroy) 2h

        -- Mardi
        INSERT INTO Seance (dateSeance, heureDebut, duree, typeSeance, matiere_id, cohorte_id, enseignant_id) VALUES
        ('2026-03-31', '09:00', 180, 'TD', 4, 2, 5), -- M1: Gestion Projet (Martin) 3h
        ('2026-03-31', '13:30', 120, 'CM', 5, 3, 4); -- M2: Reseaux (Dubois) 2h

        -- Mercredi (Avec conflits !)
        INSERT INTO Seance (dateSeance, heureDebut, duree, typeSeance, matiere_id, cohorte_id, enseignant_id) VALUES
        ('2026-04-01', '08:30', 120, 'TD', 3, 1, 4), -- Seance 6: L3 Algo (Dubois)
        ('2026-04-01', '09:00', 120, 'CM', 6, 2, 7), -- Seance 7: M1 Droit (Moreau)
        ('2026-04-01', '08:30', 120, 'TD', 2, 2, 4); -- Seance 8 (CONFLIT PROF): Le prof Dubois doit être à 2 endroits à 8h30 !

        -- Jeudi
        INSERT INTO Seance (dateSeance, heureDebut, duree, typeSeance, matiere_id, cohorte_id, enseignant_id) VALUES
        ('2026-04-02', '10:00', 240, 'TP', 7, 3, 6); -- M2: IA TP (Leroy) 4h

        -- Vendredi
        INSERT INTO Seance (dateSeance, heureDebut, duree, typeSeance, matiere_id, cohorte_id, enseignant_id) VALUES
        ('2026-04-03', '14:00', 180, 'EXAMEN', 1, 2, 3); -- M1: Examen Dev Web (Beduneau) 3h

        -- ==========================================
        -- 7. RESERVATIONS DES SALLES
        -- ==========================================
        INSERT INTO Reservation (seance_id, salle_id, demandeur_id, statut) VALUES
        (1, 1, 1, 'VALIDEE'), -- Lundi matin en AMPHI-A
        (2, 9, 1, 'VALIDEE'), -- Lundi TP en INFO-1
        (3, 2, 1, 'VALIDEE'), -- Lundi aprem en AMPHI-B
        (4, 3, 1, 'VALIDEE'), -- Mardi matin en TD-101
        (5, 1, 1, 'VALIDEE'), -- Mardi aprem en AMPHI-A
        (6, 4, 1, 'VALIDEE'), -- Mercredi matin en TD-102 (Seance 6)
        (7, 4, 1, 'PLANIFIEE'), -- ⚠️ CONFLIT SALLE : La seance 7 essaie de prendre le TD-102 à 9h00, mais la seance 6 y est déjà de 8h30 à 10h30 !
        (8, 5, 1, 'VALIDEE'), -- Mercredi matin en TD-103 (Le prof est déjà pris !)
        (9, 8, 1, 'VALIDEE'), -- Jeudi IA dans le LABO-MAC
        (10, 1, 1, 'VALIDEE'); -- Vendredi Examen en AMPHI-A
      `);

      console.log("✅ Données massives ajoutées avec succès !");
      console.log("🚨 2 conflits ont été injectés pour tester le système (Salle TD-102 et Prof Dubois le Mercredi matin).");
    }
    else {
      console.log("La base contient déjà des données, aucune insertion nécessaire.");
    }

    console.log("Base de données initialisée avec succès.");
    await db.close();
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base :", error);
    process.exit(1);
  }
}

init();
