import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { createDemande, getCohortes, getEtudiantCours, getSalles } from '../../services/api';
import '../../styles/enseignant.css';

const TYPES = ['CM', 'TD', 'TP', 'EXAM'];

export default function EnseignantNouvelleDemandeReservation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ type: '', date: '', debut: '', fin: '', cohorte: '', salle: '', commentaire: '' });
  const [error, setError] = useState('');
  const [cohortes, setCohortes] = useState([]);
  const [salles, setSalles] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [cohortesRows, sallesRows] = await Promise.all([
          getCohortes(),
          getSalles(),
        ]);
        if (!isMounted) return;
        setCohortes(cohortesRows);
        setSalles(sallesRows);
      } catch {
        if (!isMounted) return;
        setCohortes([]);
        setSalles([]);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const setField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async () => {
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

    const selectedSalle = salles.find((s) => String(s.id) === String(form.salle));
    const cohorteCours = await getEtudiantCours({ cohorteId: Number(form.cohorte) });
    const matchedSeance = cohorteCours.find((c) => {
      const sameDate = c.date === form.date;
      const sameStart = c.debut === form.debut;
      const sameType = c.type === form.type;
      return sameDate && sameStart && sameType;
    });

    if (!selectedSalle || !matchedSeance) {
      setError("Impossible d'identifier la séance/salle côté API. Vérifiez les données de planning puis réessayez.");
      return;
    }

    try {
      await createDemande(
        {
          salle_id: selectedSalle.id,
          seance_id: Number(matchedSeance.id),
          motif: form.commentaire || null,
        }
      );
      navigate('/enseignant/demandes');
    } catch (apiErr) {
      setError(apiErr.message || "Envoi impossible. L'API peut exiger une authentification.");
    }
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
                  {TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
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
                  {cohortes.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
                </select>
              </div>
              <div className="ens-field">
                <label>Salle souhaitée <span>*</span></label>
                <select value={form.salle} onChange={setField('salle')}>
                  <option value="">Sélectionner</option>
                  {salles.map((s) => <option key={s.id} value={s.id}>{s.code}</option>)}
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
