const API_BASE = process.env.REACT_APP_API_URL || '';

export async function getEnseignantCours() {
  return fetch(`${API_BASE}/api/enseignant/cours`).then(r => r.json());
}

export async function getEtudiantCours() {
  return fetch(`${API_BASE}/api/etudiant/cours`).then(r => r.json());
}

export async function getNotifications() {
  return fetch(`${API_BASE}/api/notifications`).then(r => r.json());
}

export async function getDemandes() {
  return fetch(`${API_BASE}/api/demandes`).then(r => r.json());
}

export async function createDemande(demande) {
  return fetch(`${API_BASE}/api/demandes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(demande),
  }).then(r => r.json());
}