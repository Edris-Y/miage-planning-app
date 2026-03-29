import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("1. Début de la requête...");
        
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        
        if (!token) {
          console.log("Erreur : Aucun token trouvé dans le navigateur.");
          setError("Vous n'êtes pas connecté");
          setLoading(false);
          return;
        }

        console.log("2. Token trouvé ! Appel de l'API...");
        const response = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.log("Erreur API : Le serveur a répondu avec une erreur.");
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors de l'accès aux données");
        }

        const result = await response.json();
        console.log("3. Données reçues du serveur :", result);
        
        setUsers(result); 
        setLoading(false);
      } catch (err) {
        console.error("Erreur détaillée :", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers(); 
    
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>;

  return (
    <div className="admin-page">
      <h2>Tableau de bord Administrateur</h2>
      
      <div className="admin-dashboard-cards">
        <div className="admin-card">
          <h3>Statistiques générales</h3>
          <p>Total Utilisateurs : <strong>{users.length}</strong></p>
        </div>
      </div>

      <div className="admin-users-list" style={{ marginTop: '20px' }}>
        <h3>Liste des Utilisateurs</h3>
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}