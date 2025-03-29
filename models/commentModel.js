const mongoose = require('mongoose');
// const User = require('./usermodel');

// const Reply = require('./replyModel');

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
    // replies: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Reply',
    //   },
    // ],

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    //     reviews:[{

    //         type: mongoose.Schema.ObjectId,
    //         ref: Review
    //     }
    // ],
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
  this.populate({ path: 'user', select: 'name photo' });

  next();
});
commentSchema.pre(/^find/, function (next) {
  this.populate({ path: 'replies', select: 'content user createdAt id' });

  next();
});
commentSchema.post('save', function (doc, next) {
  console.log('data successfully added');
  next();
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
