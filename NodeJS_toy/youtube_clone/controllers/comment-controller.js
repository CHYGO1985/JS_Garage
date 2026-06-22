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
    if (!comment) {
      return next(createError(404, 'Comment not found!'));
    }

    const video = await Video.findById(comment.videoId);
    const isCommentOwner = req.user.id === comment.userId;
    const isVideoOwner = video && req.user.id === video.userId;

    if (!isCommentOwner && !isVideoOwner) {
      return next(
        createError(403, 'You can delete only your own comment or comments on your video!')
      );
    }

    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json('The comment has been deleted.');
  } catch (err) {
    return next(err);
  }
};

// GET /video/:videoId
export const getCommentsByVideoId = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({
      createdAt: -1,
    });
    return res.status(200).json(comments);
  } catch (err) {
    return next(err);
  }
};
