const ApiError = require("../utils/ApiError");
const salleModel = require("../models/salle.model");

const TYPES_VALIDES = ["AMPHI", "TD", "TP", "LABO", "INFO"];

function normalizeSalleType(type) {
  return String(type || "").trim().toUpperCase();
}

function toBooleanInt(value, defaultValue = 0) {
  if (value === undefined || value === null) {
    return defaultValue ? 1 : 0;
  }
  return value ? 1 : 0;
}

function toPositiveInteger(value, fieldName) {
  const num = Number(value);

  if (!Number.isInteger(num) || num <= 0) {
    throw new ApiError(400, `${fieldName} invalide`);
  }

  return num;
}

exports.getAll = async (_req, res) => {
  const rows = await salleModel.findAll();
  res.json(rows);
};

exports.getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id salle invalide");
  }

  const row = await salleModel.findById(id);

  if (!row) {
    throw new ApiError(404, "Salle introuvable");
  }

  res.json(row);
};

exports.create = async (req, res) => {
  const {
    code,
    capacite,
    type,
    accessibilitePMR = 0,
    isActive = 1,
  } = req.body;

  const finalCode = String(code || "").trim();
  const finalType = normalizeSalleType(type);

  if (!finalCode || capacite === undefined || capacite === null || !type) {
    throw new ApiError(400, "Champs requis manquants");
  }

  if (!TYPES_VALIDES.includes(finalType)) {
    throw new ApiError(400, "Type de salle invalide");
  }

  const finalCapacite = toPositiveInteger(capacite, "Capacité");

  const existing = await salleModel.findByCode(finalCode);
  if (existing) {
    throw new ApiError(409, "Ce code salle existe déjà");
  }

  const result = await salleModel.create({
    code: finalCode,
    capacite: finalCapacite,
    type: finalType,
    accessibilitePMR: toBooleanInt(accessibilitePMR, 0),
    isActive: toBooleanInt(isActive, 1),
  });

  const created = await salleModel.findById(result.lastID);

  res.status(201).json({
    message: "Salle créée avec succès",
    salle: created,
  });
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id salle invalide");
  }

  const existing = await salleModel.findById(id);
  if (!existing) {
    throw new ApiError(404, "Salle introuvable");
  }

  const finalCode = String(req.body.code ?? existing.code).trim();
  const finalCapacite =
    req.body.capacite !== undefined
      ? toPositiveInteger(req.body.capacite, "Capacité")
      : existing.capacite;
  const finalType =
    req.body.type !== undefined
      ? normalizeSalleType(req.body.type)
      : existing.type;
  const finalPMR =
    req.body.accessibilitePMR !== undefined
      ? toBooleanInt(req.body.accessibilitePMR)
      : existing.accessibilitePMR;
  const finalIsActive =
    req.body.isActive !== undefined
      ? toBooleanInt(req.body.isActive)
      : existing.isActive;

  if (!finalCode) {
    throw new ApiError(400, "Code salle requis");
  }

  if (!TYPES_VALIDES.includes(finalType)) {
    throw new ApiError(400, "Type de salle invalide");
  }

  const duplicate = await salleModel.findByCode(finalCode);
  if (duplicate && Number(duplicate.id) !== id) {
    throw new ApiError(409, "Une autre salle porte déjà ce code");
  }

  await salleModel.update(id, {
    code: finalCode,
    capacite: finalCapacite,
    type: finalType,
    accessibilitePMR: finalPMR,
    isActive: finalIsActive,
  });

  const updated = await salleModel.findById(id);

  res.json({
    message: "Salle mise à jour",
    salle: updated,
  });
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id salle invalide");
  }

  const existing = await salleModel.findById(id);
  if (!existing) {
    throw new ApiError(404, "Salle introuvable");
  }

  const linkedReservation = await salleModel.findLinkedReservation(id);
  if (linkedReservation) {
    throw new ApiError(
      409,
      "Impossible de supprimer cette salle : elle est encore utilisée dans une réservation"
    );
  }

  await salleModel.remove(id);

  res.json({
    message: "Salle supprimée",
    id,
  });
};