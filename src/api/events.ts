import { apiClient } from './client';
import type { ApiEvent, Paginated } from './types';

export const eventsApi = {
  async list(page = 1, pageSize = 10): Promise<Paginated<ApiEvent>> {
    const { data } = await apiClient.get<Paginated<ApiEvent>>('/events/', {
      params: { page, page_size: pageSize },
    });
    return data;
  },

  async create(payload: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    ctaLabel: string;
    image: File;
  }): Promise<ApiEvent> {
    const form = new FormData();
    form.append('title', payload.title);
    form.append('date', payload.date);
    form.append('start_time', payload.startTime);
    form.append('end_time', payload.endTime);
    form.append('location', payload.location);
    form.append('cta_label', payload.ctaLabel);
    form.append('image', payload.image);

    const { data } = await apiClient.post<ApiEvent>('/events/', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/events/${id}/`);
  },
};