import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion avec :", email);
  };

  return (
    <div className="login-page">
      {/* 1) Arriere-plan photo pleine page */}
      <div className="login-bg" aria-hidden="true" />

      {/* 3) Carte centrale effet verre flou */}
      <div className="login-card">
        {/* Info button + popup */}
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <button className="info-btn" aria-label="Informations" onClick={() => setShowInfo(!showInfo)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>

          {showInfo && (
            <div className="info-popup">
              <div className="info-arrow" />
              <p className="info-popup-title">COMPTES DE DEMONSTRATION</p>
              <p className="info-role">Etudiant</p>
              <code className="info-email">student@univ.fr</code>
              <p className="info-role">Enseignant</p>
              <code className="info-email">teacher@univ.fr</code>
              <p className="info-role">Admin</p>
              <code className="info-email">admin@univ.fr</code>
              <hr className="info-divider" />
              <p className="info-note">Mot de passe : n'importe lequel</p>
            </div>
          )}
        </div>

        <div className="login-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        <h1 className="login-title">Connexion</h1>
        <p className="login-subtitle">Plateforme de gestion des emplois du temps</p>

        {/* 4) Formulaire d'authentification */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="email">Identifiant</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="nom.prenom@univ.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field-label-row">
              <label className="field-label" htmlFor="password">Mot de passe</label>
              <a
                href="#"
                className="forgot-link"
                onClick={(e) => e.preventDefault()}
              >
                Mot de passe oublie ?
              </a>
            </div>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e2d4a" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Afficher/masquer le mot de passe"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button className="login-btn" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
