import { apiClient } from './client';
import type { ApiContactMessage, Paginated } from './types';

export const contactApi = {
  async list(page = 1, pageSize = 15): Promise<Paginated<ApiContactMessage>> {
    const { data } = await apiClient.get<Paginated<ApiContactMessage>>(
      '/contact/messages/',
      { params: { page, page_size: pageSize } }
    );
    return data;
  },

  async markRead(id: string): Promise<ApiContactMessage> {
    const { data } = await apiClient.patch<ApiContactMessage>(
      `/contact/messages/${id}/read/`
    );
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/contact/messages/${id}/`);
  },
};