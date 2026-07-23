import { useState, useCallback, useEffect } from 'react';
import { getComments, createComment } from '../api/comment.api';

const useComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!videoId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getComments(videoId);
      setComments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  const postComment = useCallback(
    async (username, comment) => {
      if (!videoId) return;

      setPosting(true);
      setPostError(null);

      try {
        const newComment = await createComment({
          username,
          comment,
          videoID: videoId,
        });
        setComments((prev) => [...prev, newComment]);
        return newComment;
      } catch (err) {
        setPostError(err);
        throw err;
      } finally {
        setPosting(false);
      }
    },
    [videoId]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    loading,
    error,
    posting,
    postError,
    postComment,
    refetch: fetchComments,
  };
};

export default useComments;
