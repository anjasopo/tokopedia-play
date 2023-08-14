import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useComment from "../hooks/useComment";

const VideoDetail = () => {
  let { idData } = useParams();

  const { comments, postComment, fetchComments } = useComment(idData);

  const [dataVideo, setDataVideo] = useState([]);

  const handlePrice = (price) => {
    if (price === 0) {
      return "FREE";
    } else {
      let reverse = price.toString().split("").reverse().join("");
      let ribuan = reverse.match(/\d{1,3}/g);
      return "Rp " + ribuan.join(".").split("").reverse().join("");
    }
  };

  const formatTimeDifference = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDifference = Math.floor((now - commentTime) / 1000); // Convert to seconds

    if (timeDifference < 60) {
      return "just now";
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < 2592000) {
      const days = Math.floor(timeDifference / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      return commentTime.toLocaleString();
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const comment = e.target.comment.value;

    if (username && comment) {
      try {
        await postComment(username, comment);
        e.target.username.value = "";
        e.target.comment.value = "";
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (idData !== undefined) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/products?videoID=${idData}`)
        .then((res) => {
          setDataVideo(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idData]);

  useEffect(() => {
    if (idData !== undefined) {
      fetchComments();
    }
  }, [idData, fetchComments]);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-2">
        <div className="col-span-1 p-4 space-y-4 bg-gray-100 rounded-box">
          {dataVideo.map((product) => (
            <div
              key={product._id}
              className="mx-auto mt-5 overflow-hidden duration-300 transform bg-white rounded-lg shadow-md w-80 dark:bg-slate-800 hover:scale-105 hover:shadow-lg"
            >
              <img
                className="object-cover object-center w-full h-48"
                src={product.urlProduct}
                alt={product.titleProduct}
              />
              <div className="p-4">
                <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  {product.titleProduct}
                </h2>
                <p className="mb-2 text-base text-gray-700 dark:text-gray-300">
                  {handlePrice(product.priceProduct)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-2 p-4 rounded-box">
          <div className="aspect-video mt-52">
            <iframe
              title="Judul Video"
              className="w-full h-full rounded-box"
              src="https://www.youtube.com/embed/_jLQIMaTQpw"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="col-span-1 p-4 bg-gray-100 rounded-box">
          {comments.map((comment) => (
            <div key={comment._id} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                    alt="User Avatar"
                  />
                </div>
              </div>
              <div className="chat-header">
                {comment.username}
                <time className="text-xs opacity-50">
                  {" "}
                  {formatTimeDifference(comment.timestamp)}
                </time>
              </div>
              <div className="chat-bubble">{comment.comment}</div>
            </div>
          ))}

          <div className="content-end max-w-xl p-4 mx-auto mt-40 border border-gray-300 rounded-lg">
            <h2 className="mb-2 text-lg font-medium">Leave a comment</h2>
            <form onSubmit={handlePostComment}>
              <div className="mb-4">
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="name"
                >
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:border-gray-500"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 font-medium text-gray-700"
                  htmlFor="comment"
                >
                  Comment
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:border-gray-500"
                  name="comment"
                  id="comment"
                  placeholder="Enter your comment"
                  defaultValue={""}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
