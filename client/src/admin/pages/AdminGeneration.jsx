import { useState } from 'react';
import { mockCohortes } from '../../data/mockData';

export default function AdminGeneration() {
  const [semestre, setSemestre] = useState('S6 - 2025/2026');
  const [selectedCohortes, setSelectedCohortes] = useState([]);
  const [heureDebut, setHeureDebut] = useState('8');
  const [heureFin, setHeureFin] = useState('18');
  const [pauseMidi, setPauseMidi] = useState(true);
  const [maxHeuresJour, setMaxHeuresJour] = useState('8');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const toggleCohorte = (id) => {
    setSelectedCohortes(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (selectedCohortes.length === 0) {
      alert('Veuillez sélectionner au moins une cohorte.');
      return;
    }
    setGenerating(true);
    setDone(false);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Génération automatique des EDT</h2>
      </div>

      <form onSubmit={handleGenerate}>
        <div className="admin-gen-grid">
          <div className="admin-card">
            <h3>Paramètres généraux</h3>
            <div className="admin-form-group">
              <label className="admin-form-label">Semestre</label>
              <select className="admin-form-select" value={semestre} onChange={e => setSemestre(e.target.value)}>
                <option>S5 - 2025/2026</option>
                <option>S6 - 2025/2026</option>
                <option>S1 - 2026/2027</option>
              </select>
            </div>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Heure de début</label>
                <select className="admin-form-select" value={heureDebut} onChange={e => setHeureDebut(e.target.value)}>
                  {[7, 8, 9].map(h => <option key={h} value={h}>{h}:00</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Heure de fin</label>
                <select className="admin-form-select" value={heureFin} onChange={e => setHeureFin(e.target.value)}>
                  {[17, 18, 19, 20].map(h => <option key={h} value={h}>{h}:00</option>)}
                </select>
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Max heures / jour</label>
              <select className="admin-form-select" value={maxHeuresJour} onChange={e => setMaxHeuresJour(e.target.value)}>
                {[6, 7, 8, 9, 10].map(h => <option key={h} value={h}>{h}h</option>)}
              </select>
            </div>
            <div className="admin-form-checkbox">
              <input
                id="pauseMidi"
                type="checkbox"
                checked={pauseMidi}
                onChange={e => setPauseMidi(e.target.checked)}
              />
              <label htmlFor="pauseMidi">Réserver 12:00–13:00 pour la pause déjeuner</label>
            </div>
          </div>

          <div className="admin-card">
            <h3>Cohortes à planifier</h3>
            <p className="admin-form-hint">Sélectionnez les groupes pour lesquels générer l'emploi du temps.</p>
            <div className="admin-cohorte-list">
              {mockCohortes.map(c => (
                <label key={c.id} className="admin-cohorte-item">
                  <input
                    type="checkbox"
                    checked={selectedCohortes.includes(c.id)}
                    onChange={() => toggleCohorte(c.id)}
                  />
                  <div className="cohorte-item-info">
                    <span className="cohorte-badge">{c.label}</span>
                    <span className="cohorte-full-label">{c.fullLabel}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-gen-footer">
          {done && (
            <div className="admin-gen-success">
              ✅ Emplois du temps générés avec succès pour {selectedCohortes.length} cohorte(s) !
            </div>
          )}
          <button className="admin-btn-primary admin-btn-large" type="submit" disabled={generating}>
            {generating ? '⏳ Génération en cours...' : '⚙️ Lancer la génération'}
          </button>
        </div>
      </form>
    </div>
  );
}
