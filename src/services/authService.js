import { STORAGE_KEYS } from '../constants/storageKeys';
import { apiRequest } from './apiClient';

let accessToken = '';

function saveSession({ accessToken: token, user }) {
  accessToken = token || '';
  localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
}

function clearSession() {
  accessToken = '';
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
}

export function getAccessToken() {
  return accessToken;
}

export function isAuthenticated() {
  return Boolean(accessToken);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

export async function signupUser({ name, email, password }) {
  try {
    const data = await apiRequest('/api/auth/signup', {
      method: 'POST',
      withAuth: false,
      retryOn401: false,
      body: { name, email, password }
    });

    saveSession({ accessToken: data.accessToken, user: data.user });
    return { ok: true, user: data.user };
  } catch (error) {
    return { ok: false, message: error.message || 'Signup failed' };
  }
}

export async function loginUser({ email, password }) {
  try {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      withAuth: false,
      retryOn401: false,
      body: { email, password }
    });

    saveSession({ accessToken: data.accessToken, user: data.user });
    return { ok: true, user: data.user };
  } catch (error) {
    return { ok: false, message: error.message || 'Login failed' };
  }
}

export async function refreshSession() {
  try {
    const data = await apiRequest('/api/auth/refresh', {
      method: 'POST',
      withAuth: false,
      retryOn401: false
    });

    saveSession({ accessToken: data.accessToken, user: data.user });
    return true;
  } catch (error) {
    clearSession();
    return false;
  }
}

export async function fetchProfile() {
  const cachedUser = getCurrentUser();

  // Avoid refresh calls for first-time visitors with no known session.
  if (!accessToken && !cachedUser) {
    return null;
  }

  if (!accessToken) {
    const refreshed = await refreshSession();
    if (!refreshed) return null;
  }

  try {
    const data = await apiRequest('/api/auth/me');
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(data.user));
    return data.user;
  } catch (error) {
    clearSession();
    return null;
  }
}

export async function logoutUser() {
  try {
    await apiRequest('/api/auth/logout', {
      method: 'POST',
      withAuth: false,
      retryOn401: false
    });
  } catch (error) {
    // Ignore logout API failures to ensure local session is cleared.
  }

  clearSession();
}
