import { apiClient } from './client';
import type { ApiService, Paginated } from './types';

export const servicesApi = {
  async list(): Promise<ApiService[]> {
    const { data } = await apiClient.get<Paginated<ApiService> | ApiService[]>(
      '/services/'
    );
    return Array.isArray(data) ? data : data.results;
  },

  async create(payload: {
    title: string;
    tagline: string;
    description: string;
    ctaLabel: string;
    order: number;
    image: File;
  }): Promise<ApiService> {
    const form = new FormData();
    form.append('title', payload.title);
    form.append('tagline', payload.tagline);
    form.append('description', payload.description);
    form.append('cta_label', payload.ctaLabel);
    form.append('order', String(payload.order));
    form.append('image', payload.image);

    const { data } = await apiClient.post<ApiService>('/services/', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async remove(slug: string): Promise<void> {
    await apiClient.delete(`/services/${slug}/`);
  },
};