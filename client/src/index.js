import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import "materialize-css/dist/css/materialize.min.css";
import store from "./reducers";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
