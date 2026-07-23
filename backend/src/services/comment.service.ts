import Comment, { IComment } from '../models/comment.model';
import Video from '../models/video.model';
import { ApiError } from '../utils/ApiError';

export class CommentService {
  static async getComments(videoID: string): Promise<IComment[]> {
    if (!videoID) {
      return [];
    }
    return Comment.find({ videoID }).sort({ createdAt: -1 }).limit(100).exec();
  }

  static async createComment(username: string, commentText: string, videoID: string): Promise<IComment> {
    const video = await Video.findOne({ videoID }).exec();
    if (!video) {
      throw ApiError.notFound(`Video with ID '${videoID}' not found`);
    }

    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;
    const badges = ['Verified Buyer', 'Top Spender', 'Penonton Setia'];
    const userBadge = badges[Math.floor(Math.random() * badges.length)];

    const newComment = new Comment({
      username,
      comment: commentText,
      videoID,
      avatarUrl,
      userBadge,
    });

    return newComment.save();
  }
}
