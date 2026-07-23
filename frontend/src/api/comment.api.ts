import apiClient from './client';
import { Comment } from '../types';

export const getComments = async (videoID: string): Promise<Comment[]> => {
  try {
    const params = videoID ? { videoID } : {};
    const res: any = await apiClient.get('/comments', { params });
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    if (res && res.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  } catch (err) {
    console.error('getComments error:', err);
    return [];
  }
};

export interface CreateCommentPayload {
  username: string;
  comment: string;
  videoID: string;
}

export const createComment = async (payload: CreateCommentPayload): Promise<Comment> => {
  const res: any = await apiClient.post('/comments', payload);
  if (res && res.data) return res.data;
  return res;
};
