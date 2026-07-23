import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { logger } from '../utils/logger';
import { CommentService } from '../services/comment.service';

let ioInstance: SocketIOServer | null = null;

export const initSocket = (httpServer: HttpServer): SocketIOServer => {
  ioInstance = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  ioInstance.on('connection', (socket: Socket) => {
    logger.info(`[Socket.IO] Client connected: ${socket.id}`);

    socket.on('join:room', (videoId: string) => {
      socket.join(videoId);
      logger.info(`[Socket.IO] Socket ${socket.id} joined room: ${videoId}`);
    });

    socket.on('leave:room', (videoId: string) => {
      socket.leave(videoId);
      logger.info(`[Socket.IO] Socket ${socket.id} left room: ${videoId}`);
    });

    socket.on('comment:post', async (data: { username: string; comment: string; videoID: string }) => {
      try {
        const newComment = await CommentService.createComment(
          data.username,
          data.comment,
          data.videoID
        );
        ioInstance?.to(data.videoID).emit('comment:new', newComment);
      } catch (err: any) {
        socket.emit('error', { message: err.message || 'Failed to post comment' });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  return ioInstance;
};

export const getIO = (): SocketIOServer => {
  if (!ioInstance) {
    throw new Error('Socket.IO not initialized');
  }
  return ioInstance;
};
