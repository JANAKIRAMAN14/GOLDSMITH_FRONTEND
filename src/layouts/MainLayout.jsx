import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-50 to-slate-100 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
