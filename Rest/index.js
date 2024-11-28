const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: "1a",
    username: "Himani0002",
    content: "Tit for tat",
  },
  {
    id: "2a",
    username: "Himani0002",
    content: "Tit for tat",
  },
  {
    id: "3a",
    username: "Himani0002",
    content: "Tit for tat",
  },
];

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;

  let post = posts.find((p) => id === p.id);
  if (post) {
    res.render("show", { post });
    res.render("show.ejs");
    // Pass the specific post to the 'show' view
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;

  console.log(id);
  res.send("Patch request is working");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts.filter((p) => id === p.id);
  res.send("Delete");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;

  // Add a unique ID for the new post
  const newPost = {
    id: Math.random().toString(36).substr(2, 5), // Generate a random ID
    username,
    content,
  };

  posts.push(newPost);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
