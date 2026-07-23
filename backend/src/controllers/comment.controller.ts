import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../middlewares/asyncHandler';
import { getIO } from '../socket';

export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const videoID = (req.query.videoID as string) || '';
  const comments = await CommentService.getComments(videoID);
  res.status(200).json(new ApiResponse(200, comments, 'Comments fetched successfully'));
});

export const createComment = asyncHandler(async (req: Request, res: Response) => {
  const { username, comment, videoID } = req.body;
  const newComment = await CommentService.createComment(username, comment, videoID);

  // Broadcast comment to Socket.IO room for real-time live chat stream
  try {
    const io = getIO();
    io.to(videoID).emit('comment:new', newComment);
  } catch (err) {
    // Socket emit failure shouldn't fail HTTP response
  }

  res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully'));
});
