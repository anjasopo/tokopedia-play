import apiClient from './client';
import { ApiResponse, Comment } from '../types';

export const getComments = async (videoID: string): Promise<Comment[]> => {
  const params = videoID ? { videoID } : {};
  const response = (await apiClient.get('/comments', { params })) as unknown as ApiResponse<Comment[]>;
  return response.data || [];
};

export interface CreateCommentPayload {
  username: string;
  comment: string;
  videoID: string;
}

export const createComment = async (payload: CreateCommentPayload): Promise<Comment> => {
  const response = (await apiClient.post('/comments', payload)) as unknown as ApiResponse<Comment>;
  return response.data;
};
