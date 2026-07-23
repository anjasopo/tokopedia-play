import Video, { IVideo } from '../models/video.model';
import { ApiError } from '../utils/ApiError';

export class VideoService {
  static async getAllVideos(searchQuery = ''): Promise<IVideo[]> {
    const filter: any = {};
    if (searchQuery.trim()) {
      filter.$or = [
        { titleImageThumbnail: { $regex: searchQuery, $options: 'i' } },
        { channelName: { $regex: searchQuery, $options: 'i' } },
      ];
    }
    return Video.find(filter).sort({ createdAt: -1 }).exec();
  }

  static async getVideoById(videoId: string): Promise<IVideo> {
    const video = await Video.findOne({ videoID: videoId }).exec();
    if (!video) {
      throw ApiError.notFound(`Video with ID '${videoId}' not found`);
    }
    return video;
  }

  static async createVideo(data: Partial<IVideo>): Promise<IVideo> {
    const existing = await Video.findOne({ videoID: data.videoID }).exec();
    if (existing) {
      throw ApiError.badRequest(`Video with ID '${data.videoID}' already exists`);
    }
    const newVideo = new Video(data);
    return newVideo.save();
  }
}
