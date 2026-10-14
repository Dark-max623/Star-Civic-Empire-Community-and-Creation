import { apiClient } from './client';
import type { DashboardStats } from './types';

export const adminApi = {
  async stats(): Promise<DashboardStats> {
    const { data } = await apiClient.get<DashboardStats>('/admin/stats/');
    return data;
  },
};