const ApiError = require("../utils/ApiError");
const equipementModel = require("../models/equipement.model");
const { dbGet } = require("../db/dbAsync");

exports.getAll = async (_req, res) => {
  const rows = await equipementModel.findAll();
  res.json(rows);
};

exports.getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id équipement invalide");
  }

  const row = await equipementModel.findById(id);

  if (!row) {
    throw new ApiError(404, "Équipement introuvable");
  }

  res.json(row);
};

exports.create = async (req, res) => {
  const { nom, salle_id } = req.body;

  if (!nom || !salle_id) {
    throw new ApiError(400, "Nom et salle_id sont requis");
  }

  const salle = await dbGet(
    `
    SELECT id
    FROM Salle
    WHERE id = ?
    `,
    [Number(salle_id)]
  );

  if (!salle) {
    throw new ApiError(404, "Salle introuvable");
  }

  const result = await equipementModel.create({
    nom: String(nom).trim(),
    salle_id: Number(salle_id),
  });

  const created = await equipementModel.findById(result.lastID);

  res.status(201).json({
    message: "Équipement créé avec succès",
    equipement: created,
  });
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id équipement invalide");
  }

  const existing = await equipementModel.findById(id);

  if (!existing) {
    throw new ApiError(404, "Équipement introuvable");
  }

  const finalNom = req.body.nom ?? existing.nom;
  const finalSalleId = req.body.salle_id ?? existing.salle_id;

  const salle = await dbGet(
    `
    SELECT id
    FROM Salle
    WHERE id = ?
    `,
    [Number(finalSalleId)]
  );

  if (!salle) {
    throw new ApiError(404, "Salle introuvable");
  }

  await equipementModel.update(id, {
    nom: String(finalNom).trim(),
    salle_id: Number(finalSalleId),
  });

  const updated = await equipementModel.findById(id);

  res.json({
    message: "Équipement mis à jour",
    equipement: updated,
  });
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id équipement invalide");
  }

  const existing = await equipementModel.findById(id);

  if (!existing) {
    throw new ApiError(404, "Équipement introuvable");
  }

  await equipementModel.remove(id);

  res.json({
    message: "Équipement supprimé",
    id,
  });
};