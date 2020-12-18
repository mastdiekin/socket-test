const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const db = require("./db");
const posts = require("./middlewares/get-posts");
const Post = require("./models/Post");
const bodyParser = require("body-parser");

app.use("/assets", express.static("client/assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app
  .route("/")
  .get(async (req, res) => {
    return res.sendFile(__dirname + "/client/index.html");
  })
  .post(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      res.statusMessage = "title and content requeries";
      return res.status(300).end();
    }

    return await Post.create({ title, content })
      .then((newpost) => {
        console.log(req.body);
        io.emit("newpost", newpost);
        return res.redirect("/");
      })
      .catch((err) => res.redirect("/error"));
  });

app.post("/posts", async (req, res) => res.json(await posts.getPosts()));

io.on("connection", async (socket) => {
  console.log("a user connected");
});

http.listen(3000, async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("listening on *:3000");
});
