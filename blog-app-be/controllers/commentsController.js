const Comments = require("../models/commentsModel");
const mongoose = require("mongoose");

// get all comments
const getComments = async (req, res) => {
    const {id} = req.params;
    const comments = await Comments.find({blogId: id}).sort({createdAt: -1});

    res.status(200).json(comments);
}

// create new comments
const createComments = async (req, res) => {
    const { blogId, name, email, body } = req.body;

    // create to DB
    try {
      const comments = await Comments.setUUID(blogId, name, email, body);
      res.status(200).json(comments);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

// delete comment
const deleteComment = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such blog exists"});
    }

    const comment = await Comments.findOneAndDelete({_id: id});

    if(!comment) {
        return res.status(404).json({error: "No such blog exists"});
    }

    res.status(200).json(comment);
}

// update comment
const updateComment = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such blog exists"});
    }

    const comment = await Comments.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    console.log(comment);
    if(!comment) {
        return res.status(404).json({error: "No such blog exists"});
    }

    res.status(200).json(comment);
}

// export
module.exports = {
    createComments,
    getComments,
    deleteComment,
    updateComment
}