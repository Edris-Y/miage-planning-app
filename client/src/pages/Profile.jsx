import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/profile.css';

export default function Profile() {
  const navigate = useNavigate();

  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const fullName = user ? `${user.prenom || ''} ${user.nom || ''}`.trim() : 'Utilisateur';
  const role = user?.role || 'inconnu';
  const email = user?.email || 'Non renseigne';

  const roleHome = role === 'etudiant' ? '/etudiant' : '/calendar';

  return (
    <div className="profile-page-shell">
      <Navbar
        onNotifications={() =>
          navigate(role === 'etudiant' ? '/etudiant/notifications' : '/enseignant/notifications')
        }
      />

      <div className="profile-container">
        <section className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{fullName.charAt(0).toUpperCase()}</div>
            <div>
              <h1 className="profile-name">{fullName}</h1>
              <p className="profile-role">Role : {role}</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-item">
              <span className="profile-label">Email</span>
              <strong>{email}</strong>
            </div>
            <div className="profile-item">
              <span className="profile-label">Role applicatif</span>
              <strong>{role}</strong>
            </div>
            <div className="profile-item">
              <span className="profile-label">Annee universitaire</span>
              <strong>2025-2026</strong>
            </div>
            <div className="profile-item">
              <span className="profile-label">Etat du compte</span>
              <strong>Actif</strong>
            </div>
          </div>

          <div className="profile-actions">
            <button className="profile-btn ghost" onClick={() => navigate(roleHome)}>
              Retour à l'emploi du temps
            </button>
            <button
              className="profile-btn danger"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              Se deconnecter
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
