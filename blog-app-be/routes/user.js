const express = require("express");
const {
    loginUser,
    registerUser,
    addFavorite
} = require("../controllers/userController");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// login
router.post('/login', loginUser);

// register
router.post('/register', registerUser);

// add favorite
router.patch('/add-fav/:id', addFavorite);

module.exports = router;

/*

*/