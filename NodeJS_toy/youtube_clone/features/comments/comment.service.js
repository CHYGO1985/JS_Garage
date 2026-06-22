import Comment from '../../models/comment.js';
import Video from '../../models/video.js';
import createError from '../../utils/error.js';

export const createComment = async ({ userId, commentPayload }) => {
  const newComment = new Comment({ userId, ...commentPayload });
  return newComment.save();
};

export const deleteCommentById = async ({
  authenticatedUserId,
  commentId,
}) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw createError(404, 'Comment not found!');
  }

  const video = await Video.findById(comment.videoId);
  const isCommentOwner = authenticatedUserId === comment.userId;
  const isVideoOwner = video && authenticatedUserId === video.userId;

  if (!isCommentOwner && !isVideoOwner) {
    throw createError(
      403,
      'You can delete only your own comment or comments on your video!'
    );
  }

  await Comment.findByIdAndDelete(commentId);
};

export const listCommentsByVideoId = async (videoId) =>
  Comment.find({ videoId }).sort({
    createdAt: -1,
  });
