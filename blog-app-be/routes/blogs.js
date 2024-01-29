const router = require("express").Router();
const { 
    createBlogs,
    getBlogs,
    getSpecificBlog,
    deleteBlog,
    updateBlog
 } = require("../controllers/blogsController");

// GET all blogs
router.get("/", getBlogs);

// GET single blog
router.get("/:id", getSpecificBlog);

// POST new blog
router.post("/", createBlogs);

// DELETE blog
router.delete("/:id", deleteBlog);

// UPDATE blog
router.patch("/:id", updateBlog);

module.exports = router;
