import { useMemo, useState } from "react";
import "../styles/AdminReservations.css";

const MOCK_RESERVATIONS = [
  {
    id: "res-001",
    teacher: "Dr. Martin",
    sessionType: "CM",
    date: "2026-02-12",
    startTime: "14:00",
    endTime: "16:00",
    cohort: "M1 Informatique",
    room: "Amphi B",
    status: "EN_ATTENTE",
    isConflict: false,
  },
  {
    id: "res-002",
    teacher: "Prof. Dupont",
    sessionType: "TP",
    date: "2026-02-12",
    startTime: "14:00",
    endTime: "16:00",
    cohort: "L3 Informatique",
    room: "Amphi B",
    status: "EN_ATTENTE",
    isConflict: true,
  },
  {
    id: "res-003",
    teacher: "Prof. Rousseau",
    sessionType: "TD",
    date: "2026-02-15",
    startTime: "10:00",
    endTime: "12:00",
    cohort: "L2 Informatique",
    room: "Salle B12",
    status: "EN_ATTENTE",
    isConflict: false,
  },
];

const MOCK_STATS = [
  { label: "EN ATTENTE", value: 3, tone: "waiting" },
  { label: "AVEC CONFLITS", value: 1, tone: "conflict" },
  { label: "VALIDÉES AUJOURD'HUI", value: 8, tone: "validated" },
];

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDateLabel(dateString) {
  const formatted = DATE_FORMATTER.format(new Date(`${dateString}T12:00:00`));
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 21L16.65 16.65M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 17H9M17 8.5C17 7.17392 16.4732 5.90215 15.5355 4.96447C14.5979 4.02678 13.3261 3.5 12 3.5C10.6739 3.5 9.40215 4.02678 8.46447 4.96447C7.52678 5.90215 7 7.17392 7 8.5V11.132C7.00004 11.648 6.84031 12.1513 6.54293 12.5728L5.75 13.697H18.25L17.4571 12.5728C17.1597 12.1513 17 11.648 17 11.132V8.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 7V12L15 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 9V12.5M12 16H12.01M10.29 3.86002L1.82001 18C1.64538 18.3024 1.553 18.6451 1.55206 18.9944C1.55113 19.3436 1.64167 19.6868 1.81468 19.9901C1.98769 20.2934 2.23706 20.546 2.53811 20.723C2.83916 20.8999 3.18126 20.995 3.53001 20.999L20.47 21C20.8188 20.995 21.1609 20.8999 21.4619 20.723C21.763 20.546 22.0123 20.2934 22.1853 19.9901C22.3584 19.6868 22.4489 19.3436 22.4479 18.9944C22.447 18.6451 22.3546 18.3024 22.18 18L13.71 3.86002C13.5318 3.56613 13.2819 3.32208 12.9837 3.15096C12.6855 2.97984 12.3485 2.88733 12.005 2.88232C11.6616 2.87731 11.322 2.95998 11.0188 3.12235C10.7156 3.28471 10.4587 3.52137 10.29 3.81002"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17L4 12M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatIcon({ tone }) {
  if (tone === "conflict") {
    return <WarningIcon />;
  }

  if (tone === "validated") {
    return <CheckIcon />;
  }

  return <ClockIcon />;
}

export default function AdminReservations() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReservations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return MOCK_RESERVATIONS;
    }

    return MOCK_RESERVATIONS.filter((reservation) =>
      [
        reservation.teacher,
        reservation.sessionType,
        reservation.cohort,
        reservation.room,
        reservation.status,
        formatDateLabel(reservation.date),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [searchTerm]);

  return (
    <>
      <div className="admin-reservations-page">
        <div className="admin-reservations-shell">
          <section className="admin-reservations-frame">
            <header className="admin-reservations-header">
              <h1 className="admin-reservations-title">Gestion des réservations</h1>

              <div className="admin-reservations-tools">
                <label className="admin-reservations-search">
                  <SearchIcon />
                  <input
                    type="search"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    aria-label="Rechercher une réservation"
                  />
                </label>

                <button
                  type="button"
                  className="admin-reservations-notification"
                  aria-label="Notifications"
                >
                  <BellIcon />
                  <span className="admin-reservations-notification-badge">3</span>
                </button>
              </div>
            </header>

            <div className="admin-reservations-content">
              <section className="admin-reservations-stats" aria-label="Statistiques">
                {MOCK_STATS.map((stat) => (
                  <article key={stat.label} className="admin-reservations-stat-card">
                    <div>
                      <span className="admin-reservations-stat-label">{stat.label}</span>
                      <strong className="admin-reservations-stat-value">{stat.value}</strong>
                    </div>

                    <span
                      className={`admin-reservations-stat-icon admin-reservations-stat-icon--${stat.tone}`}
                    >
                      <StatIcon tone={stat.tone} />
                    </span>
                  </article>
                ))}
              </section>

              <section className="admin-reservations-panel">
                <div className="admin-reservations-panel-header">
                  <h2 className="admin-reservations-panel-title">
                    Demandes de réservation ({filteredReservations.length})
                  </h2>
                </div>

                {filteredReservations.length > 0 ? (
                  <div className="admin-reservations-table-wrap">
                    <table className="admin-reservations-table">
                      <thead>
                        <tr>
                          <th>Enseignant</th>
                          <th>Type</th>
                          <th>Date &amp; Horaire</th>
                          <th>Cohorte</th>
                          <th>Salle</th>
                          <th>Statut</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredReservations.map((reservation) => (
                          <tr
                            key={reservation.id}
                            className={reservation.isConflict ? "admin-reservations-row--conflict" : ""}
                          >
                            <td>
                              <div className="admin-reservations-teacher">
                                {reservation.isConflict ? (
                                  <span className="admin-reservations-conflict-icon">
                                    <WarningIcon />
                                  </span>
                                ) : null}
                                <span>{reservation.teacher}</span>
                              </div>
                            </td>

                            <td>
                              <span className="admin-reservations-type-badge">
                                {reservation.sessionType}
                              </span>
                            </td>

                            <td>
                              <div className="admin-reservations-datetime">
                                <span className="admin-reservations-date">
                                  {formatDateLabel(reservation.date)}
                                </span>
                                <span className="admin-reservations-time">
                                  {reservation.startTime} - {reservation.endTime}
                                </span>
                              </div>
                            </td>

                            <td>{reservation.cohort}</td>
                            <td>{reservation.room}</td>

                            <td>
                              <span className="admin-reservations-status-badge">
                                {reservation.status}
                              </span>
                            </td>

                            <td>
                              <span className="admin-reservations-details">Détails</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="admin-reservations-empty">
                    Aucune réservation ne correspond à la recherche.
                  </div>
                )}
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
