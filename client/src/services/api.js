const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

const DEFAULT_ENSEIGNANT_ID = Number(process.env.REACT_APP_ENSEIGNANT_ID || 2);
const DEFAULT_COHORTE_ID = Number(process.env.REACT_APP_COHORTE_ID || 1);

function normalizeType(type = "") {
  const t = String(type).toUpperCase();
  if (t === "EXAMEN") return "EXAM";
  return t;
}

function toHHMM(value) {
  if (!value) return "00:00";
  const txt = String(value);
  if (txt.includes(":")) return txt.slice(0, 5);
  return `${txt.padStart(2, "0")}:00`;
}

function addMinutes(hhmm, minutes) {
  const [h, m] = toHHMM(hhmm).split(":").map(Number);
  const start = h * 60 + m;
  const end = start + (Number(minutes) || 0);
  const eh = Math.floor(end / 60) % 24;
  const em = end % 60;
  return `${String(eh).padStart(2, "0")}:${String(em).padStart(2, "0")}`;
}

function statusLabel(status = "") {
  const s = String(status).toUpperCase();
  if (s === "VALIDEE") return "VALIDÉE";
  if (s === "EN_ATTENTE") return "EN ATTENTE";
  if (s === "ANNULEE") return "REFUSÉE";
  return status || "EN ATTENTE";
}

async function apiFetch(path, options = {}) {
  return request(path, options);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function setUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function request(path, { method = "GET", data, headers = {}, auth = false } = {}) {
  const token = getToken();

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth && token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body: data !== undefined ? JSON.stringify(data) : undefined,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.message || payload?.error || `Erreur API (${response.status})`;
    throw new Error(message);
  }

  return payload;
}

export async function login(email, password) {
  const payload = await request("/api/auth/login", {
    method: "POST",
    data: { email, password },
  });

  if (payload?.token) {
    setToken(payload.token);
  }

  if (payload?.user) {
    setUser(payload.user);
  }

  return payload;
}

function mapPlanningRow(row) {
  return {
    id: String(row.id),
    matiere: row.matiere_nom || "Cours",
    salle: row.salle_code || "-",
    date: row.dateSeance,
    debut: toHHMM(row.heureDebut),
    fin: addMinutes(row.heureDebut, row.duree),
    type: normalizeType(row.typeSeance),
    enseignant: row.enseignant_nom || (row.enseignant_id ? `Enseignant ${row.enseignant_id}` : ""),
    cohorte: row.cohorte_nom || "",
    description: row.statut ? `Statut: ${row.statut}` : "",
  };
}

function mapReservationRow(row) {
  return {
    id: String(row.id),
    seanceId: row.seance_id,
    type: normalizeType(row.typeSeance),
    date: row.dateSeance,
    debut: toHHMM(row.heureDebut),
    fin: addMinutes(row.heureDebut, row.duree),
    cohorteId: row.cohorte_id,
    cohorte: row.cohorte_nom || "-",
    salleId: row.salle_id,
    salle: row.salle_code || "-",
    statut: statusLabel(row.statut),
    demandeType: row.demande_type || "CREATION",
    sourceReservationId: row.source_reservation_id || null,
    createdAt: row.created_at || new Date().toISOString(),
  };
}

function mapSeanceRow(row) {
  return {
    id: String(row.id),
    date: row.dateSeance,
    debut: toHHMM(row.heureDebut),
    fin: addMinutes(row.heureDebut, row.duree),
    type: normalizeType(row.typeSeance),
    statut: row.statut,
    cohorteId: row.cohorte_id,
    enseignantId: row.enseignant_id,
    cohorte: row.cohorte_nom || "-",
    matiere: row.matiere_nom || "Cours",
    salle: row.salle_code || "-",
  };
}

export async function getEnseignantCours({ enseignantId = DEFAULT_ENSEIGNANT_ID } = {}) {
  const rows = await apiFetch(`/api/planning/enseignant/${enseignantId}`);
  return Array.isArray(rows) ? rows.map(mapPlanningRow) : [];
}

