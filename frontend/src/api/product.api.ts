import apiClient from './client';
import { ApiResponse, Product } from '../types';

export interface GetProductsParams {
  search?: string;
  videoID?: string;
}

export const getProducts = async (params: GetProductsParams = {}): Promise<Product[]> => {
  const queryParams: Record<string, string> = {};
  if (params.search) queryParams.search = params.search;
  if (params.videoID) queryParams.videoID = params.videoID;

  const response = (await apiClient.get('/products', { params: queryParams })) as unknown as ApiResponse<Product[]>;
  return response.data || [];
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  const response = (await apiClient.get(`/products/${productId}`)) as unknown as ApiResponse<Product>;
  return response.data || null;
};
