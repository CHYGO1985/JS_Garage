import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      reqiured: true,
    },
    desc: {
      type: String,
      rquired: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislike: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Vedio', VideoSchema, 'youtubeClone');
