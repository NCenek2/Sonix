import React from "react";
import { fetchUser } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Posts from "./Posts/Posts";
import ViewPost from "./Posts/ViewPost";
import EditPost from "./Posts/EditPost";
import AddMessage from "./Posts/AddMessage";
import "../css/App.css";

const App = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  React.useState(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  return (
    <BrowserRouter basename="/">
      <Header />
      <Routes>
        <Route path="homePage" element={<HomePage />} exact />
        <Route path="posts" element={<Posts />} exact />
        <Route path="post" element={<ViewPost />} />
        <Route path="editPost" element={<EditPost />} />
        <Route path="addMessage" element={<AddMessage />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
