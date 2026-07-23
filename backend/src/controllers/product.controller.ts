import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../middlewares/asyncHandler';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const search = (req.query.search as string) || '';
  const videoID = (req.query.videoID as string) || '';
  const products = await ProductService.getProducts(search, videoID);
  res.status(200).json(new ApiResponse(200, products, 'Products fetched successfully'));
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = await ProductService.getProductById(productId);
  res.status(200).json(new ApiResponse(200, product, 'Product fetched successfully'));
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);
  res.status(201).json(new ApiResponse(201, product, 'Product created successfully'));
});
