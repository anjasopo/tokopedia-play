import { useState } from "react";
import axios from "axios";

const useComment = (videoID) => {
  const [comments, setComments] = useState([]);
  const [postingError, setPostingError] = useState(null);

  const postComment = async (username, comment) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/submit-comment`,
        {
          username,
          comment,
          videoID,
        }
      );

      const newComment = response.data.comment;
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      setPostingError(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/comments/?videoID=${videoID}`
      );
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { comments, postingError, postComment, fetchComments };
};

export default useComment;
