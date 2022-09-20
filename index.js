const auth = require("json-server-auth");
const jsonServer = require("json-server");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

global.io = io;

const router = jsonServer.router("db.json");

// response middleware
router.render = (req, res) => {
  const path = req.path;
  const method = req.method;
  // console.log(req)
  // console.log(req.headers["user-email"]);
  // console.log(res.locals.data)

//   if (
//     path.includes("/conversations") &&
//     (method === "POST" || method === "PATCH")
//   ) {
//     // emit socket event
//     io.emit("conversation", {
//       data: res.locals.data,
//     });
//   }


//   if (path.includes("/messages") && method === "POST") {
//     // emit socket event
//     io.emit("message", {
//       data: res.locals.data,
//     });
//   }

//   if (path.includes("/messages") && method === "GET") {
//     let checkUser =
//       req.headers["user-email"] === res.locals.data[0].sender.email ||
//       req.headers["user-email"] === res.locals.data[0].receiver.email;
//     if (!checkUser) {
//       res.locals.data = [];
//     }
//   }

  res.json(res.locals.data);
};

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;

app.use(middlewares);

const rules = auth.rewriter({
  users: 640,
  teams: 660,
  projects: 660,
});

app.use(rules);
app.use(auth);
app.use(router);

server.listen(port);
