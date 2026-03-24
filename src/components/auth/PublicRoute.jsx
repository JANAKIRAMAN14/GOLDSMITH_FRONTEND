import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function PublicRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Checking session...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
