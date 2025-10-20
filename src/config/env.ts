const fallbackBaseUrl = 'http://35.216.19.71:8000';
const resolvedBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').toString().trim();

export const API_BASE_URL = (resolvedBaseUrl || fallbackBaseUrl).replace(/\/+$/, '');

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
