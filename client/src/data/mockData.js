// src/data/mockData.js

export const COURSE_TYPES = {
  CM: { label: "CM", color: "#DC2626" },
  TD: { label: "TD", color: "#F59E0B" },
  TP: { label: "TP", color: "#3B82F6" },
  EXAM: { label: "Examen", color: "#10B981" },
};

// jour: 0=lundi ... 6=dimanche
export const mockEnseignantCours = [
  {
    id: "c1",
    matiere: "Genie Logiciel",
    salle: "B201",
    jour: 0,
    heureDebut: 9,
    heureFin: 11,
    type: "CM",
  },
  {
    id: "c2",
    matiere: "Base de Donnees",
    salle: "C105",
    jour: 1,
    heureDebut: 10,
    heureFin: 12,
    type: "TD",
  },
  {
    id: "c3",
    matiere: "Reseaux",
    salle: "Lab R3",
    jour: 2,
    heureDebut: 14,
    heureFin: 17,
    type: "TP",
  },
  {
    id: "c4",
    matiere: "UML et Modelisation",
    salle: "A302",
    jour: 3,
    heureDebut: 8,
    heureFin: 10,
    type: "CM",
  },
  {
    id: "c5",
    matiere: "Methodes Agiles",
    salle: "B104",
    jour: 4,
    heureDebut: 13,
    heureFin: 15,
    type: "TD",
  },
  {
    id: "c6",
    matiere: "Projet Tutor e",
    salle: "Open Space 2",
    jour: 4,
    heureDebut: 15,
    heureFin: 18,
    type: "TP",
  },
];

export const mockEnseignants = [
  { id: "all", nom: "Tous les enseignants" },
  { id: "e1", nom: "Dr. Benali" },
  { id: "e2", nom: "Pr. Martin" },
  { id: "e3", nom: "Mme Dupont" },
];

export const mockEtudiantCours = [
  {
    id: "s1",
    matiere: "Mathematiques",
    salle: "Amphi A",
    jour: 0,
    heureDebut: 9,
    heureFin: 11,
    type: "CM",
    enseignant: "Dr. Benali",
  },
  {
    id: "s2",
    matiere: "Mathematiques",
    salle: "Lab 302",
    jour: 1,
    heureDebut: 12,
    heureFin: 14,
    type: "TD",
    enseignant: "Mme Dupont",
  },
  {
    id: "s3",
    matiere: "Mathematiques",
    salle: "B301",
    jour: 3,
    heureDebut: 9,
    heureFin: 11,
    type: "TP",
    enseignant: "Pr. Martin",
  },
  {
    id: "s4",
    matiere: "Mathematiques",
    salle: "Lab 302",
    jour: 4,
    heureDebut: 10,
    heureFin: 12,
    type: "TD",
    enseignant: "Mme Dupont",
  },
];

export const mockCohortes = [
  { id: "ASR1", label: "A", fullLabel: "ASR - Administration et Securite des Reseaux" },
  { id: "MIAGE2", label: "M", fullLabel: "MIAGE - Master 2" },
  { id: "L3INFO", label: "L", fullLabel: "Licence 3 Informatique" },
];

export const mockSalles = [
  { id: "s1", nom: "Amphi A", capacite: 200, type: "Amphithéâtre", equipement: "Vidéoprojecteur, Micro", statut: "Disponible" },
  { id: "s2", nom: "B201", capacite: 40, type: "Salle de cours", equipement: "Tableau blanc, PC", statut: "Disponible" },
  { id: "s3", nom: "C105", capacite: 30, type: "Salle de cours", equipement: "Tableau blanc", statut: "Occupée" },
  { id: "s4", nom: "Lab R3", capacite: 20, type: "Laboratoire", equipement: "Postes informatiques, Internet", statut: "Disponible" },
  { id: "s5", nom: "A302", capacite: 50, type: "Salle de cours", equipement: "Vidéoprojecteur, Tableau", statut: "En maintenance" },
  { id: "s6", nom: "Open Space 2", capacite: 25, type: "Espace de travail", equipement: "Tables modulables", statut: "Disponible" },
  { id: "s7", nom: "Lab 302", capacite: 24, type: "Laboratoire", equipement: "Postes informatiques, Imprimante", statut: "Disponible" },
  { id: "s8", nom: "B104", capacite: 35, type: "Salle de cours", equipement: "Tableau blanc, Vidéoprojecteur", statut: "Occupée" },
];

