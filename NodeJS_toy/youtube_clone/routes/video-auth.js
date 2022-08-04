import express from 'express';
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addViewCount,
  randomVideos,
  trend,
  getSubscribedVideo,
  getByTag,
  searchVideo
} from '../controllers/video-controller.js';
import { verifyToken } from '../middleware/verify-token.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.get("/sub", verifyToken, getSubscribedVideo);
router.get('/trend', verifyToken, trend);

export default router;