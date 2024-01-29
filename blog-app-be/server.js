require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogs");
const commentsRoutes = require("./routes/comments");
const userRoutes = require("./routes/user");

// app initialization
const app = express();

// middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_END_ORIGIN
}));
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

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
