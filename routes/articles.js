const express = require('express');
const { getArticles, getArticle, updateArticle, deleteArticle, createArticle} = require('../controllers/articles');

const router = express.Router();

const Article = require('../models/User');

const {  protect } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults');  

router.use(protect);

router.route('/').post(createArticle).get(advancedResults(Article), getArticles);
router.route('/:id').get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;