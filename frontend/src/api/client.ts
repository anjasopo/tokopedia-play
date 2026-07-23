import axios, { AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient = axios.create({
  baseURL: BASE_URL ? `${BASE_URL}/api/v1` : '/api/v1',
  timeout: 30000, // 30s timeout to accommodate serverless cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;

    // Handle standardized API response format { success, message, data }
    if (data && typeof data === 'object' && 'success' in data) {
      return data;
    }

    // Handle legacy response format
    return { success: true, data } as ApiResponse<unknown>;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    const customError = new Error(message);
    (customError as any).status = error.response?.status;
    (customError as any).errors = error.response?.data?.errors;

    return Promise.reject(customError);
  }
);

export default apiClient;
