import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken, getUsers } from "../services/api";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      navigate("/login", { replace: true });
      return;
    }

    let mounted = true;

    async function loadUsers() {
      setLoading(true);
      setError("");
      try {
        const rows = await getUsers();
        if (mounted) setUsers(Array.isArray(rows) ? rows : []);
      } catch (err) {
        if (mounted) setError(err.message || "Erreur lors du chargement des utilisateurs.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadUsers();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  function handleLogout() {
    clearToken();
    navigate("/login", { replace: true });
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Utilisateurs</h2>
        <button type="button" onClick={handleLogout}>Se deconnecter</button>
      </div>

      {loading && <p>Chargement...</p>}
      {!loading && error && <p style={{ color: "#b42318" }}>{error}</p>}

      {!loading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>Nom</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>Prenom</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ borderBottom: "1px solid #f0f0f0", padding: "8px" }}>{user.nom}</td>
                <td style={{ borderBottom: "1px solid #f0f0f0", padding: "8px" }}>{user.prenom}</td>
                <td style={{ borderBottom: "1px solid #f0f0f0", padding: "8px" }}>{user.email}</td>
                <td style={{ borderBottom: "1px solid #f0f0f0", padding: "8px" }}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
