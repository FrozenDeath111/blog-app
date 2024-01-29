const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    blogId:{
        type: Number,
        required: true
    },
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, { timestamps: true });

commentsSchema.statics.setUUID = async function(userId, title, body) {
    // creating uuid for comment
    const commentUUID = ~~Date.now();

    const comment = await this.create({userId, id:commentUUID, title, body});

    return comment;
};

module.exports = mongoose.model('Comments', commentsSchema);