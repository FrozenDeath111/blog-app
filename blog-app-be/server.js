require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogs");
const commentsRoutes = require("./routes/comments");
const userRoutes = require("./routes/user");

// app initialization
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/blogs", blogsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/user", userRoutes);

// db connection
mongoose
  .connect(process.env.URI)
  .then(() => {
    // listen port
    app.listen(process.env.PORT, () => {
      console.log(`DB connected & Listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
