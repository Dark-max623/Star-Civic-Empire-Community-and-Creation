import { apiClient, tokenStore } from './client';
import type { ApiUser, LoginResponse } from './types';

export const authApi = {
  async login(email: string, password: string): Promise<ApiUser> {
    const { data } = await apiClient.post<LoginResponse>('/auth/login/', {
      email,
      password,
    });
    tokenStore.set(data.access, data.refresh);
    return data.user;
  },

  async logout(): Promise<void> {
    const refresh = tokenStore.getRefresh();
    if (refresh) {
      try {
        await apiClient.post('/auth/logout/', { refresh });
      } catch {
        // ignore
      }
    }
    tokenStore.clear();
  },

  async me(): Promise<ApiUser> {
    const { data } = await apiClient.get<ApiUser>('/auth/me/');
    return data;
  },

  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/auth/password-reset/', { email });
  },

  async confirmPasswordReset(payload: {
    uid: string;
    token: string;
    new_password: string;
  }): Promise<void> {
    await apiClient.post('/auth/password-reset/confirm/', payload);
  },
};