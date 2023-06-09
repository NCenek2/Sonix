import React from "react";
import { useSelector } from "react-redux";

const ViewPost = () => {
  const { post } = useSelector((state) => state.post);
  console.log("VIEW POST", post);
  const handlePost = () => {
    switch (post) {
      case null:
        return <div></div>;
      case false:
        return <div>Can Find Post</div>;
      default:
        const { message, likes, dislikes, posterName } = post;
        return (
          <div className="message-container">
            <div className="single-post">
              <p>{message}</p>
              <p>Written By {posterName}</p>
              <div className="post-reactions">
                <p>Likes: {likes.length}</p>
                <p>Dislikes: {dislikes.length}</p>
              </div>
            </div>
          </div>
        );
    }
  };
  return handlePost();
};

export default ViewPost;
