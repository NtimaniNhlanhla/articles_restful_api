const Comment = require('../models/Comment');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc   Get all comments
// @route  GET /api/v1/comments
// @access Public

exports.getComments = asyncHandler(async (req, res, next) => {

    res.status(200).json(res.advancedResults);

});

// @desc   Get single comment
// @route  GET /api/v1/comment/:id
// @access Public
exports.getComment = asyncHandler(async (req, res, next) => {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: comment
    })

});

// @desc   Create new comment
// @route  POST /api/v1/comment
// @access Private
exports.createComment = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;
    req.boddy.comment = req.params.articleId

    const comment = await Comment.create(req.body);

    res.status(201).json({
        success: true,
        data: comment
    });

});

// @desc   Update comment
// @route  PUT /api/v1/comment/:id
// @access Private
exports.updateComment = asyncHandler(async (req, res, next) => {

    let comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }
    // Make sure user is Comment owner
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this comment`, 401));
    }

    comment = await Comment.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: comment
    })


});

// @desc   delete comment
// @route  DELETE /api/v1/comment/:id
// @access Private
exports.deleteComment = asyncHandler(async (req, res, next) => {

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is an Article owner
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this comment`, 401));
    }

    comment.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
});