import { Router } from 'express';
import { getVideos, getVideoById, createVideo } from '../controllers/video.controller';

const router = Router();

router.get('/', getVideos);
router.get('/:videoId', getVideoById);
router.post('/', createVideo);

export default router;
