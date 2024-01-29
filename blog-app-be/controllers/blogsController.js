const Blogs = require("../models/blogsModel");
const mongoose = require("mongoose");

// get all blogs
const getBlogs = async (req, res) => {
    const blogs = await Blogs.find({}).sort({createdAt: -1});

    res.status(200).json(blogs)
}

// get specific blog
const getSpecificBlog = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such blog exists"});
    }

    const blog = await Blogs.findById(id);

    if(!blog) {
        return res.status(404).json({error: "No such blog exists"});
    }

    res.status(200).json(blog);
}

// create new blog
const createBlogs = async (req, res) => {
    const { userId, title, body } = req.body;

    // create to DB
    try {
      const blogs = await Blogs.setUUID({userId, title, body});
      res.status(200).json(blogs);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

// delete blog
const deleteBlog = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such blog exists"});
    }

    const blog = await Blogs.findOneAndDelete({_id: id});

    if(!blog) {
        return res.status(404).json({error: "No such blog exists"});
    }

    res.status(200).json(blog);
}

// update blog
const updateBlog = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such blog exists"});
    }

    const blog = await Blogs.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!blog) {
        return res.status(404).json({error: "No such blog exists"});
    }

    res.status(200).json(blog);
}

// export
module.exports = {
    createBlogs,
    getBlogs,
    getSpecificBlog,
    deleteBlog,
    updateBlog
}