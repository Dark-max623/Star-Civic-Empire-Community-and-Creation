import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: '▦' },
  { to: '/admin/gallery', label: 'Gallery', icon: '▣' },
  { to: '/admin/reviews', label: 'Reviews', icon: '✦' },
  { to: '/admin/events', label: 'Events', icon: '◈' },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-dark-elevated border-r border-white/5 flex flex-col">
        <div className="px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-gold-primary font-extrabold text-lg">Star Civic</span>
            <span className="text-text-primary text-[10px] tracking-widest">
              ADMIN
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-primary text-bg-dark'
                    : 'text-text-subtle hover:bg-white/5 hover:text-text-primary'
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          <div className="text-xs text-text-subtle truncate">
            Signed in as
            <div className="text-text-primary font-medium truncate">
              {user?.email}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-widest text-gold-primary border border-gold-primary rounded-sm py-2 hover:bg-gold-primary hover:text-bg-dark transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};