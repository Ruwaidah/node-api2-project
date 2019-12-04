const express = require("express");

const postRouter = require("./Routers/postsRouter");

const server = express();

server.use("/posts", postRouter);

server.listen(9000, () => {
  console.log("\n*** Server Running on http://localhost:9000 ***\n");
});
