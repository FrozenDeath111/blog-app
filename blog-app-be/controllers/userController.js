const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '3d'});
};

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);

        // create token
        const token = createToken(user.userId);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// register user
const registerUser = async (req, res) => {
    const {email, name, password} = req.body;

    try {
        const user = await User.register(email, name, password);

        // create token
        const token = createToken(user.userId);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

// update favorite
const addFavorite = async (req, res) => {
    const { id } = req.params;
    const { blogId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user exists"});
    }

    const user = await User.findById(id);

    if(!user) {
        return res.status(404).json({error: "No such user exists"});
    }

    console.log(user);
}

// export
module.exports = {
    loginUser,
    registerUser,
    addFavorite
};