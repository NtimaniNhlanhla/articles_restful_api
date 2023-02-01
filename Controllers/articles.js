const path = require('path');
const Article = require('../models/Article');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')

// @desc   Get all articles
// @route  GET /api/v1/articles
// @access Public

exports.getArticles = asyncHandler(async (req, res, next) => {

    res.status(200).json(res.advancedResults);

});

// @desc   Get single article
// @route  GET /api/v1/article/:id
// @access Public
exports.getArticle = asyncHandler(async (req, res, next) => {

    const article = await Article.findById(req.params.id);

    if (!article) {
        return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })

});

// @desc   Create new article
// @route  POST /api/v1/article
// @access Private
exports.createArticle = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;


    // If user has permission to create an article
    if (req.user.role !== 'admin') {
        return next(new ErrorResponse(`User does not have permission to create an Article`, 400));
    }

    const article = await Article.create(req.body);

    res.status(201).json({
        success: true,
        data: article
    });

});

// @desc   Update article
// @route  PUT /api/v1/article/:id
// @access Private
exports.updateArticle = asyncHandler(async (req, res, next) => {

    let article = await Article.findById(req.params.id);

    if (!article) {
        return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404));
    }
    // Make sure user is an Article owner
    if (article.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this article`, 401));
    }

    article = await Article.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: article
    })


});

// @desc   delete article
// @route  DELETE /api/v1/article/:id
// @access Private
exports.deleteArticle = asyncHandler(async (req, res, next) => {

    const article = await Article.findById(req.params.id);

    if (!article) {
        return next(new ErrorResponse(`Article not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is an Article owner
    if (article.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this article`, 401));
    }

    article.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
});