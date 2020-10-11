const express = require("express");
const actionRouter = require("./action/actionRouter");
const projectRouter = require("./project/projectRouter")
const welcomeRouter = require("./welcome/welcome-router");
const server = express();

server.use(express.json());
server.use("/api/action", actionRouter);
// server.use("/api/project", projectRouter);
server.use(welcomeRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong, please try again later",
    });
  });



  module.exports = server;

