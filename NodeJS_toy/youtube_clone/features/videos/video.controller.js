import {
  createVideo,
  deleteVideoById,
  findVideoById,
  incrementVideoViews,
  listRandomVideos,
  listSubscribedVideos,
  listTrendingVideos,
  listVideosByTags,
  searchVideos,
  updateVideoById,
} from './video.service.js';

export const addVideo = async (req, res, next) => {
  try {
    const savedVideo = await createVideo({
      userId: req.user.id,
      videoPayload: req.body,
    });

    return res.status(200).json(savedVideo);
  } catch (err) {
    return next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const updatedVideo = await updateVideoById({
      authenticatedUserId: req.user.id,
      videoId: req.params.id,
      updates: req.body,
    });

    return res.status(200).json(updatedVideo);
  } catch (err) {
    return next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    await deleteVideoById({
      authenticatedUserId: req.user.id,
      videoId: req.params.id,
    });

    return res.status(200).json('The video has been deleted.');
  } catch (err) {
    return next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await findVideoById(req.params.id);
    return res.status(200).json(video);
  } catch (err) {
    return next(err);
  }
};

export const addViewCount = async (req, res, next) => {
  try {
    const video = await incrementVideoViews(req.params.id);
    return res.status(200).json(video);
  } catch (err) {
    return next(err);
  }
};

export const randomVideos = async (req, res, next) => {
  try {
    const videos = await listRandomVideos();
    return res.status(200).json(videos);
  } catch (err) {
    return next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await listTrendingVideos();
    return res.status(200).json(videos);
  } catch (err) {
    return next(err);
  }
};

export const getSubscribedVideo = async (req, res, next) => {
  try {
    const videos = await listSubscribedVideos(req.user.id);
    return res.status(200).json(videos);
  } catch (err) {
    return next(err);
  }
};

export const getByTag = async (req, res, next) => {
  try {
    const videos = await listVideosByTags(req.query.tags.split(','));
    return res.status(200).json(videos);
  } catch (err) {
    return next(err);
  }
};

export const searchVideo = async (req, res, next) => {
  try {
    const videos = await searchVideos(req.query.q);
    return res.status(200).json(videos);
  } catch (err) {
    return next(err);
  }
};
