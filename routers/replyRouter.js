const express = require('express');

const {
  createReply,
  getReplies,
  deleteReply,
  updateReply,
  getReply,
  noCommentNoUser,
} = require('../controllers/replyController');
const router = express.Router({ mergeParams: true });
router.route('/').get(getReplies).post(noCommentNoUser, createReply);

router.route('/:id').get(getReply).patch(updateReply).delete(deleteReply);

module.exports = router;
