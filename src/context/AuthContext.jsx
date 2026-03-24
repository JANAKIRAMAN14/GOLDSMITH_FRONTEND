import { createContext, useMemo, useState } from 'react';
import { getSessionUser, loginUser, logoutUser, signupUser } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSessionUser());

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      signup: (payload) => signupUser(payload),
      login: (payload) => {
        const sessionUser = loginUser(payload);
        setUser(sessionUser);
        return sessionUser;
      },
      logout: () => {
        logoutUser();
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
