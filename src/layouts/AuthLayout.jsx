import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-50 to-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-brand-700 sm:text-2xl">Gold & Silver Rate Management</h1>
          <p className="mt-1 text-sm text-slate-500">Jewellery Shop Dashboard</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
