import User from '../../models/user.js';
import Video from '../../models/video.js';
import createError from '../../utils/error.js';

export const updateUserById = async ({
  authenticatedUserId,
  targetUserId,
  updates,
}) => {
  if (targetUserId !== authenticatedUserId) {
    throw createError(403, 'You can only update your account!');
  }

  return User.findByIdAndUpdate(
    targetUserId,
    {
      $set: updates,
    },
    { new: true }
  );
};

export const deleteUserById = async ({
  authenticatedUserId,
  targetUserId,
}) => {
  if (targetUserId !== authenticatedUserId) {
    throw createError(403, 'You can only delete your account!');
  }

  await User.findByIdAndDelete(targetUserId);
};

export const findUserById = async (userId) => User.findById(userId);

export const subscribeToUser = async ({
  subscriberUserId,
  targetUserId,
}) => {
  await User.findByIdAndUpdate(subscriberUserId, {
    $push: { subscribedUsers: targetUserId },
  });
  await User.findByIdAndUpdate(targetUserId, {
    $inc: { subscribers: 1 },
  });
};

export const unsubscribeFromUser = async ({
  subscriberUserId,
  targetUserId,
}) => {
  await User.findByIdAndUpdate(subscriberUserId, {
    $pull: { subscribedUsers: targetUserId },
  });
  await User.findByIdAndUpdate(targetUserId, {
    $inc: { subscribers: -1 },
  });
};

export const likeVideoForUser = async ({ userId, videoId }) => {
  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { likes: userId },
    $pull: { dislikes: userId },
  });
};

export const dislikeVideoForUser = async ({ userId, videoId }) => {
  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: userId },
    $pull: { likes: userId },
  });
};
