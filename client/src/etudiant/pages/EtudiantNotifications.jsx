import { useState } from 'react';
import Navbar from '../../components/Navbar';
import BackButton from '../../components/BackButton';
import '../../styles/enseignant.css';
import '../../styles/etudiant.css';

const TABS = ['Toutes', 'Non lues', 'Importantes'];

const ETUDIANT_NOTIFICATIONS = [
  {
    id: 'n1',
    status: 'nouveau',
    titre: 'Changement de salle',
    message: 'Le cours de Mathematiques du 5 fevrier a ete deplace en Amphi B',
    date: '4 fevrier 2026 a 16:30',
    iconType: 'warning',
  },
  {
    id: 'n2',
    status: 'lu',
    titre: 'Note publiee',
    message: 'Votre note pour le TP de Base de donnees a ete publiee : 16/20',
    date: '3 fevrier 2026 a 14:00',
    iconType: 'check',
  },
  {
    id: 'n3',
    status: 'lu',
    titre: 'Nouveau cours disponible',
    message: 'Le support de cours pour Algorithmique Avancee est maintenant disponible',
    date: '1 fevrier 2026 a 10:00',
    iconType: 'info',
  },
  {
    id: 'n4',
    status: 'important',
    titre: 'Examen a venir',
    message: 'Rappel : Examen de Base de donnees le 15 fevrier a 09:00',
    date: '28 janvier 2026 a 09:15',
    iconType: 'warning',
  },
];

const ICON_MAP = {
  location: { icon: '📍', cls: 'location' },
  check: { icon: '✔', cls: 'check' },
  info: { icon: 'ℹ', cls: 'info' },
  warning: { icon: '⚠', cls: 'warning' },
};

export default function EtudiantNotifications() {
  const [activeTab, setActiveTab] = useState('Toutes');
  const [items, setItems] = useState(ETUDIANT_NOTIFICATIONS);

  const unreadCount = items.filter((n) => n.status !== 'lu').length;
  const importantCount = items.filter((n) => n.status === 'important').length;

  const tabCount = {
    Toutes: items.length,
    'Non lues': unreadCount,
    Importantes: importantCount,
  };

  const filtered = items.filter((n) => {
    if (activeTab === 'Non lues') return n.status !== 'lu';
    if (activeTab === 'Importantes') return n.status === 'important';
    return true;
  });

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, status: 'lu' })));
  };

  return (
    <div className="ens-page">
      <Navbar onNotifications={() => {}} />

      <div className="ens-content etu-notif-content">
        <div className="ens-card">
          <div className="etu-notif-header">
            <div className="etu-notif-title-block">
              <h2>Notifications</h2>
              <p>
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </p>
            </div>
            <BackButton label="Retour au calendrier" to="/etudiant" fallback="/etudiant" />
          </div>

          <div className="etu-notif-tabs-row">
            <div className="ens-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {tabCount[tab] > 0 && <span className="tab-count">{tabCount[tab]}</span>}
                </button>
              ))}
            </div>
            <button className="ens-btn-outline etu-notif-read-all" onClick={markAllRead}>
              Marquer toutes comme lues
            </button>
          </div>

          <div className="etu-divider" />

          {filtered.length === 0 ? (
            <div className="ens-empty">
              <div className="ens-empty-icon">🔔</div>
              <h3>Aucune notification</h3>
              <p>Vous etes a jour !</p>
            </div>
          ) : (
            <div className="notif-list">
              {filtered.map((note, idx) => {
                const iconMeta = ICON_MAP[note.iconType] || ICON_MAP.info;
                const isUnread = note.status !== 'lu';
                const isNew = note.status === 'nouveau';
                const isImp = note.status === 'important';

                return (
                  <div key={note.id}>
                    <div className={`notif-item ${isUnread ? 'unread' : ''}`}>
                      <div className={`notif-icon-wrap ${iconMeta.cls}`}>{iconMeta.icon}</div>
                      <div className="notif-body">
                        <div className="notif-top">
                          <span className="notif-title-text">{note.titre}</span>
                          {isNew && <span className="badge badge-nouveau">Nouveau</span>}
                          {isImp && <span className="badge badge-important">Important</span>}
                        </div>
                        <p>{note.message}</p>
                        <div className="notif-time">{note.date}</div>
                      </div>
                    </div>
                    {idx < filtered.length - 1 && <div className="notif-divider" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
