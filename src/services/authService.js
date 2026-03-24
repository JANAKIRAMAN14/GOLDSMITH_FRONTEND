import { STORAGE_KEYS } from '../constants/storageKeys';

function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(STORAGE_KEYS.AUTH_USER));
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

export function signupUser({ name, email, password }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const alreadyExists = users.some((user) => user.email === normalizedEmail);
  if (alreadyExists) {
    return { ok: false, message: 'Email already registered. Please login.' };
  }

  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password
  };

  const nextUsers = [...users, user];
  saveUsers(nextUsers);

  localStorage.setItem(
    STORAGE_KEYS.AUTH_USER,
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email
    })
  );

  return { ok: true };
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const matched = users.find((user) => user.email === normalizedEmail && user.password === password);

  if (!matched) {
    return { ok: false, message: 'Invalid email or password.' };
  }

  localStorage.setItem(
    STORAGE_KEYS.AUTH_USER,
    JSON.stringify({
      id: matched.id,
      name: matched.name,
      email: matched.email
    })
  );

  return { ok: true };
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
}
