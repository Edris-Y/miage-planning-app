const { dbAll, dbGet, dbRun } = require("../db/dbAsync");
const { getDbConnection } = require("../db/database");

exports.findAll = () =>
dbAll(`
    SELECT *
    FROM Salle
    ORDER BY code ASC
  `);

exports.findById = (id) =>
dbGet(
  `
    SELECT *
    FROM Salle
    WHERE id = ?
    `,
  [id]
);

exports.findByCode = (code) =>
dbGet(
  `
    SELECT *
    FROM Salle
    WHERE code = ?
    `,
  [code]
);

exports.findActive = () =>
dbAll(`
    SELECT *
    FROM Salle
    WHERE isActive = 1
    ORDER BY code ASC
  `);

exports.create = ({
  code,
  capacite,
  type,
  accessibilitePMR = 0,
  isActive = 1
}) =>
dbRun(
  `
    INSERT INTO Salle (code, capacite, type, accessibilitePMR, isActive)
    VALUES (?, ?, ?, ?, ?)
    `,
  [code, capacite, type, accessibilitePMR, isActive]
);

exports.update = (
id,
{ code, capacite, type, accessibilitePMR, isActive }) =>

dbRun(
  `
    UPDATE Salle
    SET
      code = ?,
      capacite = ?,
      type = ?,
      accessibilitePMR = ?,
      isActive = ?
    WHERE id = ?
    `,
  [code, capacite, type, accessibilitePMR, isActive, id]
);

exports.remove = async (id) => {
  const db = await getDbConnection();

  try {
    await db.exec("BEGIN TRANSACTION;");

    const seanceColumns = await db.all("PRAGMA table_info(Seance);");
    const hasSalleIdInSeance = seanceColumns.some((column) => column.name === "salle_id");

    if (hasSalleIdInSeance) {
      await db.run("UPDATE Seance SET salle_id = NULL WHERE salle_id = ?", [id]);
    }

    await db.run("DELETE FROM Reservation WHERE salle_id = ?", [id]);
    await db.run("DELETE FROM Equipement WHERE salle_id = ?", [id]);
    await db.run("DELETE FROM MaintenanceSalle WHERE salle_id = ?", [id]);

    const result = await db.run(
      `
      DELETE FROM Salle
      WHERE id = ?
      `,
      [id]
    );

    await db.exec("COMMIT;");
    return {
      changes: result.changes,
      lastID: result.lastID
    };
  } catch (error) {
    await db.exec("ROLLBACK;");
    throw error;
  } finally {
    await db.close();
  }
};