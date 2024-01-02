import React, { useState } from "react";
import "../../css/Post.css";
import { parseISO, formatDistanceToNow } from "date-fns";
import PostOptions from "./PostOptions";
import { viewPost } from "../../reducers/postReducer";
import { Link } from "react-router-dom";
import { PostType } from "../../types";
import { useAppDispatch } from "../../reducers";

const Post = ({
  message,
  posterId,
  _id,
  date,
  posterName: name,
  likes,
  dislikes,
}: PostType) => {
  const parsedIso = parseISO(date);
  const timePeriod = formatDistanceToNow(parsedIso);
  const dispatch = useAppDispatch();

  const handlePost = () => {
    dispatch(viewPost(_id));
  };

  return (
    <div className="post">
      <Link
        className="post-message white-text"
        onClick={handlePost}
        to={"/post"}
      >
        {message.length >= 250 ? message.substring(0, 250) + "..." : message}
      </Link>
      <p>-{name}</p>
      <p>{timePeriod} ago</p>
      <PostOptions
        posterId={posterId}
        _id={_id}
        likes={likes}
        dislikes={dislikes}
      />
    </div>
  );
};

export default Post;
