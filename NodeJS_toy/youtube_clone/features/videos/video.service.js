import User from '../../models/user.js';
import Video from '../../models/video.js';
import createError from '../../utils/error.js';

export const createVideo = async ({ userId, videoPayload }) => {
  const newVideo = new Video({ userId, ...videoPayload });
  return newVideo.save();
};

export const updateVideoById = async ({
  authenticatedUserId,
  videoId,
  updates,
}) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw createError(404, 'Video not found!');
  }

  if (authenticatedUserId !== video.userId) {
    throw createError(403, 'You can update only your video!');
  }

  return Video.findByIdAndUpdate(
    videoId,
    {
      $set: updates,
    },
    { new: true, runValidators: true }
  );
};

export const deleteVideoById = async ({
  authenticatedUserId,
  videoId,
}) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw createError(404, 'Video not found!');
  }

  if (authenticatedUserId !== video.userId) {
    throw createError(403, 'You can only delete your own videos!');
  }

  await Video.findByIdAndDelete(videoId);
};

export const findVideoById = async (videoId) => {
  const video = await Video.findById(videoId);
  if (!video) {
    throw createError(404, 'Video not found!');
  }

  return video;
};

export const incrementVideoViews = async (videoId) => {
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $inc: { views: 1 },
    },
    { new: true }
  );

  if (!updatedVideo) {
    throw createError(404, 'Video not found!');
  }

  return updatedVideo;
};

export const listRandomVideos = async () =>
  Video.aggregate([{ $sample: { size: 40 } }]);

export const listTrendingVideos = async () =>
  Video.find().sort({ views: -1 });

export const listSubscribedVideos = async (userId) => {
  const user = await User.findById(userId);
  const subscribedChannels = user.subscribedUsers;

  const videoList = await Promise.all(
    subscribedChannels.map((channelId) => Video.find({ userId: channelId }))
  );

  return videoList.flat().sort((a, b) => b.createdAt - a.createdAt);
};

export const listVideosByTags = async (tags) =>
  Video.find({ tags: { $in: tags } }).limit(20);

export const searchVideos = async (query) =>
  Video.find({
    title: { $regex: query, $options: 'i' },
  }).limit(40);
