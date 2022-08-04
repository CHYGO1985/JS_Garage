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
router.delete('/:id', verifyToken, deleteVideo);
router.put("/view/:id", addViewCount); 
router.get("/find/:id", getVideo);
router.get("/sub", verifyToken, getSubscribedVideo);
router.get('/trend', verifyToken, trend);
router.get("/random", randomVideos)
router.get("/tags", getByTag);
router.get("/search", searchVideo); // TO test

export default router;