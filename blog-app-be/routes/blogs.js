const router = require('express').Router();

// GET all blogs
router.get('/', (req, res) => {
    res.json({mssg: "this works"})
})

// GET single blog
router.get('/:id', (req, res) => {

})

// POST new blog
router.post('/', (req, res) => {

})

// DELETE blog
router.delete('/:id', (req, res) => {

})

// UPDATE blog
router.patch('/:id', (req, res) => {

})

module.exports = router