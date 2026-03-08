// src/Components/WeekCalendar.jsx
import { COURSE_TYPES } from '../data/mockData';

const calendarStyles = `
  .cal-outer {
    background: #fff;
    overflow: hidden;
    font-family: 'Segoe UI', sans-serif;
  }

  /* Légende */
  .cal-legend {
    display: flex;
    gap: 20px;
    padding: 10px 16px 10px;
    border-bottom: 1px solid #d8e2f0;
  }
  .cal-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: #374151;
  }
  .cal-legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  /* Grille */
  .cal-grid {
    display: grid;
    grid-template-columns: 56px repeat(7, 1fr);
    border-left: 1px solid #d8e2f0;
  }

  /* Header */
  .cal-header-spacer {
    background: #f6f9fd;
    border-right: 1px solid #d8e2f0;
    border-bottom: 1px solid #d8e2f0;
    height: 50px;
  }
  .cal-day-header {
    background: #f6f9fd;
    border-right: 1px solid #d8e2f0;
    border-bottom: 1px solid #d8e2f0;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 4px 2px;
    box-sizing: border-box;
  }
  .cal-day-name {
    font-size: 11px;
    color: #8293ab;
    font-weight: 400;
    text-transform: lowercase;
  }
  .cal-day-num {
    font-size: 13px;
    font-weight: 600;
    color: #1e2d4a;
    line-height: 1;
  }

  .cal-day-month {
    font-size: 11px;
    color: #4d617f;
    line-height: 1;
    text-transform: lowercase;
  }

  .cal-day-num.is-today {
    background: #1e2d4a;
    color: #fff;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .cal-day-month.is-today {
    font-weight: 600;
    color: #1e2d4a;
  }

  /* Cellules */
  .cal-time-cell {
    font-size: 11px;
    color: #8293ab;
    font-weight: 400;
    text-align: right;
    padding: 5px 8px 0 0;
    border-right: 1px solid #d8e2f0;
    border-bottom: 1px solid #e7edf6;
    height: 52px;
    box-sizing: border-box;
  }
  .cal-cell {
    border-right: 1px solid #d8e2f0;
    border-bottom: 1px solid #e7edf6;
    height: 52px;
    position: relative;
    box-sizing: border-box;
  }

  /* Blocs cours — taille contrôlée, jamais overflow */
  .course-blk {
    position: absolute;
    left: 3px;
    right: 3px;
    top: 3px;
    border-radius: 6px;
    padding: 5px 7px;
    cursor: pointer;
    overflow: hidden;
    z-index: 2;
    transition: filter 0.15s;
    box-sizing: border-box;
  }
  .course-blk:hover { filter: brightness(0.9); }

  .course-blk-title {
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-blk-salle {
    font-size: 10px;
    color: rgba(255,255,255,0.9);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .course-blk-heure {
    font-size: 10px;
    color: rgba(255,255,255,0.85);
    line-height: 1.3;
  }
`;

const DAYS_FR = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const HOURS   = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const CELL_H  = 52; // hauteur exacte d'une ligne = 1h

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  return d;
}

function isToday(date) {
  const t = new Date();
  return date.toDateString() === t.toDateString();
}

export default function WeekCalendar({ cours = [], currentDate }) {
  const monday = getMonday(currentDate);

  const weekDays = DAYS_FR.map((name, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { name, date: d, index: i };
  });

  return (
    <>
      <style>{calendarStyles}</style>
      <div className="cal-outer">

        {/* Légende */}
        <div className="cal-legend">
          {Object.entries(COURSE_TYPES).map(([key, val]) => (
            <div key={key} className="cal-legend-item">
              <div className="cal-legend-dot" style={{ background: val.color }} />
              {val.label}
            </div>
          ))}
        </div>

        {/* Grille */}
        <div className="cal-grid">

          {/* Row 0 : headers */}
          <div className="cal-header-spacer" />
          {weekDays.map(({ name, date, index }) => (
            <div key={index} className="cal-day-header">
              <span className="cal-day-name">{name}</span>
              <span className={`cal-day-num${isToday(date) ? ' is-today' : ''}`}>
                {date.getDate()}
              </span>
              <span className={`cal-day-month${isToday(date) ? ' is-today' : ''}`}>
                {date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}
              </span>
            </div>
          ))}

          {/* Rows horaires */}
          {HOURS.map(hour => (
            <React_Fragment key={hour} hour={hour} weekDays={weekDays} cours={cours} />
          ))}
        </div>
      </div>
    </>
  );
}

// Composant interne pour éviter le warning React key dans Fragment
function React_Fragment({ hour, weekDays, cours }) {
  return (
    <>
      <div className="cal-time-cell">{hour}:00</div>
      {weekDays.map(({ index: jourIdx }) => {
        const coursIci = cours.filter(c => c.jour === jourIdx && c.heureDebut === hour);
        return (
          <div key={jourIdx} className="cal-cell">
            {coursIci.map(c => {
              const duree  = c.heureFin - c.heureDebut;
              const couleur = COURSE_TYPES[c.type]?.color || '#6b7280';
              const hauteur = duree * CELL_H - 6; // -6px pour les marges top+bottom
              return (
                <div
                  key={c.id}
                  className="course-blk"
                  style={{ background: couleur, height: `${hauteur}px` }}
                  title={`${c.matiere} — ${c.salle}`}
                >
                  <div className="course-blk-title">{c.matiere}</div>
                  {c.salle && <div className="course-blk-salle">{c.salle}</div>}
                  <div className="course-blk-heure">{c.heureDebut}:00 - {c.heureFin}:00</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}