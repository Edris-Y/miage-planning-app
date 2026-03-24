import { useState } from 'react';
import { mockSalles } from '../../data/mockData';

export default function AdminSalles() {
  const [search, setSearch] = useState('');
  const [salles, setSalles] = useState(mockSalles);

  const filtered = salles.filter(s =>
    s.nom.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette salle ?')) {
      setSalles(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Gestion des Salles</h2>
        <button className="admin-btn-primary">+ Ajouter une salle</button>
      </div>

      <div className="admin-card">
        <div className="admin-toolbar">
          <div className="admin-search-wrap">
            <svg className="admin-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="admin-search-input"
              type="text"
              placeholder="Rechercher une salle..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span className="admin-count">{filtered.length} salle(s)</span>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Capacité</th>
              <th>Type</th>
              <th>Équipement</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(salle => (
              <tr key={salle.id}>
                <td><strong>{salle.nom}</strong></td>
                <td>{salle.capacite} places</td>
                <td>{salle.type}</td>
                <td className="admin-td-small">{salle.equipement}</td>
                <td>
                  <span className={`admin-badge badge-${salle.statut === 'Disponible' ? 'success' : salle.statut === 'Occupée' ? 'warning' : 'danger'}`}>
                    {salle.statut}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" title="Modifier">✏️</button>
                    <button className="admin-btn-icon" title="Supprimer" onClick={() => handleDelete(salle.id)}>🗑️</button>
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
