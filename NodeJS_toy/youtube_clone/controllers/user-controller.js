import winstonLogger from '../config/winston.js';
import User from '../models/user.js';
import video from '../models/video.js';
import Video from '../models/video.js'
import createError from '../utils/error.js';

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can only update your account!'));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can only delete your account!'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribeUser = async (req, res, next) => {
  try {
    // the current usre subscribe api/users/:id (params.id) user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    })
    res.status(200).json('Subscription successful.');
  } catch (err) {
    next(err);
  }
};

export const unsubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json('Unsubscription successfull.');
  } catch (err) {
    next(err);
  }
};

export const likeUser = async (req, res, next) => {
  const likeUserId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: likeUserId },
      $pull: { dislikes: likeUserId }
    });
    res.status(200).json('The video has been liked.');
  } catch (err) {
    next(err);
  }
};

export const dislikeUser = async (req, res, next) => {
  const dislikeUserId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: dislikeUserId },
      $pull: { likes: dislikeUserId }
    });
    res.status(200).json('The video has been liked.');
  } catch (err) {
    next(err);
  }
};