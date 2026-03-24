import { useState } from 'react';
import { mockUtilisateurs } from '../../data/mockData';

const ROLES = ['Tous les rôles', 'Étudiant', 'Enseignant', 'Administrateur'];

export default function AdminUtilisateurs() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tous les rôles');
  const [users, setUsers] = useState(mockUtilisateurs);

  const filtered = users.filter(u => {
    const matchSearch = u.nom.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'Tous les rôles' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleToggle = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, statut: u.statut === 'Actif' ? 'Inactif' : 'Actif' } : u
    ));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Gestion des Utilisateurs</h2>
        <button className="admin-btn-primary">+ Ajouter un utilisateur</button>
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
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-select-wrap">
            <select className="filter-select" value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <span className="admin-count">{filtered.length} utilisateur(s)</span>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id}>
                <td><strong>{user.nom}</strong></td>
                <td className="admin-td-small">{user.email}</td>
                <td>
                  <span className={`admin-badge badge-${user.role === 'Administrateur' ? 'info' : user.role === 'Enseignant' ? 'primary' : 'neutral'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`admin-badge badge-${user.statut === 'Actif' ? 'success' : 'danger'}`}>
                    {user.statut}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn-icon" title="Modifier">✏️</button>
                    <button
                      className="admin-btn-icon"
                      title={user.statut === 'Actif' ? 'Désactiver' : 'Activer'}
                      onClick={() => handleToggle(user.id)}
                    >
                      {user.statut === 'Actif' ? '🔒' : '🔓'}
                    </button>
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
