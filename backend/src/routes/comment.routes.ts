import { Router } from 'express';
import { getComments, createComment } from '../controllers/comment.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { createCommentSchema } from '../validators/comment.validator';
import { commentRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.get('/', getComments);
router.post('/', commentRateLimiter, validateRequest(createCommentSchema), createComment);

// Legacy backward-compatibility endpoint
router.post('/submit-comment', commentRateLimiter, validateRequest(createCommentSchema), createComment);

export default router;
