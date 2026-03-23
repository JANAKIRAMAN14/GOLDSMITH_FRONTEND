import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Records', to: '/records' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' }
];

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-brand-700 sm:text-xl">Gold & Silver Rate Management</h1>
          <p className="text-xs text-slate-500">Jewellery Shop Dashboard</p>
        </div>
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
      </div>
    </header>
  );
}

export default Navbar;
