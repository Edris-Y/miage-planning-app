import { useMemo, useState } from "react";
import "../styles/AdminSalles.css";

const ROOM_TYPE_OPTIONS = [
  { value: "ALL", label: "Tous les types" },
  { value: "Amphithéâtre", label: "Amphithéâtre" },
  { value: "Salle de cours", label: "Salle de cours" },
  { value: "Laboratoire", label: "Laboratoire" },
];

const MOCK_ROOMS = [
  {
    id: "room-001",
    name: "Amphi A",
    type: "Amphithéâtre",
    capacity: 200,
    equipments: ["Projecteur", "Micro", "Wi-Fi"],
    status: "Disponible",
  },
  {
    id: "room-002",
    name: "Salle B12",
    type: "Salle de cours",
    capacity: 40,
    equipments: ["Projecteur", "Wi-Fi"],
    status: "Disponible",
  },
  {
    id: "room-003",
    name: "Lab 1",
    type: "Laboratoire",
    capacity: 28,
    equipments: ["Ordinateurs", "Projecteur", "Wi-Fi"],
    status: "Maintenance",
  },
  {
    id: "room-004",
    name: "Salle C3",
    type: "Salle de cours",
    capacity: 34,
    equipments: ["Tableau interactif", "Wi-Fi"],
    status: "Réservée",
  },
];

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

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CapacityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 21V19C16 17.3431 14.6569 16 13 16H7C5.34315 16 4 17.3431 4 19V21M20 21V19C20 18.1091 19.6118 17.2708 18.9497 16.7147C18.2877 16.1586 17.4194 15.9416 16.58 16.12M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 8C19 9.65685 17.6569 11 16 11C15.3503 11 14.7488 10.7931 14.2583 10.441"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20H21M16.5 3.5C16.8978 3.10218 17.4374 2.87866 18 2.87866C18.5626 2.87866 19.1022 3.10218 19.5 3.5C19.8978 3.89782 20.1213 4.43739 20.1213 5C20.1213 5.56261 19.8978 6.10218 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 6H21M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6M10 11V17M14 11V17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getStatusTone(status) {
  if (status === "Maintenance") return "maintenance";
  if (status === "Réservée") return "occupied";
  return "available";
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function AdminSalles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filteredRooms = useMemo(() => {
    const query = normalizeText(searchTerm.trim());

    return MOCK_ROOMS.filter((room) => {
      const matchesSearch =
        !query ||
        normalizeText([room.name, room.type, room.status, ...room.equipments].join(" ")).includes(
          query
        );

      const matchesType = typeFilter === "ALL" || room.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  return (
    <div className="admin-salles-page">
      <div className="admin-salles-shell">
        <header className="admin-salles-header">
          <div className="admin-salles-heading">
            <h1 className="admin-salles-title">Gestion des salles</h1>
            <p className="admin-salles-description">
              Gérez les salles, leurs capacités et les équipements disponibles.
            </p>
          </div>

          <div className="admin-salles-toolbar">
            <label className="admin-salles-search">
              <SearchIcon />
              <input
                type="search"
                placeholder="Rechercher une salle..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Rechercher une salle"
              />
            </label>

            <button type="button" className="admin-salles-add-button">
              <PlusIcon />
              <span>Ajouter une salle</span>
            </button>
          </div>
        </header>

        <section className="admin-salles-panel">
          <div className="admin-salles-panel-top">
            <div className="admin-salles-panel-heading">
              <h2 className="admin-salles-panel-title">Liste des salles</h2>
              <p className="admin-salles-panel-text">
                {filteredRooms.length} salle{filteredRooms.length > 1 ? "s" : ""} affichée
                {filteredRooms.length > 1 ? "s" : ""}
              </p>
            </div>

            <label className="admin-salles-filter">
              <span>Type</span>
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                aria-label="Filtrer les salles par type"
              >
                {ROOM_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filteredRooms.length > 0 ? (
            <div className="admin-salles-table-wrap">
              <table className="admin-salles-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Capacité</th>
                    <th>Équipements</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.id}>
                      <td>
                        <div className="admin-salles-room-name">
                          <span className="admin-salles-room-title">{room.name}</span>
                        </div>
                      </td>

                      <td>
                        <span className="admin-salles-type-badge">{room.type}</span>
                      </td>

                      <td>
                        <span className="admin-salles-capacity">
                          <CapacityIcon />
                          {room.capacity}
                        </span>
                      </td>

                      <td>
                        <div className="admin-salles-equipment-list">
                          {room.equipments.map((equipment) => (
                            <span key={equipment} className="admin-salles-equipment-badge">
                              {equipment}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`admin-salles-status-badge admin-salles-status-badge--${getStatusTone(
                            room.status
                          )}`}
                        >
                          {room.status}
                        </span>
                      </td>

                      <td>
                        <div className="admin-salles-actions">
                          <button
                            type="button"
                            className="admin-salles-action admin-salles-action--edit"
                            aria-label={`Modifier ${room.name}`}
                          >
                            <EditIcon />
                          </button>

                          <button
                            type="button"
                            className="admin-salles-action admin-salles-action--delete"
                            aria-label={`Supprimer ${room.name}`}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-salles-empty">
              Aucune salle ne correspond à votre recherche pour le moment.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
