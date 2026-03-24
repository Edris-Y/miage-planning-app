import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const menuItems = [
  { path: "/admin", label: "Tableau de bord", icon: "dashboard" },
  { path: "/admin/generation", label: "Génération auto", icon: "generation" },
  { path: "/admin/reservations", label: "Réservations", icon: "reservations" },
  { path: "/admin/conflits", label: "Conflits", icon: "conflits" },
  { path: "/admin/salles", label: "Salles", icon: "salles" },
  { path: "/admin/utilisateurs", label: "Utilisateurs", icon: "utilisateurs" },
];

function SidebarIcon({ name }) {
  if (name === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H20V20H14V14Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "generation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 7H4V11M4.5 10.5C5.6 7.1 9.4 5.2 12.9 6.3C14.6 6.8 16.1 7.9 17 9.4M16 17H20V13M19.5 13.5C18.4 16.9 14.6 18.8 11.1 17.7C9.4 17.2 7.9 16.1 7 14.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "reservations") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 3V6M16 3V6M4 9H20M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5ZM8 13H12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "conflits") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64538 18.3024 1.553 18.6451 1.55206 18.9944C1.55113 19.3436 1.64167 19.6868 1.81468 19.9901C1.98769 20.2934 2.23706 20.546 2.53811 20.723C2.83916 20.8999 3.18126 20.995 3.53 20.999H20.47C20.8187 20.995 21.1608 20.8999 21.4619 20.723C21.7629 20.546 22.0123 20.2934 22.1853 19.9901C22.3583 19.6868 22.4489 19.3436 22.4479 18.9944C22.447 18.6451 22.3546 18.3024 22.18 18L13.71 3.86C13.5318 3.56613 13.2818 3.32208 12.9836 3.15096C12.6854 2.97984 12.3484 2.88733 12.005 2.88232C11.6615 2.87731 11.3219 2.95998 11.0187 3.12235C10.7155 3.28471 10.4586 3.52137 10.29 3.86Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "salles") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 21H21M5 21V7L12 3L19 7V21M9 10H9.01M9 14H9.01M9 18H9.01M15 10H15.01M15 14H15.01M15 18H15.01"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 21V19C16 17.8954 15.1046 17 14 17H6C4.89543 17 4 17.8954 4 19V21M20 21V19C19.9993 18.0778 19.3626 17.2773 18.47 17.07M15 3.13C15.8604 3.35031 16.623 3.85071 17.1676 4.55231C17.7122 5.25392 18.0078 6.11683 18.0078 7.005C18.0078 7.89317 17.7122 8.75608 17.1676 9.45769C16.623 10.1593 15.8604 10.6597 15 10.88M11 7C11 9.20914 9.20914 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3C9.20914 3 11 4.79086 11 7ZM21 7C21 9.20914 19.2091 11 17 11C16.6593 11 16.3286 10.9574 16.0133 10.877"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-top">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-logo">
            <img src={logo} alt="UniSchedule" className="admin-sidebar-brand-image" />
          </div>

          <div className="admin-sidebar-brand-copy">
            <h2>UniSchedule</h2>
            <p>Gestion académique</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="admin-sidebar-icon">
                <SidebarIcon name={item.icon} />
              </span>
              <span className="admin-sidebar-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="admin-sidebar-bottom">
        <div className="admin-sidebar-user">
          <div className="admin-sidebar-avatar">SL</div>

          <div className="admin-sidebar-user-copy">
            <span className="admin-sidebar-user-name">Sophie Laurent</span>
            <span className="admin-sidebar-user-role">Administrateur</span>
          </div>
        </div>

        <button
          type="button"
          className="admin-sidebar-logout"
          onClick={handleLogout}
        >
          <span className="admin-sidebar-logout-icon">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 16L19 12M19 12L15 8M19 12H9M12 16V17C12 18.1046 11.1046 19 10 19H6C4.89543 19 4 18.1046 4 17V7C4 5.89543 4.89543 5 6 5H10C11.1046 5 12 5.89543 12 7V8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
