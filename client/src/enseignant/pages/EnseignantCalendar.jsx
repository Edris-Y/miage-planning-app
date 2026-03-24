import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockEnseignantCours } from "../../data/mockData";
import Navbar from "../../components/Navbar";
import "../../styles/enseignant.css";

const VIEW_OPTIONS = ["Jour", "Semaine", "Mois"];
const HOURS = Array.from({ length: 9 }, (_, i) => i + 8);
const DAYS_FR = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const TYPE_COLORS = { CM: "cm", TD: "td", TP: "tp", Examen: "exam" };

const LEGEND = [
  { label: "CM",     color: "#3b7cf4" },
  { label: "TD",     color: "#22c17a" },
  { label: "TP",     color: "#f59e0b" },
  { label: "Examen", color: "#ef4444" },
];

function getWeekDays(date) {
  const d = new Date(date);
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const dd = new Date(monday);
    dd.setDate(monday.getDate() + i);
    return dd;
  });
}

function getMonthDays(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  const days = [];
  while (d.getMonth() === date.getMonth()) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

function formatViewLabel(currentDate, view, days) {
  if (view === "Jour") {
    return currentDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }
  if (view === "Semaine") {
    return `Semaine du ${days[0].toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`;
  }
  if (view === "Mois") {
    return `Mois de ${currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`;
  }
  return "";
}

function isSameDay(a, b) {
  return a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();
}

function isToday(d) { return isSameDay(d, new Date()); }

export default function EnseignantCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Semaine");
  const [activeType, setActiveType] = useState("Tous");

  const weekDays = useMemo(() => {
    if (view === "Jour") return [new Date(currentDate)];
    if (view === "Mois") return getMonthDays(currentDate);
    return getWeekDays(currentDate);
  }, [currentDate, view]);

  const goToPrev = () => {
    const d = new Date(currentDate);
    if (view === "Jour") d.setDate(d.getDate() - 1);
    else if (view === "Mois") d.setMonth(d.getMonth() - 1);
    else d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };
  const goToNext = () => {
    const d = new Date(currentDate);
    if (view === "Jour") d.setDate(d.getDate() + 1);
    else if (view === "Mois") d.setMonth(d.getMonth() + 1);
    else d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const filteredCours = useMemo(() =>
    activeType === "Tous"
      ? mockEnseignantCours
      : mockEnseignantCours.filter(c => c.type === activeType),
    [activeType]
  );

  const exportCsv = () => {
    if (!filteredCours.length) {
      alert('Aucun cours à exporter.');
      return;
    }
    const csvRows = [
      ["id","matiere","salle","jour","heureDebut","heureFin","type"],
      ...filteredCours.map(c => [
        c.id,
        c.matiere,
        c.salle,
        c.jour !== undefined ? c.jour : '',
        c.heureDebut !== undefined ? c.heureDebut : '',
        c.heureFin !== undefined ? c.heureFin : '',
        c.type
      ])
    ];

    const csvContent = csvRows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `emploi_du_temps_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCoursForDayHour = (dayDate, hour) =>
    filteredCours.filter(c => {
      if (c.date && c.debut) {
        return isSameDay(new Date(c.date), dayDate) && Number(c.debut.split(":")[0]) === hour;
      }
      if (typeof c.jour === "number") {
        return c.jour === (dayDate.getDay() + 6) % 7 && c.heureDebut === hour;
      }
      return false;
    });

  return (
    <div className="ens-page">
      <Navbar onExport={exportCsv} />

      <div className="ens-content">

        <div style={{
          background: "#fff", borderRadius: 12, border: "1px solid #e4eaf4",
          padding: "16px 20px", marginBottom: 14,
          boxShadow: "0 1px 6px rgba(15,35,66,.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.2" strokeLinecap="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            <span style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".07em" }}>
              Actions rapides
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="ens-btn-outline" style={{ fontSize: ".84rem" }}
              onClick={() => navigate('/enseignant/demandes')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              Demandes de réservation
            </button>
            <button className="ens-btn-outline" style={{ fontSize: ".84rem" }}
              onClick={() => navigate('/enseignant/cohortes')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              EDT Cohortes
            </button>
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#fff", borderRadius: 10, border: "1px solid #e4eaf4",
          padding: "10px 16px", marginBottom: 12,
          boxShadow: "0 1px 4px rgba(15,35,66,.05)", flexWrap: "wrap", gap: 12
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="ens-today-btn" onClick={() => setCurrentDate(new Date())}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Aujourd'hui
            </button>
            <button className="ens-nav-btn" onClick={goToPrev}>‹</button>
            <span style={{ fontWeight: 700, fontSize: ".88rem", color: "var(--text)", minWidth: 230, textAlign: "center" }}>
              {formatViewLabel(currentDate, view, weekDays)}
            </span>
            <button className="ens-nav-btn" onClick={goToNext}>›</button>
          </div>

          <div className="ens-toggle-group">
            {VIEW_OPTIONS.map(opt => (
              <button key={opt} className={view === opt ? "active" : ""} onClick={() => setView(opt)}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
          {LEGEND.map(({ label, color }) => (
            <button
              key={label}
              onClick={() => setActiveType(activeType === label ? "Tous" : label)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "4px 12px", borderRadius: 20,
                border: "none", cursor: "pointer",
                background: activeType === label ? "#f0f4fb" : "transparent",
                fontSize: ".82rem", fontWeight: 600,
                color: activeType === label ? "var(--text)" : "var(--muted)",
                transition: "all .15s"
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
              {label}
            </button>
          ))}
        </div>

        <div className="ens-card" style={{ padding: "0 0 8px", overflow: "hidden" }}>
          <div className="ens-calendar-wrapper">
            <table className="ens-calendar">
              <thead>
                <tr>
                  <th style={{ width: 56, border: "none", background: "#fff" }} />
                  {weekDays.map((day, i) => {
                    const today = isToday(day);
                    return (
                      <th key={i} style={{
                        textAlign: "center", padding: "12px 4px 10px",
                        borderBottom: "1px solid #edf1f8", background: "#fff"
                      }}>
                        <span style={{
                          display: "block", fontSize: ".72rem", fontWeight: 700,
                          textTransform: "capitalize", letterSpacing: ".04em",
                          color: today ? "var(--primary)" : "var(--muted)"
                        }}>
                          {DAYS_FR[(day.getDay() + 6) % 7]}
                        </span>
                        <span style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: 30, height: 30, borderRadius: "50%", marginTop: 3,
                          fontSize: ".92rem", fontWeight: 700,
                          background: today ? "#eef4ff" : "transparent",
                          color: today ? "var(--primary)" : "var(--text)",
                          border: today ? "1.5px solid #b8d0f9" : "none"
                        }}>
                          {day.getDate()}
                        </span>
                        <span style={{ display: "block", fontSize: ".7rem", color: "var(--muted)", marginTop: 1 }}>
                          {day.toLocaleDateString("fr-FR", { month: "short" })}.
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {HOURS.map(hour => (
                  <tr key={hour} style={{ height: 60 }}>
                    <td style={{
                      width: 56, textAlign: "right", paddingRight: 12,
                      fontSize: ".72rem", fontWeight: 500, color: "var(--muted)",
                      verticalAlign: "top", paddingTop: 8,
                      border: "none", borderTop: "1px solid #f0f3fa",
                      fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap",
                      background: "#fff"
                    }}>
                      {hour}:00
                    </td>
                    {weekDays.map((day, di) => {
                      const sessions = getCoursForDayHour(day, hour);
                      return (
                        <td key={di} style={{ position: "relative", padding: 2, border: "1px solid #f0f3fa" }}>
                          {sessions.map(s => {
                            const debut = s.debut ?? `${String(s.heureDebut ?? 0).padStart(2, "0")}:00`;
                            const fin   = s.fin   ?? `${String(s.heureFin  ?? 0).padStart(2, "0")}:00`;
                            const [sh, sm] = debut.split(":").map(Number);
                            const [eh, em] = fin.split(":").map(Number);
                            const durationH = (eh + em / 60) - (sh + sm / 60);
                            return (
                              <div
                                key={s.id}
                                className={`ens-session ens-session-${TYPE_COLORS[s.type] ?? "cm"}`}
                                style={{ height: `${Math.max(durationH * 60 - 4, 44)}px`, top: 2 }}
                                onClick={() => navigate(`/enseignant/seance/${s.id}`)}
                              >
                                <div className="ens-session-title">{s.titre ?? s.matiere ?? "Cours"}</div>
                                <div className="ens-session-room">{s.salle}</div>
                                <div className="ens-session-time">{debut} – {fin}</div>
                              </div>
                            );
                          })}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}