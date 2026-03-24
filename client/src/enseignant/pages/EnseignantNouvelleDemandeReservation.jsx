import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockCohortes, mockSalles, mockTypes } from '../../data/mockData';
import Navbar from '../../components/Navbar';
import '../../styles/enseignant.css';

export default function EnseignantNouvelleDemandeReservation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ type: '', date: '', debut: '', fin: '', cohorte: '', salle: '', commentaire: '' });
  const [error, setError] = useState('');

  const setField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = () => {
    const required = ['type', 'date', 'debut', 'fin', 'cohorte', 'salle'];
    if (required.some((k) => !form[k])) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (form.debut >= form.fin) {
      setError("L'heure de fin doit être après l'heure de début.");
      return;
    }

    setError('');

    const existing = JSON.parse(window.localStorage.getItem('enseignantDemandes') || '[]');
    const newDemande = {
      id: `d-${Date.now()}`,
      ...form,
      statut: 'EN ATTENTE',
      createdAt: new Date().toISOString(),
    };
    window.localStorage.setItem('enseignantDemandes', JSON.stringify([newDemande, ...existing]));

    navigate('/enseignant/demandes');
  };

  return (
    <div className="ens-page">
      <Navbar />
      <div className="ens-content" style={{ maxWidth: 680 }}>
        <div className="ens-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Nouvelle demande</h1>
            <button className="ens-btn-ghost" onClick={() => navigate('/enseignant/demandes')}>
              ← Retour aux demandes
            </button>
          </div>

          {error && <div className="form-error" style={{ marginBottom: 16 }}>{error}</div>}

          <div className="ens-form">
            <div className="ens-form-row">
              <div className="ens-field">
                <label>Type de séance <span>*</span></label>
                <select value={form.type} onChange={setField('type')}>
                  <option value="">Sélectionner</option>
                  {mockTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="ens-field">
                <label>Date <span>*</span></label>
                <input type="date" value={form.date} onChange={setField('date')} />
              </div>
            </div>

            <div className="ens-form-row">
              <div className="ens-field">
                <label>Heure de début <span>*</span></label>
                <input type="time" value={form.debut} onChange={setField('debut')} />
              </div>
              <div className="ens-field">
                <label>Heure de fin <span>*</span></label>
                <input type="time" value={form.fin} onChange={setField('fin')} />
              </div>
            </div>

            <div className="ens-form-row">
              <div className="ens-field">
                <label>Cohorte <span>*</span></label>
                <select value={form.cohorte} onChange={setField('cohorte')}>
                  <option value="">Sélectionner</option>
                  {mockCohortes.map((c) => <option key={c.id} value={c.id}>{c.fullLabel}</option>)}
                </select>
              </div>
              <div className="ens-field">
                <label>Salle souhaitée <span>*</span></label>
                <select value={form.salle} onChange={setField('salle')}>
                  <option value="">Sélectionner</option>
                  {mockSalles.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="ens-field">
              <label>Commentaire</label>
              <textarea rows={3} value={form.commentaire} onChange={setField('commentaire')} />
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button className="ens-btn" onClick={submit}>Envoyer la demande</button>
              <button className="ens-btn-outline" onClick={() => navigate('/enseignant/demandes')}>Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
