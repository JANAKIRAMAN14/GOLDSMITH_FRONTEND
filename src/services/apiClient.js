const RAW_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://goldsmith-backend.onrender.com';

function resolveApiUrl(path) {
  const baseUrl = String(RAW_API_BASE_URL).trim().replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Support both base forms:
  // - https://host
  // - https://host/api
  if (baseUrl.endsWith('/api') && normalizedPath.startsWith('/api/')) {
    return `${baseUrl}${normalizedPath.slice(4)}`;
  }

  return `${baseUrl}${normalizedPath}`;
}

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, headers = {}, withAuth = true, retryOn401 = true } = options;

  const finalHeaders = { ...headers };
  const hasBody = body !== undefined && body !== null;
  const isFormData = hasBody && body instanceof FormData;

  if (hasBody && !isFormData) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (withAuth) {
    const { getAccessToken } = await import('./authService');
    const token = getAccessToken();
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(resolveApiUrl(path), {
    method,
    headers: finalHeaders,
    credentials: 'include',
    body: hasBody ? (isFormData ? body : JSON.stringify(body)) : undefined
  });

  let data = {};
  try {
    data = await response.json();
  } catch (error) {
    data = {};
  }

  if (response.status === 401 && retryOn401 && withAuth && !path.includes('/api/auth/refresh')) {
    const { refreshSession } = await import('./authService');
    const refreshed = await refreshSession();

    if (refreshed) {
      return apiRequest(path, { ...options, retryOn401: false });
    }
  }

  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}
