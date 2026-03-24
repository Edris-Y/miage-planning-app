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
  {
    id: "c7",
    matiere: "Mathématiques",
    salle: "Amphi A",
    jour: 0,
    heureDebut: 9,
    heureFin: 11,
    type: "CM",
    enseignant: "Dr. Martin",
    description: "Cours de mathématiques",
  },
  {
    id: "c8",
    matiere: "Programmation",
    salle: "Lab 302",
    jour: 3,
    heureDebut: 10,
    heureFin: 12,
    type: "TP",
    enseignant: "Mme Dupont",
    description: "TP de programmation",
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

export const mockDemandes = [
  { id: 'd1', type: 'CM', date: '2026-02-12', debut: '14:00', fin: '16:00', cohorte: 'M1 Info', salle: 'Amphi B', statut: 'VALIDÉE' },
  { id: 'd2', type: 'TP', date: '2026-02-13', debut: '10:00', fin: '12:00', cohorte: 'L3 Info', salle: 'Lab 2', statut: 'EN ATTENTE' },
  { id: 'd3', type: 'TD', date: '2026-02-15', debut: '13:00', fin: '15:00', cohorte: 'L2 Info', salle: 'Lab 302', statut: 'AJUSTÉE' },
  { id: 'd4', type: 'EXAM', date: '2026-02-20', debut: '09:00', fin: '12:00', cohorte: 'L3 Info', salle: 'Amphi C', statut: 'REFUSÉE' },
];

export const mockNotifications = [
  { id: 'n1', status: 'nouveau', titre: 'Changement de salle', message: 'Cours de Mathématiques du 5 février déplacé en Amphi B', date: '2026-02-01 16:30' },
  { id: 'n2', status: 'lu', titre: 'Demande de congé approuvée', message: 'Votre demande de congé pour le 20 février a été approuvée', date: '2026-02-03 14:00' },
  { id: 'n3', status: 'important', titre: 'Nouveau cours assigné', message: 'Nouveau cours assigné pour la cohorte M1', date: '2026-02-04 09:15' },
];

export const mockTypes = ['CM','TD','TP','EXAM'];

export const mockSalles = ['Amphi A','Amphi B','Lab 302','Lab 2','C105','B201','A302'];

export const mockCohortes = [
  { id: "ASR1", label: "A", fullLabel: "ASR - Administration et Securite des Reseaux" },
  { id: "MIAGE2", label: "M", fullLabel: "MIAGE - Master 2" },
  { id: "L3INFO", label: "L", fullLabel: "Licence 3 Informatique" },
];

export const mockFilieres = [
  {
    id: "f-info",
    nom: "Filiere Informatique",
    niveau: "L3",
    icon: "💻",
    groupes: [
      {
        id: "ASR",
        nom: "ASR",
        description: "Administration et Securite des Reseaux",
        etudiants: 35,
        cours: 8,
        niveau: "L3 Informatique",
        color: "#3b82f6",
      },
      {
        id: "MIAGE",
        nom: "MIAGE",
        description: "Methodes Informatiques Appliquees a la Gestion",
        etudiants: 42,
        cours: 10,
        niveau: "L3 Informatique",
        color: "#a855f7",
      },
      {
        id: "CILS",
        nom: "CILS",
        description: "Conception et Ingenierie des Logiciels et Systemes",
        etudiants: 38,
        cours: 9,
        niveau: "L3 Informatique",
        color: "#22c55e",
      },
    ],
  },
  {
    id: "f-math",
    nom: "Filiere Mathematiques",
    niveau: "L2-L3",
    icon: "📐",
    groupes: [
      {
        id: "L2-MATH",
        nom: "L2 - Mathematiques",
        description: "Mathematiques fondamentales et appliquees",
        etudiants: 45,
        cours: 11,
        niveau: "L2 Mathematiques",
        color: "#ef4444",
      },
      {
        id: "L3-STAT",
        nom: "L3 - Statistiques",
        description: "Statistiques et Analyse de Donnees",
        etudiants: 32,
        cours: 9,
        niveau: "L3 Mathematiques",
        color: "#f97316",
      },
    ],
  },
  {
    id: "f-physique",
    nom: "Filiere Physique",
    niveau: "L2-M1",
    icon: "⚛️",
    groupes: [
      {
        id: "L2-PHY",
        nom: "L2 - Physique",
        description: "Physique generale et experimentale",
        etudiants: 40,
        cours: 8,
        niveau: "L2 Physique",
        color: "#14b8a6",
      },
      {
        id: "M1-PHY",
        nom: "M1 - Physique Theorique",
        description: "Physique theorique et modelisation",
        etudiants: 28,
        cours: 7,
        niveau: "M1 Physique",
        color: "#06b6d4",
      },
    ],
  },
  {
    id: "f-eco",
    nom: "Filiere Economie",
    niveau: "L3",
    icon: "📊",
    groupes: [
      {
        id: "L3-ECO",
        nom: "L3 - Economie",
        description: "Analyse economique et politiques publiques",
        etudiants: 36,
        cours: 8,
        niveau: "L3 Economie",
        color: "#6366f1",
      },
      {
        id: "L3-GEST",
        nom: "L3 - Gestion",
        description: "Gestion des organisations et management",
        etudiants: 34,
        cours: 7,
        niveau: "L3 Gestion",
        color: "#ec4899",
      },
      {
        id: "L3-FI",
        nom: "L3 - Finance",
        description: "Finance d entreprise et marche des capitaux",
        etudiants: 30,
        cours: 8,
        niveau: "L3 Economie",
        color: "#0ea5e9",
      },
    ],
  },
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
