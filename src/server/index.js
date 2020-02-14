import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "../shared/App";
import serialize from "serialize-javascript";
import { matchPath, StaticRouter } from "react-router-dom";
import routes from "../shared/routes";
import paths from "../../config/paths";
import { configureStore } from "../shared/store";
import { Provider } from "react-redux";
const app = express();
global.testLog = function() {
  console.log("this the test log from server");
};
app.use(cors());

app.use(express.static(paths.clientBuild));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};
  // const promise = activeRoute.fetchInitialData
  //   ? activeRoute.fetchInitialData(req.path)
  //   : Promise.resolve();

  // promise
  //   .then(data => {
  //     const context = { data };
  //     const store = configureStore();
  //     const markup = renderToString(
  //       <Provider store={store}>
  //         <StaticRouter location={req.url} context={context}>
  //           <App />
  //         </StaticRouter>
  //       </Provider>
  //     );
  //     res.send(`<!doctype html>
  //     <html>
  //       <head>
  //         <title>SSR with RR</title>
  //         <script src='/bundle.js' defer></script>
  //         <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
  //       </head>
  //       <body>
  //         <div id='app'>${markup}</div>
  //       </body>
  //     </html>
  //   `);
  //   })
  //   .catch(err => next());
  const context = {};
  const store = configureStore();
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );
  res.send(`<!doctype html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src='/bundle.js' defer></script>
          <script>window.__INITIAL_DATA__ = </script>
        </head>
        <body>
          <div id='app'>${markup}</div>
        </body>
      </html>
    `);
});
app.listen(3000, () => {
  console.log("app listeng on port ", 3000);
});
