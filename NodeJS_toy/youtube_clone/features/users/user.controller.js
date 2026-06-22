import {
  deleteUserById,
  dislikeVideoForUser,
  findUserById,
  likeVideoForUser,
  subscribeToUser,
  unsubscribeFromUser,
  updateUserById,
} from './user.service.js';

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await updateUserById({
      authenticatedUserId: req.user.id,
      targetUserId: req.params.id,
      updates: req.body,
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await deleteUserById({
      authenticatedUserId: req.user.id,
      targetUserId: req.params.id,
    });

    return res.status(200).json('User has been deleted.');
  } catch (err) {
    return next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

export const subscribeUser = async (req, res, next) => {
  try {
    await subscribeToUser({
      subscriberUserId: req.user.id,
      targetUserId: req.params.id,
    });

    return res.status(200).json('Subscription successful.');
  } catch (err) {
    return next(err);
  }
};

export const unsubscribeUser = async (req, res, next) => {
  try {
    await unsubscribeFromUser({
      subscriberUserId: req.user.id,
      targetUserId: req.params.id,
    });

    return res.status(200).json('Unsubscription successfull.');
  } catch (err) {
    return next(err);
  }
};

export const likeUser = async (req, res, next) => {
  try {
    await likeVideoForUser({
      userId: req.user.id,
      videoId: req.params.videoId,
    });

    return res.status(200).json('The video has been liked.');
  } catch (err) {
    return next(err);
  }
};

export const dislikeUser = async (req, res, next) => {
  try {
    await dislikeVideoForUser({
      userId: req.user.id,
      videoId: req.params.videoId,
    });

    return res.status(200).json('The video has been liked.');
  } catch (err) {
    return next(err);
  }
};
