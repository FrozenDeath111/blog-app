const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorite: {
        type: Array,
        default: []
    }
});

// static register method
userSchema.statics.register = async function(email, name, password) {
    // validation
    if(!email || !password) {
        throw Error("Not valid entry");
    };

    if(!validator.isEmail(email)) {
        throw Error("Not valid Email");
    };

    if(!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    };

    const exists = await this.findOne({ email });

    if(exists) {
        throw Error('Email exists');
    };

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // creating uuid for user
    const userUUID = ~~Date.now();

    const user = await this.create({ userId:userUUID, email, name, password: hash });

    return user;
};

// static login method
userSchema.statics.login = async function(email, password) {
    // validation
    if(!email || !password) {
        throw Error("Not valid entry");
    };

    const user = await this.findOne({ email });

    if(!user) {
        throw Error('Incorrect Email');
    };

    const valid_password = await bcrypt.compare(password, user.password);
    
    if(!valid_password){
        throw Error('Incorrect Password');
    }
    
    return user;

}

module.exports = mongoose.model('User', userSchema)