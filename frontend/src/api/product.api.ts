import apiClient from './client';
import { Product } from '../types';

export interface GetProductsParams {
  search?: string;
  videoID?: string;
}

export const getProducts = async (params: GetProductsParams = {}): Promise<Product[]> => {
  try {
    const queryParams: Record<string, string> = {};
    if (params.search) queryParams.search = params.search;
    if (params.videoID) queryParams.videoID = params.videoID;

    const res: any = await apiClient.get('/products', { params: queryParams });
    if (Array.isArray(res)) return res;
    if (res && Array.isArray(res.data)) return res.data;
    if (res && res.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  } catch (err) {
    console.error('getProducts error:', err);
    return [];
  }
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const res: any = await apiClient.get(`/products/${productId}`);
    if (res && res.data && typeof res.data === 'object') return res.data;
    if (res && typeof res === 'object' && 'productID' in res) return res;
    return null;
  } catch (err) {
    console.error('getProductById error:', err);
    return null;
  }
};
