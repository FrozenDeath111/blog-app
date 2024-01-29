const router = require("express").Router();
const { 
    createComments,
    getComments,
    deleteComment,
    updateComment
 } = require("../controllers/commentsController");

// GET all comments
router.get("/", createComments);

// POST new comments
router.post("/", getComments);

// DELETE comment
router.delete("/:id", deleteComment);

// UPDATE comment
router.patch("/:id", updateComment);

module.exports = router;