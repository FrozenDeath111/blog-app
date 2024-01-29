const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogsSchema = new Schema({
    userId:{
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, { timestamps: true });

// set blogUUID with static method
blogsSchema.statics.setUUID = async function(userId, title, body) {
    // creating uuid for blog
    const blogUUID = ~~Date.now();

    const blog = await this.create({userId, id:blogUUID, title, body});

    return blog;
};

module.exports = mongoose.model('Blogs', blogsSchema);

