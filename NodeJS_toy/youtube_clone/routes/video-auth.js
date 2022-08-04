import express from 'express';
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addViewCount,
  randomVideos,
  getSubscribedVideo,
  getByTag,
  searchVideo
} from '../controllers/video-controller.js';
import { verifyToken } from '../middleware/verify-token.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);
router.get("/sub", verifyToken, getSubscribedVideo);

export default router;