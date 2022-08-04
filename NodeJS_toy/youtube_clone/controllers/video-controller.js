import User from '../models/user.js';
import Video from '../models/video.js';
import createError from '../utils/error.js';

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return new (createError(404, 'Video not found!'));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateVideo);
    } else {
      return next(createError(403, 'You can update only your video!'));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found!'));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('The video has been deleted.');
    } else {
      return new (createError(403, 'You can only delete your own videos!'));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addViewCount = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
};

export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    // -1: in desc order, 1: in asc order
    const video = await Video.find().sort({ views: -1 });
    res.status(200).json(vidoes);
  } catch (err) {
    next(err);
  }
};

export const getSubscribedVideo = async (req, res, next) => {
  try {
    // get the subed user list of the current user
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    // get the list of videos for the subed user lists
    const videoList = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );
    // return the list via date added in desc order
    res.status(200).json(videoList.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

// the query will be like /api/videos/tags?tags=js,py,c (after ? are the query)
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(',');
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// /api/videos/tags?q=js (after ? are the q)
export const searchVideo = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: 'i' }
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