export const mockUtilisateurs = [
  { id: "u1", nom: "Alice Dupont", email: "alice.dupont@univ.fr", role: "Étudiant", statut: "Actif" },
  { id: "u2", nom: "Bob Martin", email: "bob.martin@univ.fr", role: "Étudiant", statut: "Actif" },
  { id: "u3", nom: "Dr. Benali", email: "benali@univ.fr", role: "Enseignant", statut: "Actif" },
  { id: "u4", nom: "Pr. Martin", email: "pr.martin@univ.fr", role: "Enseignant", statut: "Actif" },
  { id: "u5", nom: "Mme Dupont", email: "mme.dupont@univ.fr", role: "Enseignant", statut: "Actif" },
  { id: "u6", nom: "Admin Système", email: "admin@univ.fr", role: "Administrateur", statut: "Actif" },
  { id: "u7", nom: "Clara Fontaine", email: "clara.fontaine@univ.fr", role: "Étudiant", statut: "Inactif" },
];

export const mockReservations = [
  { id: "r1", salle: "Lab R3", utilisateur: "Dr. Benali", date: "2026-03-25", heureDebut: 14, heureFin: 17, matiere: "Réseaux TP", statut: "Approuvée" },
  { id: "r2", salle: "B201", utilisateur: "Pr. Martin", date: "2026-03-26", heureDebut: 10, heureFin: 12, matiere: "Base de Données TD", statut: "En attente" },
  { id: "r3", salle: "Amphi A", utilisateur: "Mme Dupont", date: "2026-03-27", heureDebut: 9, heureFin: 11, matiere: "Mathématiques CM", statut: "Approuvée" },
  { id: "r4", salle: "Lab 302", utilisateur: "Dr. Benali", date: "2026-03-28", heureDebut: 13, heureFin: 15, matiere: "Projet Tutoré", statut: "En attente" },
  { id: "r5", salle: "A302", utilisateur: "Pr. Martin", date: "2026-03-24", heureDebut: 8, heureFin: 10, matiere: "UML CM", statut: "Refusée" },
];

export const mockConflits = [
  { id: "cf1", type: "Chevauchement salle", description: "La salle B201 est réservée par 2 cours le lundi 09:00-11:00", severite: "Critique", cours1: "Génie Logiciel (Dr. Benali)", cours2: "Méthodes Agiles (Pr. Martin)" },
  { id: "cf2", type: "Indisponibilité enseignant", description: "Dr. Benali a deux cours simultanés le mardi 10:00-12:00", severite: "Critique", cours1: "Base de Données (C105)", cours2: "Réseaux (Lab R3)" },
  { id: "cf3", type: "Capacité dépassée", description: "La salle C105 (30 places) accueille le groupe ASR1 (45 étudiants)", severite: "Avertissement", cours1: "Réseaux TD (C105)", cours2: null },
  { id: "cf4", type: "Chevauchement étudiant", description: "Le groupe MIAGE2 a deux cours en même temps le mercredi 14:00-17:00", severite: "Avertissement", cours1: "Big Data TP (Lab 12)", cours2: "Architecture Logicielle CM (C201)" },
];

export const mockCohortesCours = {
  ASR1: [
    { id: "asr1-1", matiere: "Mathematiques", salle: "Salle B301", jour: 0, heureDebut: 9, heureFin: 11, type: "TP" },
    { id: "asr1-2", matiere: "Mathematiques", salle: "Amphi A", jour: 0, heureDebut: 12, heureFin: 14, type: "CM" },
    { id: "asr1-3", matiere: "Mathematiques", salle: "Amphi A", jour: 1, heureDebut: 9, heureFin: 11, type: "TP" },
    { id: "asr1-4", matiere: "Mathematiques", salle: "Lab 302", jour: 1, heureDebut: 12, heureFin: 14, type: "TD" },
    { id: "asr1-5", matiere: "Mathematiques", salle: "Amphi A", jour: 3, heureDebut: 9, heureFin: 11, type: "TP" },
    { id: "asr1-6", matiere: "Mathematiques", salle: "Lab 302", jour: 4, heureDebut: 10, heureFin: 12, type: "TD" },
  ],
  MIAGE2: [
    { id: "m2-1", matiere: "Architecture Logicielle", salle: "C201", jour: 0, heureDebut: 10, heureFin: 12, type: "CM" },
    { id: "m2-2", matiere: "Big Data", salle: "Lab 12", jour: 2, heureDebut: 14, heureFin: 17, type: "TP" },
  ],
  L3INFO: [
    { id: "l3-1", matiere: "Reseaux", salle: "R204", jour: 1, heureDebut: 8, heureFin: 10, type: "TD" },
    { id: "l3-2", matiere: "Genie Logiciel", salle: "B102", jour: 3, heureDebut: 13, heureFin: 15, type: "CM" },
  ],
};
