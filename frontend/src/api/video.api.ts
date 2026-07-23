import apiClient from './client';
import { Video } from '../types';

export const getVideos = async (search = ''): Promise<Video[]> => {
  try {
    const params = search ? { search } : {};
    const res: any = await apiClient.get('/videos', { params });
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    if (res && res.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  } catch (err) {
    console.error('getVideos error:', err);
    return [];
  }
};

export const getVideoById = async (videoId: string): Promise<Video | null> => {
  try {
    const res: any = await apiClient.get(`/videos/${videoId}`);
    if (res && res.data && typeof res.data === 'object') return res.data;
    if (res && typeof res === 'object' && 'videoID' in res) return res;
    return null;
  } catch (err) {
    console.error('getVideoById error:', err);
    return null;
  }
};
