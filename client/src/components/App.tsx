import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Posts from "./Posts/Posts";
import ViewPost from "./Posts/ViewPost";
import EditPost from "./Posts/EditPost";
import AddMessage from "./Posts/AddMessage";
import "../css/App.css";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../reducers";
import { fetchUser } from "../reducers/authReducer";

const App = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post" element={<ViewPost />} />
        <Route path="/editPost" element={<EditPost />} />
        <Route path="/addMessage" element={<AddMessage />} />
      </Route>
    </Routes>
  );
};

export default App;
