// src/components/CourseBlock.jsx
import { COURSE_TYPES } from '../data/mockData';

const CELL_H = 52; // hauteur exacte d'une ligne = 1h

export default function CourseBlock({ cours }) {
  const duree = cours.heureFin - cours.heureDebut;
  const couleur = COURSE_TYPES[cours.type]?.color || '#6b7280';
  const hauteur = duree * CELL_H - 6; // -6px pour les marges top+bottom

  return (
    <div
      className="course-blk"
      style={{ background: couleur, height: `${hauteur}px` }}
      title={`${cours.matiere} — ${cours.salle}`}
    >
      <div className="course-blk-title">{cours.matiere}</div>
      {cours.salle && <div className="course-blk-salle">{cours.salle}</div>}
      <div className="course-blk-heure">{cours.heureDebut}:00 - {cours.heureFin}:00</div>
    </div>
  );
}
