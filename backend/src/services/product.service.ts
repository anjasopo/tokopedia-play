import Product, { IProduct } from '../models/product.model';
import { ApiError } from '../utils/ApiError';

export class ProductService {
  static async getProducts(searchQuery = '', videoID = ''): Promise<IProduct[]> {
    const filter: any = {};
    if (searchQuery.trim()) {
      filter.titleProduct = { $regex: searchQuery, $options: 'i' };
    }
    if (videoID.trim()) {
      filter.videoID = videoID;
    }
    return Product.find(filter).sort({ createdAt: -1 }).exec();
  }

  static async getProductById(productId: string): Promise<IProduct> {
    const product = await Product.findOne({ productID: productId }).exec();
    if (!product) {
      throw ApiError.notFound(`Product with ID '${productId}' not found`);
    }
    return product;
  }

  static async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    const existing = await Product.findOne({ productID: data.productID }).exec();
    if (existing) {
      throw ApiError.badRequest(`Product with ID '${data.productID}' already exists`);
    }
    const newProduct = new Product(data);
    return newProduct.save();
  }
}
