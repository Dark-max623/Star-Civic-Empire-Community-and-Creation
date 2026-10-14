import { apiClient } from './client';
import type { ApiAdminReview, ApiReview, Paginated } from './types';

export const reviewsApi = {
  async listPublic(page = 1, pageSize = 15): Promise<Paginated<ApiReview>> {
    const { data } = await apiClient.get<Paginated<ApiReview>>('/reviews/', {
      params: { page, page_size: pageSize },
    });
    return data;
  },

  async submit(payload: {
    name: string;
    email: string;
    message: string;
    rating: number;
  }): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/reviews/submit/', payload);
    return data;
  },

  async listAll(page = 1, pageSize = 15): Promise<Paginated<ApiAdminReview>> {
    const { data } = await apiClient.get<Paginated<ApiAdminReview>>('/reviews/all/', {
      params: { page, page_size: pageSize },
    });
    return data;
  },

  async approve(id: string): Promise<ApiAdminReview> {
    const { data } = await apiClient.patch<ApiAdminReview>(`/reviews/${id}/approve/`);
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/reviews/${id}/`);
  },
};