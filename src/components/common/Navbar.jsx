import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../../services/authService';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Records', to: '/records' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' }
];

function Navbar() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-brand-700 sm:text-xl">Gold & Silver Rate Management</h1>
          <p className="text-xs text-slate-500">Jewellery Shop Dashboard</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <nav className="flex gap-2 sm:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-brand-600 text-white shadow-soft' : 'text-slate-700 hover:bg-brand-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <p className="hidden text-sm font-medium text-slate-600 sm:block">
              {currentUser?.name ? `Hi, ${currentUser.name}` : 'Logged in'}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
