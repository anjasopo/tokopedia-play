import { Router } from 'express';
import videoRoutes from './video.routes';
import productRoutes from './product.routes';
import commentRoutes from './comment.routes';

const router = Router();

router.use('/videos', videoRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes);

export default router;
