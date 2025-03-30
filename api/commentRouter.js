const express = require('express');

const replyRouter = require('../routers/replyRouter');

const {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router();

router.use('/:commentId/replies', replyRouter);

router.route('/').get(getComments).post(createComment);
router.route('/:id').get(getComment).patch(updateComment).delete(deleteComment);

module.exports = router;
