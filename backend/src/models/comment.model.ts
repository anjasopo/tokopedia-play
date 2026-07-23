import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  username: string;
  comment: string;
  videoID: string;
  avatarUrl?: string;
  userBadge?: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      maxlength: [50, 'Username cannot exceed 50 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    videoID: {
      type: String,
      required: [true, 'Video ID is required'],
      trim: true,
    },
    avatarUrl: {
      type: String,
    },
    userBadge: {
      type: String,
      default: 'Penonton',
    },
  },
  {
    timestamps: true,
    collection: 'Comment',
  }
);

commentSchema.index({ videoID: 1, createdAt: -1 });

export default mongoose.model<IComment>('Comment', commentSchema);
