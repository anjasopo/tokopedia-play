export interface Video {
  _id: string;
  videoID: string;
  urlImageThumbnail: string;
  titleImageThumbnail: string;
  channelName?: string;
  channelAvatar?: string;
  viewsCount?: number;
  likesCount?: number;
  isLive?: boolean;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id: string;
  productID: string;
  urlProduct: string;
  titleProduct: string;
  priceProduct: number;
  originalPrice?: number;
  discountPercent?: number;
  rating?: number;
  soldCount?: number;
  videoID: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  _id: string;
  username: string;
  comment: string;
  videoID: string;
  avatarUrl?: string;
  userBadge?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}
