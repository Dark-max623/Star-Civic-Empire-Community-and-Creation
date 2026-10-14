import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const ACCESS_KEY = 'sce_access_token';
const REFRESH_KEY = 'sce_refresh_token';

/**
 * Public GET endpoints — no auth header needed.
 */
const PUBLIC_GET_PREFIXES = [
  '/gallery/',
  '/events/',
  '/services/',
  '/reviews/',
];

/**
 * Public any-method endpoints (form submissions).
 */
const PUBLIC_ANY_PREFIXES = [
  '/contact/',
  '/newsletter/subscribe/',
];

/**
 * Admin routes that share a public prefix and always require auth.
 */
const ADMIN_OVERRIDES = [
  '/contact/messages/',
  '/newsletter/subscribers/',
  '/reviews/all/',
];

const isPublicRequest = (
  url: string | undefined,
  method: string | undefined
): boolean => {
  if (!url) return false;

  if (ADMIN_OVERRIDES.some((p) => url.includes(p))) {
    return false;
  }

  if (PUBLIC_ANY_PREFIXES.some((p) => url.includes(p))) {
    const m = method?.toUpperCase();
    if (m === 'POST') return true;
    if (url.includes('/newsletter/subscribe/')) return true;
    return false;
  }

  if (method?.toUpperCase() === 'GET') {
    if (PUBLIC_GET_PREFIXES.some((p) => url.includes(p))) {
      return true;
    }
  }

  return false;
};

export const tokenStore = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.getAccess();
  if (token && !isPublicRequest(config.url, config.method)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !original._retry &&
      !isPublicRequest(original.url, original.method)
    ) {
      const refresh = tokenStore.getRefresh();
      if (!refresh) {
        tokenStore.clear();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh/`, {
          refresh,
        });
        tokenStore.set(data.access, data.refresh || refresh);
        pendingRequests.forEach((cb) => cb(data.access));
        pendingRequests = [];
        original.headers.Authorization = `Bearer ${data.access}`;
        return apiClient(original);
      } catch {
        tokenStore.clear();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { error?: unknown; detail?: string }
      | undefined;
    if (typeof data?.error === 'string') return data.error;
    if (typeof data?.detail === 'string') return data.detail;
    if (data?.error && typeof data.error === 'object') {
      const first = Object.values(data.error as Record<string, unknown>)[0];
      if (Array.isArray(first) && first.length) return String(first[0]);
      if (typeof first === 'string') return first;
    }
    return error.message;
  }
  return 'An unexpected error occurred.';
};