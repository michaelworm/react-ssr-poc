import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import catFactsReducer from "./store/catFactsSlice";
import App from "./App";

const store = configureStore({
  preloadedState: window.__PRELOADED_STATE__,
  reducer: {
    catFacts: catFactsReducer,
  },
});

delete window.__PRELOADED_STATE__;

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
