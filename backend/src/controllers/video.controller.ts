import { Request, Response } from 'express';
import { VideoService } from '../services/video.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../middlewares/asyncHandler';

export const getVideos = asyncHandler(async (req: Request, res: Response) => {
  const search = (req.query.search as string) || '';
  const videos = await VideoService.getAllVideos(search);
  res.status(200).json(new ApiResponse(200, videos, 'Videos fetched successfully'));
});

export const getVideoById = asyncHandler(async (req: Request, res: Response) => {
  const { videoId } = req.params;
  const video = await VideoService.getVideoById(videoId);
  res.status(200).json(new ApiResponse(200, video, 'Video fetched successfully'));
});

export const createVideo = asyncHandler(async (req: Request, res: Response) => {
  const video = await VideoService.createVideo(req.body);
  res.status(201).json(new ApiResponse(201, video, 'Video created successfully'));
});
