import Comment from '../models/comment.js';
import Video from '../models/video.js'; 
import createError from '../utils/error.js';

// POST /
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ userId: req.user.id, ...req.body });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

// DELET /:id (id is user id)
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json('The comment has been deleted.')
    } else {
      return next(createError(403, 'You can delete ony your comment!'));
    }
  } catch (err) {
    next(err);
  }
};

// GET /:id
export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};