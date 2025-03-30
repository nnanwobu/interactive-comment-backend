const Comment = require('../models/commentModel');
// const User = require('./../models/usermodel');

const AppError = require('../utilities/apperror');

exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({
      status: 'success',
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'err',
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

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
