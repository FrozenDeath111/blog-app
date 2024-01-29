const router = require("express").Router();
const { 
    createBlogs,
    getBlogs,
    getSpecificBlog,
    deleteBlog,
    updateBlog
 } = require("../controllers/blogsController");
const requireAuth = require('../middleware/requireAuth');

// auth for all blogs
// router.use(requireAuth);

// GET all blogs
router.get("/", getBlogs);

// GET single blog
router.get("/:id", getSpecificBlog);

// POST new blog
router.post("/", requireAuth, createBlogs);

// DELETE blog
router.delete("/:id", requireAuth, deleteBlog);

// UPDATE blog
router.patch("/:id", requireAuth, updateBlog);

module.exports = router;
