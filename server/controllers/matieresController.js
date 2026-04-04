const ApiError = require("../utils/ApiError");
const matiereModel = require("../models/matiere.model");

exports.getAll = async (_req, res) => {
  const rows = await matiereModel.findAll();
  res.json(rows);
};

exports.getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id matière invalide");
  }

  const row = await matiereModel.findById(id);

  if (!row) {
    throw new ApiError(404, "Matière introuvable");
  }

  res.json(row);
};

exports.create = async (req, res) => {
  const { nom, volumeHoraireTotal = 0 } = req.body;

  const nomNettoye = String(nom || "").trim();
  const volume = Number(volumeHoraireTotal);

  if (!nomNettoye) {
    throw new ApiError(400, "Nom de matière requis");
  }

  if (!Number.isInteger(volume) || volume < 0) {
    throw new ApiError(400, "volumeHoraireTotal invalide");
  }

  const existing = await matiereModel.findByNom(nomNettoye);

  if (existing) {
    throw new ApiError(409, "Cette matière existe déjà");
  }

  const result = await matiereModel.create({
    nom: nomNettoye,
    volumeHoraireTotal: volume,
  });

  const created = await matiereModel.findById(result.lastID);

  res.status(201).json({
    message: "Matière créée avec succès",
    matiere: created,
  });
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id matière invalide");
  }

  const existing = await matiereModel.findById(id);

  if (!existing) {
    throw new ApiError(404, "Matière introuvable");
  }

  const finalNom = req.body.nom ?? existing.nom;
  const finalVolume =
    req.body.volumeHoraireTotal ?? existing.volumeHoraireTotal;

  const nomNettoye = String(finalNom || "").trim();
  const volume = Number(finalVolume);

  if (!nomNettoye) {
    throw new ApiError(400, "Nom de matière requis");
  }

  if (!Number.isInteger(volume) || volume < 0) {
    throw new ApiError(400, "volumeHoraireTotal invalide");
  }

  const duplicate = await matiereModel.findByNomExceptId(nomNettoye, id);

  if (duplicate) {
    throw new ApiError(409, "Une autre matière porte déjà ce nom");
  }

  await matiereModel.update(id, {
    nom: nomNettoye,
    volumeHoraireTotal: volume,
  });

  const updated = await matiereModel.findById(id);

  res.json({
    message: "Matière mise à jour",
    matiere: updated,
  });
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw new ApiError(400, "Id matière invalide");
  }

  const existing = await matiereModel.findById(id);

  if (!existing) {
    throw new ApiError(404, "Matière introuvable");
  }

  await matiereModel.remove(id);

  res.json({
    message: "Matière supprimée",
    id,
  });
};