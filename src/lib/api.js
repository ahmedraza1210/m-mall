const TOKEN_KEY = 'mm_admin_token';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}
export function setToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) headers['Authorization'] = `Bearer ${getToken()}`;
  const res = await fetch(`/api/${path}`, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  let data = {};
  try {
    data = await res.json();
  } catch {
    /* empty or non-JSON */
  }
  if (!res.ok) {
    if (res.status === 401 && auth) setToken('');
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status);
  }
  return data;
}

export const adminApi = {
  load: () => api('admin', { auth: true }),
  save: (collection, item) => api('admin', { method: 'POST', auth: true, body: { action: 'save', collection, item } }),
  remove: (collection, id) => api('admin', { method: 'POST', auth: true, body: { action: 'delete', collection, id } }),
  saveSettings: (settings) => api('admin', { method: 'POST', auth: true, body: { action: 'settings', settings } }),
  upload: (payload) => api('upload', { method: 'POST', auth: true, body: payload }),
};
