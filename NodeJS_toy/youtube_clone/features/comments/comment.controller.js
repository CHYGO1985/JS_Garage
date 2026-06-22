import {
  createComment,
  deleteCommentById,
  listCommentsByVideoId,
} from './comment.service.js';

export const addComment = async (req, res, next) => {
  try {
    const savedComment = await createComment({
      userId: req.user.id,
      commentPayload: req.body,
    });

    return res.status(200).send(savedComment);
  } catch (err) {
    return next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await deleteCommentById({
      authenticatedUserId: req.user.id,
      commentId: req.params.id,
    });

    return res.status(200).json('The comment has been deleted.');
  } catch (err) {
    return next(err);
  }
};

export const getCommentsByVideoId = async (req, res, next) => {
  try {
    const comments = await listCommentsByVideoId(req.params.videoId);
    return res.status(200).json(comments);
  } catch (err) {
    return next(err);
  }
};