export async function getEtudiantCours({ cohorteId = DEFAULT_COHORTE_ID } = {}) {
  const rows = await apiFetch(`/api/planning/cohorte/${cohorteId}`);
  return Array.isArray(rows) ? rows.map(mapPlanningRow) : [];
}

export async function getSeanceDetailsForEnseignant(id, { enseignantId = DEFAULT_ENSEIGNANT_ID } = {}) {
  const rows = await getEnseignantCours({ enseignantId });
  return rows.find((item) => String(item.id) === String(id)) || null;
}

export async function getSeanceDetailsForEtudiant(id, { cohorteId = DEFAULT_COHORTE_ID } = {}) {
  const rows = await getEtudiantCours({ cohorteId });
  return rows.find((item) => String(item.id) === String(id)) || null;
}

export async function getDemandes() {
  const rows = await apiFetch("/api/reservations");
  return Array.isArray(rows) ? rows.map(mapReservationRow) : [];
}

export async function createDemande(demande) {
  return request("/api/reservations", {
    method: "POST",
    data: demande,
    auth: true,
  });
}

export async function getNotifications({ role = "enseignant" } = {}) {
  const demandes = await getDemandes();
  return demandes.slice(0, 20).map((d) => ({
    id: `notif-${role}-${d.id}`,
    status: d.statut === "EN ATTENTE" ? "important" : "lu",
    titre: role === "etudiant" ? "Mise a jour planning" : "Mise a jour reservation",
    message: `${d.type} - ${d.cohorte} - Salle ${d.salle} (${d.statut})`,
    date: d.date,
    iconType: d.statut === "REFUSÉE" ? "warning" : "info",
  }));
}

export async function getCohortes() {
  const rows = await apiFetch("/api/cohortes");
  return Array.isArray(rows) ? rows : [];
}

export async function getSalles() {
  try {
    const rows = await apiFetch("/api/salles");
    if (Array.isArray(rows) && rows.some((s) => s.code)) {
      return rows.map((s) => ({ id: s.id, code: s.code || `Salle ${s.id}` }));
    }
  } catch {
  }

  const reservations = await apiFetch("/api/reservations");
  if (!Array.isArray(reservations)) return [];

  const dedup = new Map();
  reservations.forEach((r) => {
    if (r.salle_id && !dedup.has(r.salle_id)) {
      dedup.set(r.salle_id, {
        id: r.salle_id,
        code: r.salle_code || `Salle ${r.salle_id}`,
      });
    }
  });

  return Array.from(dedup.values());
}

export async function getReservations() {
  const rows = await apiFetch("/api/reservations");
  return Array.isArray(rows) ? rows : [];
}

export async function getSeances() {
  const rows = await apiFetch("/api/seances");
  if (!Array.isArray(rows)) return [];
  return rows.map(mapSeanceRow);
}

export async function getConflits() {
  const rows = await apiFetch("/api/conflits");
  return Array.isArray(rows) ? rows : [];
}

export async function getUsers() {
  try {
    const rows = await request("/api/users", { auth: true });
    if (Array.isArray(rows)) return rows;
  } catch {
  }

  const [etudiants, enseignants] = await Promise.all([
    apiFetch("/api/etudiants").catch(() => []),
    apiFetch("/api/enseignants").catch(() => []),
  ]);

  const eRows = Array.isArray(etudiants)
    ? etudiants.map((u) => ({ ...u, role: u.role || "etudiant" }))
    : [];
  const ensRows = Array.isArray(enseignants)
    ? enseignants.map((u) => ({ ...u, role: u.role || "enseignant" }))
    : [];

  const merged = [...eRows, ...ensRows];
  const dedup = new Map();
  merged.forEach((u) => {
    const key = String(u.id);
    if (!dedup.has(key)) dedup.set(key, u);
  });

  return Array.from(dedup.values());
}
