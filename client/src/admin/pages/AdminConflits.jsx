import { useState } from 'react';
import { mockConflits } from '../../data/mockData';

export default function AdminConflits() {
  const [conflits, setConflits] = useState(mockConflits);
  const [resolvedIds, setResolvedIds] = useState([]);

  const handleResolve = (id) => {
    setResolvedIds(prev => [...prev, id]);
  };

  const handleIgnore = (id) => {
    setConflits(prev => prev.filter(c => c.id !== id));
    setResolvedIds(prev => prev.filter(rid => rid !== id));
  };

  const critiques = conflits.filter(c => c.severite === 'Critique' && !resolvedIds.includes(c.id));
  const avertissements = conflits.filter(c => c.severite === 'Avertissement' && !resolvedIds.includes(c.id));
  const resolus = conflits.filter(c => resolvedIds.includes(c.id));

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Détection des Conflits</h2>
        <button className="admin-btn-primary">🔍 Relancer la détection</button>
      </div>

      <div className="admin-conflict-summary">
        <div className="conflict-summary-item summary-danger">
          <span className="summary-value">{critiques.length}</span>
          <span className="summary-label">Conflits critiques</span>
        </div>
        <div className="conflict-summary-item summary-warning">
          <span className="summary-value">{avertissements.length}</span>
          <span className="summary-label">Avertissements</span>
        </div>
        <div className="conflict-summary-item summary-success">
          <span className="summary-value">{resolus.length}</span>
          <span className="summary-label">Résolus</span>
        </div>
      </div>

      {critiques.length > 0 && (
        <div className="admin-card">
          <h3>⛔ Conflits critiques</h3>
          {critiques.map(c => (
            <div key={c.id} className="admin-conflict-row conflict-danger">
              <div className="conflict-row-header">
                <span className="conflict-type-tag tag-danger">{c.type}</span>
              </div>
              <p className="conflict-row-desc">{c.description}</p>
              {c.cours1 && <p className="conflict-row-detail">📌 {c.cours1}</p>}
              {c.cours2 && <p className="conflict-row-detail">📌 {c.cours2}</p>}
              <div className="conflict-row-actions">
                <button className="admin-btn-sm btn-approve" onClick={() => handleResolve(c.id)}>Marquer résolu</button>
                <button className="admin-btn-sm btn-neutral" onClick={() => handleIgnore(c.id)}>Ignorer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {avertissements.length > 0 && (
        <div className="admin-card">
          <h3>⚠️ Avertissements</h3>
          {avertissements.map(c => (
            <div key={c.id} className="admin-conflict-row conflict-warning">
              <div className="conflict-row-header">
                <span className="conflict-type-tag tag-warning">{c.type}</span>
              </div>
              <p className="conflict-row-desc">{c.description}</p>
              {c.cours1 && <p className="conflict-row-detail">📌 {c.cours1}</p>}
              {c.cours2 && <p className="conflict-row-detail">📌 {c.cours2}</p>}
              <div className="conflict-row-actions">
                <button className="admin-btn-sm btn-approve" onClick={() => handleResolve(c.id)}>Marquer résolu</button>
                <button className="admin-btn-sm btn-neutral" onClick={() => handleIgnore(c.id)}>Ignorer</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {resolus.length > 0 && (
        <div className="admin-card">
          <h3>✅ Conflits résolus</h3>
          {resolus.map(c => (
            <div key={c.id} className="admin-conflict-row conflict-resolved">
              <span className="conflict-type-tag tag-success">{c.type}</span>
              <p className="conflict-row-desc">{c.description}</p>
            </div>
          ))}
        </div>
      )}

      {critiques.length === 0 && avertissements.length === 0 && resolus.length === 0 && (
        <div className="admin-card admin-empty-state">
          <div className="admin-empty-icon">✅</div>
          <p>Aucun conflit détecté dans les emplois du temps.</p>
        </div>
      )}
    </div>
  );
}
