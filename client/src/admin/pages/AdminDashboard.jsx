import { mockSalles, mockUtilisateurs, mockReservations, mockConflits } from '../../data/mockData';

const totalSalles = mockSalles.length;
const sallesDisponibles = mockSalles.filter(s => s.statut === 'Disponible').length;
const totalUsers = mockUtilisateurs.length;
const reservationsEnAttente = mockReservations.filter(r => r.statut === 'En attente').length;
const conflitsCritiques = mockConflits.filter(c => c.severite === 'Critique').length;

export default function AdminDashboard() {
  return (
    <div className="admin-page">
      <h2>Tableau de bord</h2>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#dbeafe' }}>🏢</div>
          <div className="admin-stat-body">
            <div className="admin-stat-value">{totalSalles}</div>
            <div className="admin-stat-label">Salles</div>
            <div className="admin-stat-sub">{sallesDisponibles} disponibles</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#dcfce7' }}>👥</div>
          <div className="admin-stat-body">
            <div className="admin-stat-value">{totalUsers}</div>
            <div className="admin-stat-label">Utilisateurs</div>
            <div className="admin-stat-sub">{mockUtilisateurs.filter(u => u.role === 'Enseignant').length} enseignants</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#fef9c3' }}>📅</div>
          <div className="admin-stat-body">
            <div className="admin-stat-value">{mockReservations.length}</div>
            <div className="admin-stat-label">Réservations</div>
            <div className="admin-stat-sub">{reservationsEnAttente} en attente</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: '#fee2e2' }}>⚠️</div>
          <div className="admin-stat-body">
            <div className="admin-stat-value">{mockConflits.length}</div>
            <div className="admin-stat-label">Conflits</div>
            <div className="admin-stat-sub">{conflitsCritiques} critiques</div>
          </div>
        </div>
      </div>

      <div className="admin-dashboard-cards">
        <div className="admin-card">
          <h3>Réservations récentes</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Salle</th>
                <th>Enseignant</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {mockReservations.slice(0, 4).map(r => (
                <tr key={r.id}>
                  <td>{r.salle}</td>
                  <td>{r.utilisateur}</td>
                  <td>{r.date}</td>
                  <td><span className={`admin-badge badge-${r.statut === 'Approuvée' ? 'success' : r.statut === 'En attente' ? 'warning' : 'danger'}`}>{r.statut}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-card">
          <h3>Conflits détectés</h3>
          {mockConflits.map(c => (
            <div key={c.id} className={`admin-conflict-item conflict-${c.severite === 'Critique' ? 'danger' : 'warning'}`}>
              <div className="admin-conflict-type">{c.type}</div>
              <div className="admin-conflict-desc">{c.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
