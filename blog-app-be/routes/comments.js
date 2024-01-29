const router = require("express").Router();
const { 
    createComments,
    getComments,
    deleteComment,
    updateComment
 } = require("../controllers/commentsController");
 const requireAuth = require('../middleware/requireAuth');

// GET blog comments
router.get("/:id", getComments);

// POST new comments
router.post("/", requireAuth, createComments);

// DELETE comment
router.delete("/:id", requireAuth, deleteComment);

// UPDATE comment
router.patch("/:id", requireAuth, updateComment);

module.exports = router;