import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, createComment, CreateCommentPayload } from '../api/comment.api';
import { Comment } from '../types';

export function useSocketComments(videoId?: string) {
  const queryClient = useQueryClient();
  const [realtimeComments, setRealtimeComments] = useState<Comment[]>([]);

  // Fetch initial comments using TanStack Query
  const {
    data: initialComments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => (videoId ? getComments(videoId) : Promise.resolve([])),
    enabled: !!videoId,
  });

  // Sync initial comments to state
  useEffect(() => {
    if (initialComments.length > 0) {
      setRealtimeComments(initialComments);
    }
  }, [initialComments]);

  // Connect Socket.IO for real-time live comments
  useEffect(() => {
    if (!videoId) return;

    const wsUrl = import.meta.env.VITE_WS_URL || window.location.origin;
    const socket: Socket = io(wsUrl, {
      transports: ['websocket', 'polling'],
    });

    socket.emit('join:room', videoId);

    socket.on('comment:new', (newComment: Comment) => {
      if (newComment.videoID === videoId) {
        setRealtimeComments((prev) => [newComment, ...prev]);
      }
    });

    return () => {
      socket.emit('leave:room', videoId);
      socket.disconnect();
    };
  }, [videoId]);

  // Post comment mutation with optimistic updates
  const postMutation = useMutation({
    mutationFn: (payload: CreateCommentPayload) => createComment(payload),
    onSuccess: (newComment) => {
      // Append immediately if socket didn't already capture it
      setRealtimeComments((prev) => {
        if (prev.some((c) => c._id === newComment._id)) return prev;
        return [newComment, ...prev];
      });
      queryClient.invalidateQueries({ queryKey: ['comments', videoId] });
    },
  });

  const postComment = useCallback(
    async (username: string, commentText: string) => {
      if (!videoId) return;
      await postMutation.mutateAsync({
        username,
        comment: commentText,
        videoID: videoId,
      });
    },
    [videoId, postMutation]
  );

  return {
    comments: realtimeComments,
    loading: isLoading,
    posting: postMutation.isPending,
    error: isError ? (error as Error) : null,
    postComment,
    refetch,
  };
}
