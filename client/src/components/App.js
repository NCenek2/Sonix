import React from "react";
import { fetchUser } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Posts from "./Posts/Posts";
import ViewPost from "./Posts/ViewPost";
import EditPost from "./Posts/EditPost";
import AddMessage from "./Posts/AddMessage";
import "../css/App.css";
const Home = () => {
  return <h1>Home</h1>;
};

const App = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  React.useState(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Route path="/homePage" component={Home} exact />
      <Route path="/posts" component={Posts} exact />
      <Route path="/post" component={ViewPost} />
      <Route path="/editPost" component={EditPost} />
      <Route path="/addMessage" component={AddMessage} exact />
    </BrowserRouter>
  );
};

export default App;
