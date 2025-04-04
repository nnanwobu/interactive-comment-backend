// const catchAsync = require('../utilities/catchAsync');
// const Review = require('../models/reviewModel');
// const factory = require('./handlerFactory');

const User = require('./../models/usermodel');

const AppError = require('./../utilities/apperror');
const Reply = require('../models/replyModel');

exports.noCommentNoUser = (req, res, next) => {
  if (!req.body.comment) req.body.comment = req.params.commentId;
  if (!req.body.user) req.body.user = '67e6c5908c3599577ca4e6ac';
  next();
};

exports.createReply = async (req, res, next) => {
  try {
    const reply = await Reply.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        reply,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.getReplies = async (req, res, next) => {
  try {
    const replies = await Reply.find();
    res.status(200).json({
      status: 'success',
      data: {
        replies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};
exports.getReply = async (req, res, next) => {
  try {
    const reply = await Reply.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        reply,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.updateReply = async (req, res) => {
  try {
    const reply = await Reply.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        reply,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteReply = async (req, res) => {
  try {
    await Reply.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
// exports.getAllReviews = factory.getAll(Review);
// exports.createReview = factory.createOne(Review);
// exports.getReview = factory.getOne(Review);
// exports.deleteReview = factory.deleteOne(Review);
// exports.updateReview = factory.updateOne(Review);

// exports.createReview= catchAsync(async(req,res,next)=>{
//     if(!req.body.tour) req.body.tour=req.params.tourId;
//     if(!req.body.user) req.body.user=req.user.id
//     const review= await Review.create(req.body)

//     res.status(201).json({
//         status:'success',
//         data:{
//             review
//         }
//     })
// })

// exports.getAllReviews= catchAsync(async(req,res,next)=>{
//     let filter={};
//     if(req.params.tourId) filter={tour:req.params.tourId}
//     const reviews= await Review.find(filter)
//     res.status(200).json({
//         status:'success',
//         results: reviews.length,
//         data:{
//             reviews
//         }
//     })
// })
