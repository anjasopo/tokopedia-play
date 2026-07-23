import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productID: string;
  urlProduct: string;
  titleProduct: string;
  priceProduct: number;
  originalPrice?: number;
  discountPercent?: number;
  rating?: number;
  videoID: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    productID: {
      type: String,
      required: [true, 'Product ID is required'],
      trim: true,
      unique: true,
    },
    urlProduct: {
      type: String,
      required: [true, 'Product URL is required'],
      trim: true,
    },
    titleProduct: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    priceProduct: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    videoID: {
      type: String,
      required: [true, 'Video ID is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'Product',
  }
);

productSchema.index({ videoID: 1 });
productSchema.index({ titleProduct: 'text' });

export default mongoose.model<IProduct>('Product', productSchema);
