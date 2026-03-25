import { createContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchProfile,
  getCurrentUser,
  loginUser,
  logoutUser,
  signupUser
} from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(true);
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    if (bootstrappedRef.current) {
      return;
    }

    bootstrappedRef.current = true;

    const bootstrap = async () => {
      const profile = await fetchProfile();
      setUser(profile);
      setLoading(false);
    };

    bootstrap();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isLoggedIn: Boolean(user),
      signup: async (payload) => {
        const result = await signupUser(payload);
        if (result.ok) setUser(result.user);
        return result;
      },
      login: async (payload) => {
        const result = await loginUser(payload);
        if (result.ok) setUser(result.user);
        return result;
      },
      logout: async () => {
        await logoutUser();
        setUser(null);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
