const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required: [true, 'Please add a Comment']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    article: {
        type: mongoose.Schema.ObjectId,
        ref: 'Article',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema)