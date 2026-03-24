import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

function NotFoundPage() {
  const loggedIn = isAuthenticated();

  return (
    <div className="min-h-[80vh] px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-brand-100 bg-white/90 p-6 shadow-soft backdrop-blur sm:p-10">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              Error 404
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Page Not Found</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              The page you are trying to open does not exist or you do not have permission to view it without login.
            </p>

            {/* <div className="mt-6 flex flex-wrap gap-3">
              {loggedIn ? (
                <Link
                  to="/"
                  className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Go To Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Go To Login
                </Link>
              )}

              <Link
                to={loggedIn ? '/' : '/signup'}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {loggedIn ? 'Home' : 'Create Account'}
              </Link>
            </div> */}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-slate-100 p-6">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-200/60" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-slate-200/70" />
            <p className="relative text-7xl font-black text-brand-600/80 sm:text-8xl">404</p>
            <p className="relative mt-2 text-sm font-medium text-slate-600">
              Gold & Silver Rate Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
