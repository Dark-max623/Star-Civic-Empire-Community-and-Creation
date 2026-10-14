import { apiClient } from './client';
import type { ApiSubscriber, Paginated } from './types';

export const newsletterApi = {
  async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/newsletter/subscribe/', { email });
    return data;
  },

  async listSubscribers(
    page = 1,
    pageSize = 20
  ): Promise<Paginated<ApiSubscriber>> {
    const { data } = await apiClient.get<Paginated<ApiSubscriber>>(
      '/newsletter/subscribers/',
      { params: { page, page_size: pageSize } }
    );
    return data;
  },

  async removeSubscriber(id: string): Promise<void> {
    await apiClient.delete(`/newsletter/subscribers/${id}/`);
  },
};