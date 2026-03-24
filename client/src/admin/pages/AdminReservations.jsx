import { useState } from 'react';
import { mockReservations } from '../../data/mockData';

const STATUTS = ['Tous les statuts', 'Approuvée', 'En attente', 'Refusée'];

export default function AdminReservations() {
  const [statutFilter, setStatutFilter] = useState('Tous les statuts');
  const [reservations, setReservations] = useState(mockReservations);

  const filtered = reservations.filter(r =>
    statutFilter === 'Tous les statuts' || r.statut === statutFilter
  );

  const handleApprove = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, statut: 'Approuvée' } : r));
  };

  const handleReject = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, statut: 'Refusée' } : r));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Gestion des Réservations</h2>
      </div>

      <div className="admin-card">
        <div className="admin-toolbar">
          <div className="filter-select-wrap">
            <select className="filter-select" value={statutFilter} onChange={e => setStatutFilter(e.target.value)}>
              {STATUTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <span className="admin-count">{filtered.length} réservation(s)</span>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Salle</th>
              <th>Enseignant</th>
              <th>Date</th>
              <th>Horaire</th>
              <th>Cours</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td><strong>{r.salle}</strong></td>
                <td>{r.utilisateur}</td>
                <td>{r.date}</td>
                <td>{r.heureDebut}:00 – {r.heureFin}:00</td>
                <td className="admin-td-small">{r.matiere}</td>
                <td>
                  <span className={`admin-badge badge-${r.statut === 'Approuvée' ? 'success' : r.statut === 'En attente' ? 'warning' : 'danger'}`}>
                    {r.statut}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    {r.statut === 'En attente' && (
                      <>
                        <button className="admin-btn-sm btn-approve" onClick={() => handleApprove(r.id)}>Approuver</button>
                        <button className="admin-btn-sm btn-reject" onClick={() => handleReject(r.id)}>Refuser</button>
                      </>
                    )}
                    {r.statut !== 'En attente' && (
                      <button className="admin-btn-icon" title="Supprimer">🗑️</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
