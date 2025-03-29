const mongoose = require('mongoose');
// const Comment = require('./commentModel');
// const User = require('./usermodel');
// slugify = require('slugify');

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

// tourSchema.index({price:1})
// tourSchema.index({ price: 1, ratingsAverage: -1 });
// tourSchema.index({ slug: 1 });
// tourSchema.index({ startLocation: '2dsphere' });

// replySchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'tour',
//   localField: '_id',
// });

replySchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name photo' });
  next();
});
// replySchema.pre(/^find/, function (next) {
//   this.populate({ path: 'comment', select: 'content ' });
//   next();
// });

replySchema.post('save', function (doc, next) {
  console.log('data successfully added');
  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   this.find({ secreteTour: { $ne: true } });
//   this.start = Date.now();
//   // console.log(docs)
//   next();
// });

// tourSchema.pre('aggregate',function(next){
//     this.pipeline().unshift({$match:{secreteTour:{$ne:true}}})
//     // console.log(this.pipeline());
//     next();
// })

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
