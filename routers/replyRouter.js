const express = require('express');

const {
  createReply,
  getReplies,
  deleteReply,
  updateReply,
  getReply,
  noCommentNoUser,
} = require('../controllers/replyController');
// const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });
//  router.param('id', checkId)

// router.use(authController.protect);
router.route('/').get(getReplies).post(noCommentNoUser, createReply);
// router.route('/').get(getReplies).post(createReply);

router.route('/:id').get(getReply).patch(updateReply).delete(deleteReply);

module.exports = router;
