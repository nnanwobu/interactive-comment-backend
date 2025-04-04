const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'comment must have a content'],
      trim: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    replyTo: {
      type: String,
      default: '',
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: [true, 'reply must have an author'],
      },
    ],
    comment: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
        require: [true, 'reply must brlong to a comment'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

replySchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name photo email active' });
  next();
});

replySchema.post('save', function (doc, next) {
  console.log('data successfully added');
  next();
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
