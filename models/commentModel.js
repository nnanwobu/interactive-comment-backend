const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'tour must have a content'],
      trim: true,
    },
    score: {
      type: Number,
      default: 0,
    },

    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.virtual('replies', {
  ref: 'Reply',
  foreignField: 'comment',
  localField: '_id',
});

commentSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name photo email active' });

  next();
});
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'replies',
    select: 'id content user score replyTo createdAt ',
  });

  next();
});
commentSchema.post('save', function (doc, next) {
  console.log('data successfully added');
  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
