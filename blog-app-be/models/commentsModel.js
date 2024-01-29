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

commentsSchema.statics.setUUID = async function(blogId, name, email, body) {
    // creating uuid for comment
    const commentUUID = ~~Date.now();

    const comment = await this.create({blogId, id:commentUUID, name, email, body});

    return comment;
};

module.exports = mongoose.model('Comments', commentsSchema);