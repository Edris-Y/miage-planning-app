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
