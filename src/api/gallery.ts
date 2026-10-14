import { apiClient } from './client';
import type { ApiGalleryImage, Paginated } from './types';

export const galleryApi = {
  async list(page = 1, pageSize = 12): Promise<Paginated<ApiGalleryImage>> {
    const { data } = await apiClient.get<Paginated<ApiGalleryImage>>('/gallery/', {
      params: { page, page_size: pageSize },
    });
    return data;
  },

  async upload(file: File, alt: string): Promise<ApiGalleryImage> {
    const form = new FormData();
    form.append('image', file);
    form.append('alt', alt);

    const { data } = await apiClient.post<ApiGalleryImage>('/gallery/', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/gallery/${id}/`);
  },
};