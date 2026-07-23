import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  videoID: string;
  urlImageThumbnail: string;
  titleImageThumbnail: string;
  channelName?: string;
  channelAvatar?: string;
  viewsCount?: number;
  likesCount?: number;
  isLive?: boolean;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    videoID: {
      type: String,
      required: [true, 'Video ID is required'],
      trim: true,
      unique: true,
    },
    urlImageThumbnail: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
      trim: true,
    },
    titleImageThumbnail: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    channelName: {
      type: String,
      default: 'Tokopedia Official Live',
    },
    channelAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
    },
    viewsCount: {
      type: Number,
      default: 1250,
    },
    likesCount: {
      type: Number,
      default: 340,
    },
    isLive: {
      type: Boolean,
      default: true,
    },
    videoUrl: {
      type: String,
      default: 'https://www.youtube.com/embed/_jLQIMaTQpw',
    },
  },
  {
    timestamps: true,
    collection: 'Video',
  }
);

videoSchema.index({ titleImageThumbnail: 'text' });

export default mongoose.model<IVideo>('Video', videoSchema);
