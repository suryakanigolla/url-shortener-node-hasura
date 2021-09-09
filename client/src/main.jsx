import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Toast from "./Toast";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Toast />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
