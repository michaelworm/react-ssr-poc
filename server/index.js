import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import catFactsReducer, { fetchCatFacts } from "../src/store/catFactsSlice";
import App from "../src/App";

const PORT = process.env.PORT || 3000;
const app = express();

function renderFullPage(res, app, finalState) {
  const indexFile = path.resolve("./build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);

      return res.status(500).send("Oops, better luck next time!");
    }

    res.send(
      data
        .replace(
          "<!-- ### __PRELOADED_STATE__ ### -->",
          `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(finalState)}</script>`
        )
        .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
}

function renderApp(req, res) {
  const store = configureStore({
    reducer: {
      catFacts: catFactsReducer,
    },
  });

  // load the cat facts via api
  store.dispatch(fetchCatFacts()).then(() => {
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    );

    renderFullPage(res, app, store.getState())
  });
}

app.get("/", renderApp);
app.get("/cat-facts", renderApp);

app.use(express.static("./build"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
