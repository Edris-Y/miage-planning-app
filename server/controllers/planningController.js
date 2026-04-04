const ApiError = require("../utils/ApiError");
const planningModel = require("../models/planning.model");

function pad(n) {
  return String(n).padStart(2, "0");
}

function computeEndTime(date, startTime, durationMinutes) {
  const start = new Date(`${date}T${startTime}:00`);
  const end = new Date(start.getTime() + Number(durationMinutes || 0) * 60000);
  return `${pad(end.getHours())}:${pad(end.getMinutes())}`;
}

function formatPlanningRows(rows) {
  return rows.map((row) => ({
    id: row.id,
    matiere: row.matiere,
    titre: row.description || row.matiere || "Séance",
    salle: row.salle,
    date: row.dateSeance,
    debut: row.heureDebut,
    fin: computeEndTime(row.dateSeance, row.heureDebut, row.duree),
    type: row.typeSeance === "EXAMEN" ? "EXAM" : row.typeSeance,
    enseignant: row.enseignant_nom
      ? `${row.enseignant_prenom} ${row.enseignant_nom}`
      : null,
    cohorte: row.cohorte_nom || null,
    description: row.description || null,
    statut: row.statut,
    duree: row.duree,
  }));
}

exports.getByCohorteId = async (req, res) => {
  const cohorteId = Number(req.params.id);

  if (!Number.isInteger(cohorteId)) {
    throw new ApiError(400, "Id cohorte invalide");
  }

  const rows = await planningModel.findByCohorteId(cohorteId);
  res.json(formatPlanningRows(rows));
};

exports.getByEnseignantId = async (req, res) => {
  const enseignantId = Number(req.params.id);

  if (!Number.isInteger(enseignantId)) {
    throw new ApiError(400, "Id enseignant invalide");
  }

  const rows = await planningModel.findByEnseignantId(enseignantId);
  res.json(formatPlanningRows(rows));
};

exports.getSeanceById = async (req, res) => {
  const seanceId = Number(req.params.id);

  if (!Number.isInteger(seanceId)) {
    throw new ApiError(400, "Id séance invalide");
  }

  const row = await planningModel.findSeanceById(seanceId);

  if (!row) {
    throw new ApiError(404, "Séance introuvable");
  }

  res.json(formatPlanningRows([row])[0]);
};