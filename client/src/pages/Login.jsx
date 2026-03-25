import { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden="true" />

      <div className="login-card">
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <button
            type="button"
            className="info-btn"
            aria-label="Informations"
            onClick={() => setShowInfo((prev) => !prev)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
              <code className="info-email">nom@etud.fr</code>
              <p className="info-role">Enseignant</p>
              <code className="info-email">nom@ens.fr</code>
              <p className="info-role">Admin</p>
              <code className="info-email">nom@admin.fr</code>
              <hr className="info-divider" />
              <p className="info-note">Utilisez un suffixe @etud.fr, @ens.fr ou @admin.fr</p>
              <div className="password-rules-box">
                <p className="password-rules-title">Contraintes mot de passe</p>
                <ul className="password-rules-list">
                  <li>Minimum 8 caracteres</li>
                  <li>Au moins 1 majuscule et 1 minuscule</li>
                  <li>Au moins 1 chiffre</li>
                  <li>Au moins 1 caractere special</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="login-logo">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e2d4a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        <h1 className="login-title">Connexion</h1>
        <p className="login-subtitle">
          Plateforme de gestion des emplois du temps
        </p>

        <div className="login-form">
          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Identifiant
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1e2d4a"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="nom@domaine.fr"
                autoComplete="email"
                defaultValue=""
              />
            </div>
          </div>

          <div className="field-group">
            <div className="field-label-row">
              <label className="field-label" htmlFor="password">
                Mot de passe
              </label>

              <button
                type="button"
                className="forgot-link"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1e2d4a"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="************"
                autoComplete="current-password"
                defaultValue=""
              />
              <button type="button" className="toggle-password" aria-label="Afficher ou masquer le mot de passe">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          <button className="login-btn" type="button">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
