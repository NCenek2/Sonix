import React from "react";
import "../../css/Post.css";
import { parseISO, formatDistanceToNow } from "date-fns";
import PostOptions from "./PostOptions";
import { viewPost } from "../../reducers/postReducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const {
    message,
    posterId,
    _id: postId,
    date,
    posterName: name,
    likes,
    dislikes,
  } = post;
  const parsedIso = parseISO(date);
  const timePeriod = formatDistanceToNow(parsedIso);
  const dispatch = useDispatch();

  const handlePost = () => {
    dispatch(viewPost({ postId }));
  };

  React.useState(() => {
  }, [new Date().getMinutes()]);

  return (
    <div className="post">
      <Link
        className="post-message white-text"
        onClick={() => handlePost()}
        to={"/post"}
      >
        {message.length >= 250 ? message.substring(0, 250) + "..." : message}
      </Link>
      <p>-{name}</p>
      <p>{timePeriod} ago</p>
      <PostOptions
        posterId={posterId}
        postId={postId}
        likes={likes}
        dislikes={dislikes}
      />
    </div>
  );
};

export default Post;
