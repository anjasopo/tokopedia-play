import apiClient from './client';
import { ApiResponse, Video } from '../types';

export const getVideos = async (search = ''): Promise<Video[]> => {
  const params = search ? { search } : {};
  const response = (await apiClient.get('/videos', { params })) as unknown as ApiResponse<Video[]>;
  return response.data || [];
};

export const getVideoById = async (videoId: string): Promise<Video | null> => {
  const response = (await apiClient.get(`/videos/${videoId}`)) as unknown as ApiResponse<Video>;
  return response.data || null;
};
