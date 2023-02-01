const express = require('express');
const { getComment, getComments, createComment, deleteComment, updateComment} = require('../controllers/comments');

const router = express.Router();

const Comment = require('../models/User');

const {  protect } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults');  

router.use(protect);

router.route('/').post(createComment).get(advancedResults(Comment), getComments);
router.route('/:id').get(getComment).put(updateComment).delete(deleteComment);

module.exports = router;