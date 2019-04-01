const express = require("express");
const server = express();

const projectsRouter = require("./routers/projects-router.js");
const actionsRouter = require("./routers/actions-router.js");
server.use(express.json());

server.get("/", (req, res) => {
  res.send("testing the server");
});

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
