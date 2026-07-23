import 'dotenv/config';
import mongoose from 'mongoose';
import Video from '../models/video.model';
import Product from '../models/product.model';
import Comment from '../models/comment.model';
import { connectDatabase } from '../config/database';
import { logger } from '../utils/logger';

const sampleVideos = [
  {
    videoID: 'vid-1',
    urlImageThumbnail: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80',
    titleImageThumbnail: '🔥 DISKON GILA-GILAN KAMERA & ELEKTRONIK CANGGIH!',
    channelName: 'Tokopedia Gadget Store',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    viewsCount: 14200,
    likesCount: 3890,
    isLive: true,
    videoUrl: 'https://www.youtube.com/embed/_jLQIMaTQpw',
  },
  {
    videoID: 'vid-2',
    urlImageThumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    titleImageThumbnail: '🎧 PROMO AUDIOPHILE HEADPHONE & EARPHONE WIRELESS',
    channelName: 'SoundMaster Official',
    channelAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    viewsCount: 8900,
    likesCount: 2150,
    isLive: true,
    videoUrl: 'https://www.youtube.com/embed/_jLQIMaTQpw',
  },
  {
    videoID: 'vid-3',
    urlImageThumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    titleImageThumbnail: '⌚ SMARTWATCH CANGGIH OLAHRAGA & HEALTH TRACKER',
    channelName: 'TechStyle Store',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    viewsCount: 6300,
    likesCount: 1480,
    isLive: false,
    videoUrl: 'https://www.youtube.com/embed/_jLQIMaTQpw',
  },
];

const sampleProducts = [
  {
    productID: 'prod-101',
    urlProduct: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80',
    titleProduct: 'Kamera Mirrorless Pro 4K UHD Ultra Smooth',
    priceProduct: 4999000,
    originalPrice: 7500000,
    discountPercent: 33,
    rating: 4.9,
    videoID: 'vid-1',
  },
  {
    productID: 'prod-102',
    urlProduct: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    titleProduct: 'Headphone Wireless Noise Cancelling Premium',
    priceProduct: 1299000,
    originalPrice: 1999000,
    discountPercent: 35,
    rating: 4.8,
    videoID: 'vid-1',
  },
  {
    productID: 'prod-201',
    urlProduct: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    titleProduct: 'Earbuds Bluetooth Low Latency Gaming',
    priceProduct: 399000,
    originalPrice: 599000,
    discountPercent: 33,
    rating: 4.7,
    videoID: 'vid-2',
  },
];

const sampleComments = [
  {
    username: 'Budi Santoso',
    comment: 'Wah harganya miring banget! Garansi resmi kan min?',
    videoID: 'vid-1',
    userBadge: 'Verified Buyer',
  },
  {
    username: 'Siti Rahma',
    comment: 'Spill kamera depannya dong min pas live ini!',
    videoID: 'vid-1',
    userBadge: 'Penonton Setia',
  },
  {
    username: 'Andi Wijaya',
    comment: 'Barusan aja check out via GoPay dapet cashback!',
    videoID: 'vid-1',
    userBadge: 'Top Spender',
  },
];

const seedDatabase = async () => {
  try {
    await connectDatabase();

    if (mongoose.connection.readyState !== 1) {
      logger.error('❌ MongoDB is not connected! Please set a valid DATABASE_URL in backend/.env or start local MongoDB (mongodb://127.0.0.1:27017/tokopedia-play).');
      process.exit(1);
    }

    logger.info('[Seeder] Clearing old collections...');
    await Video.deleteMany({});
    await Product.deleteMany({});
    await Comment.deleteMany({});

    logger.info('[Seeder] Inserting sample videos...');
    await Video.insertMany(sampleVideos);

    logger.info('[Seeder] Inserting sample products...');
    await Product.insertMany(sampleProducts);

    logger.info('[Seeder] Inserting sample comments...');
    await Comment.insertMany(sampleComments);

    logger.info('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error: any) {
    logger.error(`[Seeder Error] ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
