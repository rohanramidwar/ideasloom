import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import reducer from "./reducers";
import App from "./App.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));
const store = configureStore({ reducer });

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
